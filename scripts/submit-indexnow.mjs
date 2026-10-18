#!/usr/bin/env node
// Explicit URL input only. Dry-run by default; never called by build or deploy.
import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const app = args.shift();
const submit = args.includes('--submit');
const urls = args.filter((arg) => arg !== '--submit');
if (!['web', 'factum'].includes(app) || !urls.length || urls.length > 10000) {
  console.error('Usage: node scripts/submit-indexnow.mjs web|factum [--submit] https://www.example.eu/en/...');
  process.exit(1);
}
const { host, key } = JSON.parse(await readFile(new URL(`../apps/${app}/lib/indexnow.json`, import.meta.url), 'utf8'));
const urlList = [...new Set(urls.map((input) => {
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.host !== host || url.username || url.password || url.hash || url.search) {
    throw new Error(`Use an HTTPS canonical URL without query/fragment on ${host}: ${input}`);
  }
  return url.href;
}))];
const payload = { host, key, keyLocation: `https://${host}/${key}.txt`, urlList };
if (!submit) {
  console.log('Dry-run. Add --submit only after deployment and checking these URLs.');
  console.log(JSON.stringify(payload, null, 2));
} else {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(30000)
  });
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow ${response.status}: ${await response.text()}`);
  }
  console.log(`IndexNow accepted ${urlList.length} URL(s): HTTP ${response.status}. This is not an indexing guarantee.`);
}
