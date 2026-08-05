/**
 * Generates this site's imagery through SiliconFlow, offline.
 *
 *   node scripts/generate-visuals.mjs
 *   node scripts/generate-visuals.mjs --only wedge,blocks,curl --force
 *
 * Assets are written into public/visuals and committed, so the running site
 * never talks to SiliconFlow and a visitor never pays for a generation. The lock
 * file records the model, seed and exact prompt behind every file, which is what
 * makes a single visual reproducible without regenerating the set.
 *
 * Stills only. Factum's version of this script also drove an image-to-video model
 * and produced a full set of loops; they were rejected on the strength of the
 * loops themselves, so this site never grew the capability. That is also why the
 * slot manifest here carries no `motion` prompts — dead configuration invites
 * somebody to wire it up again.
 *
 * Generated URLs expire after an hour, so each download happens immediately after
 * its own request rather than in a batch at the end.
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

const force = has('--force');
const only = valueOf('--only')?.split(',').map((s) => s.trim());

/**
 * One SiliconFlow account funds both sites, so the key is allowed to live in
 * either app's .env.local rather than being copied into both. Both files are
 * gitignored.
 */
for (const envFile of [join(APP, '.env.local'), join(APP, '..', 'factum', '.env.local')]) {
  if (process.env.SILICONFLOW_API_KEY) break;
  try {
    process.loadEnvFile(envFile);
  } catch {
    // Absent or unreadable — try the next one.
  }
}
const KEY = process.env.SILICONFLOW_API_KEY;
if (!KEY) {
  console.error(
    'SILICONFLOW_API_KEY missing. Put it in apps/web/.env.local or apps/factum/.env.local (both gitignored).'
  );
  process.exit(1);
}

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
 * The model renders nouns literally and cheerfully substitutes the nearest famous
 * object: five stone blocks come back as dice or a city skyline, two cylinders as
 * candles, a row of punched holes as sheet music. Those substitutions are specific
 * to one subject and banning them globally would strip something another slot
 * needs, so they live on the slot.
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

  // Quality 92 rather than Factum's 88. These frames are high-key, and the long
  // clean shadow gradients that carry the whole style are exactly what JPEG bands
  // first; the extra weight is worth more here than it was on near-black.
  await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '92', png, '--out', jpg]);
  await unlink(png);

  return { model: shared.model, seed, prompt, negative, size: shared.imageSize };
}

const slots = JSON.parse(await readFile(join(HERE, 'visuals.slots.json'), 'utf8'));
const lock = (await exists(LOCK)) ? JSON.parse(await readFile(LOCK, 'utf8')) : {};
await mkdir(OUT, { recursive: true });

const known = [...slots.scenes, ...slots.features];
const all = known.filter((s) => !only || only.includes(s.id));
if (!all.length) {
  console.error(`--only matched nothing. Known ids: ${known.map((s) => s.id).join(', ')}`);
  process.exit(1);
}

const failures = [];

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

console.log(failures.length ? `\nDone, with failures: ${failures.join(', ')}` : '\nDone.');
