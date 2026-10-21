#!/usr/bin/env python3
"""SEO integration audit against two local `next start` servers, never live hosts.
Usage: python3 scripts/check-seo-local.py [web-port=3100] [factum-port=3101]
Offline: python3 scripts/check-seo-local.py --artifacts
"""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, urljoin
from urllib.request import build_opener, HTTPRedirectHandler, Request
from urllib.error import HTTPError
import json, sys, xml.etree.ElementTree as ET

ARTIFACTS = '--artifacts' in sys.argv
if ARTIFACTS: sys.argv.remove('--artifacts')
ROOT = Path(__file__).resolve().parent.parent
LOCALES = ['nl', 'en', 'de', 'es', 'pt']
SITES = {
    'www.agenticmindshift.nl': ('web', int(sys.argv[1]) if len(sys.argv)>1 else 3100, 'nl', 36),
    'www.factumcapital.eu': ('factum', int(sys.argv[2]) if len(sys.argv)>2 else 3101, 'en', 51)
}
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs): return None

def get(host, path, cookie=None):
    if ARTIFACTS:
        app = SITES[host][0]
        route = urlparse(path).path
        public = ROOT/f'apps/{app}/public'/route.lstrip('/')
        if public.is_file(): return 200, {}, public.read_text()
        base = ROOT/f'apps/{app}/.next/server/app'/route.lstrip('/')
        for ext in ['.html', '.body']:
            file = Path(str(base)+ext)
            if file.is_file():
                meta = json.loads(Path(str(base)+'.meta').read_text())
                return meta.get('status',200), meta.get('headers',{}), file.read_text()
        return 404, {}, ''
    port = SITES[host][1]
    req = Request(f'http://127.0.0.1:{port}{path}', headers={'User-Agent':'Googlebot', **({'Cookie':cookie} if cookie else {})})
    try: response = build_opener(NoRedirect).open(req, timeout=30)
    except HTTPError as error: response = error
    return response.status, response.headers, response.read().decode('utf-8')

class Head(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.links=[]; self.meta=[]; self.anchors=[]; self.scripts=[]; self.current=None; self.title=''; self.in_title=False; self.in_script=False; self.visible=[]
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='link': self.links.append(a)
        if tag=='meta': self.meta.append(a)
        if tag=='a' and 'href' in a: self.anchors.append(a['href'])
        if tag=='script': self.in_script=True
        if tag=='script' and a.get('type')=='application/ld+json': self.current=''
        if tag=='title': self.in_title=True
    def handle_data(self, data):
        if self.current is not None: self.current+=data
        if self.in_title: self.title+=data
        if not self.in_script: self.visible.append(data)
    def handle_endtag(self, tag):
        if tag=='script' and self.current is not None: self.scripts.append(json.loads(self.current)); self.current=None
        if tag=='title': self.in_title=False
        if tag=='script': self.in_script=False

checked=set()
def audit_page(args):
    host, url, languages = args; path=urlparse(url).path
    status, headers, html=get(host,path)
    assert status==200, (url,status)
    assert 'noindex' not in headers.get('X-Robots-Tag','').lower(),url
    head=Head(html)
    assert all('noindex' not in m.get('content','').lower() for m in head.meta if m.get('name') in ['robots','googlebot']),url
    assert [x.get('href') for x in head.links if x.get('rel')=='canonical']==[url],url
    alternates={x['hreflang']:x['href'] for x in head.links if 'hreflang' in x}
    assert alternates==languages,(url,alternates,languages)
    assert head.title.strip(),url
    assert any(m.get('name')=='description' and m.get('content','').strip() for m in head.meta),url
    if path.count('/')>1: assert any(s.get('@type')=='BreadcrumbList' for s in head.scripts),(url,'missing breadcrumb')
    faq = [s for s in head.scripts if s.get('@type')=='FAQPage']
    needs_faq = (host=='www.factumcapital.eu' and path.split('/')[-1] in ['platform','diligence-sprint','pre-sale','contact']) or (host=='www.agenticmindshift.nl' and path.count('/')==1)
    assert bool(faq)==needs_faq,(url,'FAQ coverage')
    visible=' '.join(' '.join(head.visible).split())
    for schema in faq:
        for item in schema['mainEntity']:
            assert ' '.join(item['name'].split()) in visible,(url,'FAQ question not visible')
            assert ' '.join(item['acceptedAnswer']['text'].split()) in visible,(url,'FAQ answer not visible')
    for href in head.anchors:
        u=urlparse(urljoin(url,href))
        if u.hostname in SITES: checked.add((u.hostname,u.path+('?' + u.query if u.query else '')))
    return head.title

for host,(app,port,default,count) in SITES.items():
    status,_,xml=get(host,'/sitemap.xml'); assert status==200
    tree=ET.fromstring(xml); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
    items=[]
    for item in tree.findall('s:url',ns):
        url=item.findtext('s:loc',namespaces=ns)
        modified = item.findtext('s:lastmod',namespaces=ns)
        assert modified in ['2026-10-13', '2026-10-18', '2026-10-21']
        langs={x.attrib['hreflang']:x.attrib['href'] for x in item.findall('x:link',ns)}
        assert 'x-default' in langs
        guides={'web':['im-en-teasers','maandrapportage','dealstukken-en-ai'],'factum':['data-room-checklist','due-diligence-timeline','when-not-to-use-factum']}[app]
        expected=['nl','en'] if urlparse(url).path.split('/')[-1] in guides else LOCALES
        assert set(langs)==set(expected+['x-default'])
        items.append((host,url,langs))
    assert len(items)==count,(host,len(items))
    with ThreadPoolExecutor(max_workers=6) as pool: titles=list(pool.map(audit_page,items))
    for locale in LOCALES:
        localized = [title for (_,url,_),title in zip(items,titles) if urlparse(url).path.split('/')[1]==locale]
        assert len(set(localized))==len(localized),(host,locale,'duplicate title')
    status,_,robots=get(host,'/robots.txt'); assert status==200
    for bot in ['GPTBot','OAI-SearchBot','ClaudeBot','PerplexityBot','Google-Extended','Applebot-Extended','CCBot']:
        assert f'User-Agent: {bot}\nAllow: /' in robots,(host,bot)
    assert f'Sitemap: https://{host}/sitemap.xml' in robots
    status,_,llms=get(host,'/llms.txt'); assert status==200 and llms.startswith('# ')
    key=json.loads((ROOT/f'apps/{app}/lib/indexnow.json').read_text())['key']
    status,_,keybody=get(host,f'/{key}.txt'); assert status==200 and keybody.strip()==key
    if not ARTIFACTS:
        for missing in ['/does-not-exist','/fr','/fr/platform',f'/{default}/does-not-exist',f'/{default}/scorecard/rapport/private-id']:
            status,headers,html=get(host,missing)
            assert status==404,(host,missing,status)
            h=Head(html)
            assert not any(x.get('rel')=='canonical' for x in h.links),(host,missing,'canonical')
            assert any('noindex' in m.get('content','') for m in h.meta),(host,missing,'no noindex')
        status,headers,html=get(host,'/')
        if app=='web':
            # `/` is a permanent redirect to `/nl` since 19-10-2026.
            assert status==308 and urlparse(headers.get('location','')).path==f'/{default}',(host,'/',status)
        else:
            assert status==200
            assert [x.get('href') for x in Head(html).links if x.get('rel')=='canonical']==[f'https://{host}/{default}']
    print(f'{app}: {count} sitemap pages: 200, indexable, self-canonical, hreflang, localized titles/descriptions, JSON-LD; robots/llms/key checks passed')

if not ARTIFACTS:
    for host,(app,_,default,_) in SITES.items():
        aliases={'factum-capital':f'https://www.factumcapital.eu/{{locale}}','scorecard':'/{locale}/werkwijze'} if app=='web' else {'method':'/{locale}/platform','buyer-proof-sprint':'/{locale}/diligence-sprint','partnerships':'/{locale}/pre-sale'}
        for old,dest in aliases.items():
            for loc in [None]+LOCALES:
                for slash in ['', '/']:
                    path=('/'+loc if loc else '')+'/'+old+slash+'?utm_source=test'
                    status,headers,_=get(host,path); assert status==308,(host,path,status)
                    target=urlparse(headers['Location']); expected=dest.format(locale=loc or default)
                    if expected.startswith('https:'): assert target.hostname==urlparse(expected).hostname
                    assert target.path==urlparse(expected).path and target.query=='utm_source=test',(path,headers['Location'])
                    target_host=target.hostname if target.hostname in SITES else host
                    assert get(target_host,target.path)[0]==200,(path,target.path,'chain or 404')
        print(f'{app}: all bare/localized legacy aliases with/without slash go directly to 200; queries preserved')
    

with ThreadPoolExecutor(max_workers=6) as pool:
    results=list(pool.map(lambda x:(x,get(*x)[0]),sorted(checked)))
assert all(status==200 for _,status in results),[(u,s) for u,s in results if s!=200]
print(f'PASS: {len(results)} internal link targets exist as 200 pages. Mode: {"build artifacts (no HTTP/proxy verification)" if ARTIFACTS else "local HTTP"}. No live-site requests.')
