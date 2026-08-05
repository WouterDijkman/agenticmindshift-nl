/**
 * Generates the site's imagery through SiliconFlow, offline.
 *
 *   node scripts/generate-visuals.mjs --images
 *   node scripts/generate-visuals.mjs --videos
 *   node scripts/generate-visuals.mjs --images --videos --only readout,caliper --force
 *
 * Assets are written into public/visuals and committed, so the running site
 * never talks to SiliconFlow and a visitor never pays for a generation. The
 * lock file records the model, seed and exact prompt behind every file, which
 * is what makes a single visual reproducible without regenerating the set.
 *
 * Generated URLs expire — one hour for images, ten minutes for video — so every
 * download happens immediately after its own request rather than in a batch at
 * the end.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, stat, unlink } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const APP = join(HERE, '..');
const OUT = join(APP, 'public', 'visuals');
const LOCK = join(HERE, 'visuals.lock.json');
const API = 'https://api.siliconflow.com/v1';

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const valueOf = (flag) => {
  const i = argv.indexOf(flag);
  return i === -1 ? null : argv[i + 1];
};

const doImages = has('--images');
const doVideos = has('--videos');
const force = has('--force');
const only = valueOf('--only')?.split(',').map((s) => s.trim());

if (!doImages && !doVideos) {
  console.error('Nothing to do. Pass --images and/or --videos.');
  process.exit(1);
}

try {
  process.loadEnvFile(join(APP, '.env.local'));
} catch {
  // Fine — the key may already be exported in the environment.
}
const KEY = process.env.SILICONFLOW_API_KEY;
if (!KEY) {
  console.error('SILICONFLOW_API_KEY missing. Put it in apps/factum/.env.local (gitignored).');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} for ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

const exists = (p) => stat(p).then(() => true, () => false);

/** A stable seed per slot, so re-running reproduces the frame rather than rerolling it. */
const seedFor = (id) => parseInt(createHash('sha256').update(id).digest('hex').slice(0, 8), 16) % 9999999999;

/**
 * The shared ban list plus whatever this one slot has to keep out of frame.
 *
 * Every failure in the first batch was object-specific, and the fixes conflict:
 * banning numerals rescues `caliper`, whose engraved scale came back as garbled
 * nonsense, but it would strip the safe dial in `tumbler`, where the numbers are
 * the subject. Banning "thimble" rescues `micrometer` and means nothing anywhere
 * else. So the exclusions that only one slot needs live on that slot.
 */
const negativeFor = (slot, shared) =>
  slot.negative ? `${shared.negative}, ${slot.negative}` : shared.negative;

async function generateImage(slot, shared) {
  const png = join(OUT, `${slot.id}.png`);
  const jpg = join(OUT, `${slot.id}.jpg`);
  if (!force && (await exists(jpg))) {
    console.log(`  = ${slot.id} (have it)`);
    return null;
  }

  const prompt = `${slot.subject}. ${shared.style}`;
  const negative = negativeFor(slot, shared);
  const seed = seedFor(slot.id);
  const body = {
    model: shared.model,
    prompt,
    negative_prompt: negative,
    image_size: shared.imageSize,
    batch_size: 1,
    seed,
    num_inference_steps: 40,
    guidance_scale: 4.5
  };

  console.log(`  → ${slot.id}`);
  const json = await api('/images/generations', body);
  const url = json.images?.[0]?.url;
  if (!url) throw new Error(`no image url for ${slot.id}: ${JSON.stringify(json).slice(0, 200)}`);
  await download(url, png);

  // Kept as JPEG, not WebP: sips on macOS reads WebP but refuses to write it,
  // and next/image negotiates WebP/AVIF off this source anyway. Quality 88 is
  // where the film grain stops smearing on these dark frames.
  await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '88', png, '--out', jpg]);
  await unlink(png);

  return { model: shared.model, seed, prompt, negative, size: shared.imageSize };
}

async function generateVideo(slot, shared) {
  const mp4 = join(OUT, `${slot.id}.mp4`);
  if (!force && (await exists(mp4))) {
    console.log(`  = ${slot.id} (have it)`);
    return null;
  }

  const jpg = join(OUT, `${slot.id}.jpg`);
  if (!(await exists(jpg))) {
    console.log(`  ! ${slot.id} has no still yet — run --images first`);
    return null;
  }

  // The still is the first frame, so the poster and the loop are the same shot.
  const tmp = join(OUT, `${slot.id}.tmp.png`);
  await run('sips', ['-s', 'format', 'png', jpg, '--out', tmp]);
  const b64 = (await readFile(tmp)).toString('base64');
  await unlink(tmp);

  const seed = seedFor(`${slot.id}:motion`);
  console.log(`  → ${slot.id} (submitting)`);
  const { requestId } = await api('/video/submit', {
    model: shared.videoModel,
    prompt: slot.motion,
    negative_prompt: negativeFor(slot, shared),
    image_size: shared.videoSize,
    image: `data:image/png;base64,${b64}`,
    seed
  });

  // The status endpoint returns the occasional 500 while the job behind it is
  // perfectly healthy. Throwing on the first one discards a render that has
  // already been paid for, so tolerate a short run of them and only give up if
  // the endpoint stays down.
  let stumbles = 0;
  for (let i = 0; i < 120; i++) {
    await sleep(5000);
    let st;
    try {
      st = await api('/video/status', { requestId });
      stumbles = 0;
    } catch (err) {
      if (++stumbles >= 5) throw err;
      console.log(`    … ${slot.id} status hiccup ${stumbles}/5, still waiting`);
      continue;
    }
    if (st.status === 'Succeed') {
      const url = st.results?.videos?.[0]?.url;
      if (!url) throw new Error(`succeeded without a url for ${slot.id}`);
      await download(url, mp4);
      console.log(`  ✓ ${slot.id}`);
      return { model: shared.videoModel, seed, prompt: slot.motion, size: shared.videoSize };
    }
    if (st.status === 'Failed') throw new Error(`${slot.id} failed: ${st.reason ?? 'no reason given'}`);
  }
  throw new Error(`${slot.id} still not done after 10 minutes`);
}

const slots = JSON.parse(await readFile(join(HERE, 'visuals.slots.json'), 'utf8'));
const lock = (await exists(LOCK)) ? JSON.parse(await readFile(LOCK, 'utf8')) : {};
await mkdir(OUT, { recursive: true });

const all = [...slots.scenes, ...slots.features].filter((s) => !only || only.includes(s.id));
if (!all.length) {
  console.error(`--only matched nothing. Known ids: ${[...slots.scenes, ...slots.features].map((s) => s.id).join(', ')}`);
  process.exit(1);
}

const failures = [];

if (doImages) {
  console.log(`\nStills (${all.length}):`);
  for (const slot of all) {
    try {
      const record = await generateImage(slot, slots.shared);
      if (record) lock[slot.id] = { ...lock[slot.id], image: record };
    } catch (err) {
      console.error(`  ✗ ${slot.id}: ${err.message}`);
      failures.push(slot.id);
    }
    await writeFile(LOCK, JSON.stringify(lock, null, 2) + '\n');
  }
}

if (doVideos) {
  console.log(`\nLoops (${all.length}):`);
  for (const slot of all) {
    try {
      const record = await generateVideo(slot, slots.shared);
      if (record) lock[slot.id] = { ...lock[slot.id], video: record };
    } catch (err) {
      console.error(`  ✗ ${slot.id}: ${err.message}`);
      failures.push(slot.id);
    }
    await writeFile(LOCK, JSON.stringify(lock, null, 2) + '\n');
  }
}

console.log(failures.length ? `\nDone, with failures: ${failures.join(', ')}` : '\nDone.');
