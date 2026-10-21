#!/usr/bin/env node
// Execute the actual TypeScript proxy functions without opening sockets.
import assert from 'node:assert/strict';
import { createRequire, registerHooks } from 'node:module';
// Next's bundler resolves these extensionless ESM imports; mirror that in Node.
registerHooks({ resolve(specifier, context, nextResolve) {
  try { return nextResolve(specifier, context); }
  catch (error) {
    if (specifier.startsWith('next/') && !specifier.endsWith('.js')) return nextResolve(specifier+'.js', context);
    throw error;
  }
}});
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root = fileURLToPath(new URL('../', import.meta.url));
const nativeRequire = createRequire(path.join(root, 'apps/web/package.json'));
const ts = nativeRequire('typescript');
const { NextRequest } = nativeRequire('next/server');
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} }; cache.set(file, module);
  const require = (name) => {
    let target;
    if (name.startsWith('.')) target = path.resolve(path.dirname(file),name);
    if (name.startsWith('@repo/ui/')) target = path.join(root,'packages/ui/src',name.split('/').at(-1));
    if (!target) return createRequire(file)(name);
    return load(existsSync(target+'.ts') ? target+'.ts' : target);
  };
  const code = ts.transpileModule(readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`,{filename:file})(require,module,module.exports);
  return module.exports;
}
let assertions=0;
for (const app of ['web','factum']) {
  const { proxy } = load(path.join(root,`apps/${app}/proxy.ts`));
  const { PUBLIC_PATHS, LEGACY_PATHS } = load(path.join(root,`apps/${app}/lib/seoRoutes.ts`));
  const def=app==='web'?'nl':'en';
  const request=(url,cookie)=>proxy(new NextRequest(`https://example.test${url}`,cookie?{headers:{cookie}}:undefined));
  for (const locale of [null,'nl','en','de','es','pt']) {
    for (const [old,dest] of Object.entries(LEGACY_PATHS)) {
      for (const slash of ['','/']) {
        const input=`${locale?'/'+locale:''}${old}${slash}?utm_source=test`;
        const r=request(input);
        assert.equal(r.status,308,input);
        const expected=dest.startsWith('https://')?dest.replace('{locale}',locale??def):`https://example.test/${locale??def}${dest}`;
        assert.equal(r.headers.get('location'),expected+'?utm_source=test',input);
        assertions++;
      }
    }
  }
  for (const locale of ['nl','en','de','es','pt']) {
    for (const page of [...PUBLIC_PATHS,'/opengraph-image']) {
      const guides=app==='web'?['/im-en-teasers','/maandrapportage','/dealstukken-en-ai']:['/data-room-checklist','/due-diligence-timeline','/when-not-to-use-factum'];
      const unsupported=['de','es','pt'].includes(locale) && guides.includes(page);
      const final=`/${locale}${page==='/'?'':page}`;
      const r=request(final);
      assert.equal(r.status,200,final);
      assert.equal(r.headers.get('location'),null,final);
      if (unsupported) assert.ok(r.headers.get('x-middleware-rewrite').endsWith('/not-a-page'));
      else {
        const slash=request(final+'/');
        assert.equal(slash.status,308,final+'/');
        assert.equal(new URL(slash.headers.get('location')).pathname,final);
        assert.equal(request(new URL(slash.headers.get('location')).pathname).status,200);
      }
      assertions++;
    }
  }
  for (const input of ['/unknown','/fr','/fr/platform',`/${def}/unknown`,`/${def}/scorecard/rapport/private`]) {
    const r=request(input); assert.equal(r.status,200); // internal rewrite; actual route calls notFound
    assert.equal(r.headers.get('location'),null);
    assert.ok(r.headers.get('x-middleware-rewrite').endsWith('/not-a-page')); assertions++;
  }
  const rootResponse=request('/');
  if (app==='web') {
    // agenticmindshift.nl: `/` is a permanent redirect to `/nl` since 19-10-2026.
    assert.equal(rootResponse.status,308);
    assert.equal(new URL(rootResponse.headers.get('location')).pathname,`/${def}`);
  } else {
    assert.equal(rootResponse.status,200);
    assert.equal(new URL(rootResponse.headers.get('x-middleware-rewrite')).pathname,`/${def}`);
  }
  const { LOCALE_COOKIE }=load(path.join(root,'packages/ui/src/locale.ts'));
  const chosen=request('/',`${LOCALE_COOKIE}=de`); assert.equal(chosen.status,307);
  assert.equal(new URL(chosen.headers.get('location')).pathname,'/de');
  assert.equal(chosen.headers.get('cache-control'),'no-store');
}
console.log(`PASS: ${assertions} route cases against both actual proxies; locales, aliases, slashes, queries, metadata images, missing paths and root cookie behavior. No network calls.`);
