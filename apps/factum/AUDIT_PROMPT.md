Voer een volledige, meedogenloze visuele audit uit van de Factum Capital website (`apps/factum` in deze pnpm-monorepo, branch `feature/factum-rebuild`, spec in `apps/factum/PLAN.md`). Doel: top-of-showcase Awwwards/Framer-tier kwaliteit, niet "goed genoeg". Waar het nu staat is niet het niveau — denk kritisch, wees hard voor je eigen werk, en fix wat je vindt in dezelfde sessie in plaats van alleen te rapporteren.

## Waarom dit nodig is
Dit project heeft al meerdere ronden visuele feedback gehad waarbij eerdere iteraties als "te basic", "matig" of "nog steeds saai" werden afgekeurd. De lat ligt op state-of-the-art: het soort site dat design-agencies zoals wearebrain.com bouwen (echte gedefocuste macrofotografie, rijke kleur-gradering, filmkorrel, organische bokeh) — niet platte vector-tegels op een navy achtergrond. Neem niets voor lief dat "wel ok is" — als iets generiek, plat, of repetitief aanvoelt, is het een bevinding.

## Scope van de audit
Doorloop **alle 7 pagina's** (`/`, `/platform`, `/diligence-sprint`, `/governance`, `/partnerships`, `/team`, `/contact`) in **alle 5 locales** (en/nl/de/es/pt) waar relevant, en beoordeel systematisch:

1. **Visuele hiërarchie & positionering** — is duidelijk wat het belangrijkste element per sectie is? Kloppen witruimte, uitlijning, en de balans tussen tekst/beeld? Zijn er secties die "plat" ogen naast secties die wel rijk zijn (inconsistentie tussen componenten)?
2. **Cognitive load** — is er te veel tekst per sectie? Te veel gelijktijdige visuele signalen? Is de leesvolgorde (scanpath) natuurlijk? Check specifiek: lange bullet-lijsten, dichte panelen, secties zonder duidelijke adempauze.
3. **Animaties & overgangen** — reveal-timing, stagger, easing-curves: voelen ze premium en doordacht, of standaard/onopvallend? Is er motion die niet registreert (te subtiel) of juist irritant wordt bij herhaald bezoek? Check scroll-triggered reveals, hover-states, de `SegmentField`-drift/glint-animaties, en page-transitions.
4. **Visuele variatie** — komen dezelfde composities, kleuren, of lay-outpatronen te vaak terug binnen één pagina of over pagina's heen? (Er is al een keer een bug geweest waarbij kaarten met dezelfde tint naast elkaar stonden — check dit patroon breder, ook in andere componenten dan `SegmentCard`.)
5. **Consistentie van het beeldsysteem** — `SegmentField`/`SegmentCard` (`apps/factum/components/`) is recent verrijkt met filmkorrel (`feTurbulence`) en een warme kleur-wash (`.segfield-wash` in `globals.css`) om dichter bij echte gedefocuste macrofotografie te komen. Beoordeel of dit overtuigend genoeg is, en of andere visuele componenten (`BentoGrid`, `Specimen`, `ComparisonMatrix`, `GroundingStack`, `SplitDiagram`, `Stepper`, `DisciplineGrid`, `ModuleChart`) hetzelfde niveau van raffinement halen of achterblijven.
6. **Typografie & ritme** — heading-scale, line-height, meetlat (measure) voor lopende tekst, verticale ritme tussen secties (band/seam-gedrag is eerder al eens gefixt, check of het nog steeds klopt).
7. **Kleurgebruik** — Factum's palet is beperkt: `--accent-cta` (oranje #f14c1d), `--wine`/`--wine-text` (rosé), navy surfaces (`--surface-0/1/2/3`), wit/grijs tekst-tokens. Checken of dit palet consistent en doelbewust wordt ingezet, niet toevallig.
8. **Responsive gedrag** — mobiel/tablet/desktop, geen overflow, geen gebroken lay-outs.

## Werkwijze
- Start de preview server via `mcp__Claude_Preview__preview_start({name:'factum'})` (poort 3100).
- **Belangrijk**: `preview_screenshot` werkt alleen betrouwbaar direct na navigatie op scroll-positie 0 — voor lager op de pagina gebruik je een losse Chrome-tab (via de `Claude_in_Chrome`-tools) en scroll je daar, of verifieer via DOM-metingen (`preview_eval`) in plaats van screenshots.
- **Belangrijk**: draai nooit `npx next build` in `apps/factum` terwijl de preview-dev-server ook daar draait — dat corrumpeert de gedeelde `.next`-map. Als je een productie-build wilt maken: `preview_stop` → `rm -rf .next` (in `apps/factum`) → `preview_start` opnieuw.
- Gebruik `npx tsc --noEmit -p .` en `npx next build` (beide vanuit `apps/factum`) om elke wijziging te verifiëren.
- Loop zelf door de site heen (Chrome-tab navigeren + scrollen + screenshotten) zoals een echte bezoeker dat zou doen — niet alleen code lezen.

## Deliverable
1. Een geprioriteerde bevindingenlijst (kritiek → nice-to-have), per pagina/component, met screenshots of concrete DOM-bewijs waar relevant.
2. Direct doorvoeren van de fixes die binnen scope vallen — dit is geen rapportage-only opdracht. Wees proactief: als je iets ziet dat duidelijk niet top-tier is, fix het, in plaats van het alleen te noemen.
3. Aan het eind: typecheck schoon, build slaagt (alle pagina's/locales), en een visuele verificatie-sweep (screenshots of DOM-checks) die aantoont dat de fixes werken.

Rapporteer aan het eind kort en direct, zonder "klaar!"-vaagheid: wat was het probleem, wat is de fix, en hoe is het geverifieerd.
