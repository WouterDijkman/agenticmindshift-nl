# Factum Capital — rebuild plan (vastgelegd, nog niet gebouwd)

Status: **fase 2 afgerond en vastgelegd.** Bouwen start pas op expliciet startsein.
Laatste update: 2026-07-29.

Bronnen voor alle inhoudelijke claims: Google Drive — *Pre-Exit Package, Build-Out & Go-to-Market
Plan (Final v4)* (29-07-2026, leidend), *Buyer-Proof Sprint — Offer v3*, *Why Factum v2*.
Designonderzoek: zie §8.

---

## 0. Harde regels (gelden voor de hele bouw)

1. Geen verzonnen cijfers, KvK, testimonials, klant- of partnerlogo's. Alleen wat in de bronnen staat.
2. Niets committen zonder dat de gebruiker daar expliciet om vraagt.
3. Geen secrets in git.
4. Push/merge naar `main` pas ná expliciete goedkeuring — dat triggert de productie-deploy op
   factumcapital.eu.
5. `apps/web` (agenticmindshift.nl) wordt niet aangeraakt. De teaser daar linkt naar
   `https://www.factumcapital.eu/{locale}`; die vijf routes moeten blijven werken.
6. Vóór het schrijven van code: de relevante gidsen lezen in `node_modules/next/dist/docs/`.
   Deze Next-versie wijkt af van trainingsdata.

## 0b. Vastgelegde keuzes

| Onderwerp | Besluit |
|---|---|
| Positionering | Factum staat zelfstandig. Agentic Mindshift alleen als credential in Wouters bio + footerlink. |
| Team | Wouter Dijkman + Daniel Dropuljic. Antoine / Caelum Consultancy komt nergens voor. |
| Prijzen | Geen prijzen op de site. |
| Partnerships | Generieke pagina, non-exclusief model, geen namen of logo's. |
| **Hoofdtaal** | **Engels.** `defaultLocale = 'en'`, `x-default → /en`. |
| **Talen** | Dezelfde vijf als agenticmindshift.nl: `en`, `nl`, `de`, `es`, `pt`. |
| Ontwerplat | Top-tier (Hebbia / Rogo / Linear-niveau), niet "goede startup-template". |

---

## 1. Positionering en kernboodschap

**Kernzin (EN, brontaal):**

> Know what a buyer will find — before the buyer does.

**Subkop (letterlijk, geen woordspel — YC-regel: als de kop slim is, moet de subkop letterlijk zijn):**

> Factum Capital runs 241 AI due-diligence modules across your own data room and returns the
> findings a buyer's advisers would surface, with the source passage behind every one.
> Built for owners of B2B services companies planning an exit in the next two to five years.

Alternatief als de kop te "cute" blijkt in test: `See your company the way a buyer will.`

**Boven de vouw moeten vier dingen staan** (Raphael Schaad, YC Design Review 2026-03-06):
wat is dit · voor wie is dit · met welk doel · en één call-to-action. Alle vier. In 5–10 seconden
leesbaar.

**Waardepropositie (Final v4 §7.1 + Why Factum v2):**
De meeste eigenaren ontdekken pas wat hun bedrijf echt waard is als de koper al aan de knoppen zit.
Factum draait die volgorde om: 241 modules over 31 verticals, elk een zelfstandige agent die
bevindingen onderbouwt met **letterlijke passages uit de eigen dataroom** — niet met vrij
gegenereerde tekst. Elke bevinding gaat door een tweede reviewer-agent en een aparte feitencheck,
met een menselijke goedkeuringspoort aan het eind.

**Wat expliciet NIET geclaimd wordt** (Final v4 §7.6 noemt "overclaiming the product" als risico en
stelt dat de claims misleidend worden zodra de caveats verdwijnen):

- "~95% autonoom" wordt altijd uitgelegd als *waar de menselijke poort zit*, nooit als
  accuratesse-score.
- "96,7% grounded-or-honest" verschijnt alleen mét de bijzin *gemeten op één interne live deal,
  geen geauditeerde metric* — en nooit als los zwevend statistiekblok.
- Verboden woorden: *trusted*, *leading*, *world-class*, *10x*, *unlock*, *reimagine*. YC's
  teardown van **Zarna** ("AI Associates for private capital markets" — jouw directe categorie)
  ging kapot op precies dit: *"10x everything, all the things. Unlocked IRR... it just feels made up."*
  Eén ongeloofwaardig element besmet elke andere claim op de pagina.
- Pre-launch status wordt niet verstopt: "a limited number of pilot mandates" (Final v4: pilots in
  enkele cijfers).
- De bestaande **KvK 99495945** blijft staan. Geen andere registratienummers.

---

## 2. Sitemap

Meerdere ondiepe pagina's, genavigeerd op dienst/uitkomst — niet op doelgroep, niet op formaat.
Jorn van Dijk (CEO Framer, YC 2026-01-29): *"It's okay to have multiple pages on a website."*
Alles onder `/{locale}/…`; slugs blijven Engels in alle talen (minder routing-risico, en de enige
externe links die bestaan wijzen naar de locale-roots).

| Route | Bestaansreden |
|---|---|
| `/{locale}` | Home. Moet een koude bezoeker in twee schermen overtuigen. |
| `/{locale}/platform` | Het mechanisme is het bewijs zolang er geen klantcases zijn. |
| `/{locale}/buyer-proof-sprint` | De enige propositie die nú te koop is; eigen conversiepagina. |
| `/{locale}/governance` | Vervangt social proof: EU-hosting, zero-retention, DPA, pseudonimisering, menselijke poort, en wat we níet claimen. Ook AI Act art. 50-transparantie (verplicht vanaf 02-08-2026). |
| `/{locale}/team` | Verifieerbare mensen zijn bij een onbekende leverancier de sterkste trust-driver. Ryo Lu: een ontbrekende eigen About-pagina laat je "te vroeg" ogen. |
| `/{locale}/partnerships` | Generiek model, non-exclusief, geen namen. |
| `/{locale}/contact` | Kort formulier → agenda op de bevestigingsstap. |
| `/{locale}/privacy` | Nodig zodra er een formulier staat. |

**Home-secties, in volgorde:**

1. **Hero.** H1 + letterlijke subkop + één primaire CTA + één tekstlink. **Niet `100vh`** — de
   bovenrand van sectie 2 moet zichtbaar blijven (Schaad: een viewport-vullende hero *"visually
   locks me in"*). Geen "scroll down"-cue. De H1 animeert niet (LCP).
2. **Specimen.** Een geredigeerd, echt voorbeeld van één bevinding mét bronpassage. Van Dijk:
   *"I'm not going to book a demo without getting a taste of what the product looks like."*
   Dit is de logo-muur die we niet hebben. → **afhankelijkheid, zie §7.**
3. **Het probleem.** Informatie-asymmetrie bij exit en bolt-on. Kort, drie concrete uitingen.
4. **Hoe het werkt.** Pipeline: upload → 241 agents → reviewer-loop → feitencheck → menselijke
   goedkeuring. Inclusief de drie failure-classes die de reviewer weigert automatisch goed te
   keuren (verzonnen citaten, privacylek, scope-weigering) — dat is het geloofwaardigste detail
   dat we hebben.
5. **Dekking.** Sticky index van 31 verticals; modules per vertical uitgeklapt. **Nooit 241 kaarten
   renderen.** Exit Readiness (8 modules) uitgelicht.
6. **Buyer-Proof Sprint.** 11 disciplines, deliverables, Buyer-Proof-garantie ("fewer than three
   material new findings and you don't pay") → doorklik.
7. **Voor wie.** Twee situaties: eigenaar met exit over 2–5 jaar; buy-side PE met bolt-ons.
   Situatiegericht, niet featuregericht (Karri Saarinen, Linear/Coinbase: voor niet-technische
   kopers werken use-case-pagina's beter dan capability-lijsten).
8. **Vertrouwen.** Datablok + doorklik naar `/governance`.
9. **Team.** Twee namen, twee foto's, twee links.
10. **Slot-CTA.**

---

## 3. Designsysteem

Het lat ligt op Hebbia/Rogo/Linear-niveau. Concreet betekent dat vier dingen die het vorige plan
niet had: een echte display-letter naast Inter, haarlijnen van 0,5px in plaats van schaduwen, een
elevatieladder die *naar de tint* oplicht in plaats van naar grijs, en veel minder animatie dan
gebruikelijk.

### 3.1 Kleur

Elevatie op donker werkt niet met schaduwen maar met randen en lichte vlakken. De ladder loopt van
`#081930` omhoog **richting de navytint**, niet richting grijs — grijs oplichten is het verschil
tussen Linear (`#08090A`, nooit `#000`) en een template.

| Token | Waarde | Gebruik |
|---|---|---|
| `--surface-0` | `#081930` | paginabodem |
| `--surface-1` | `#0A1D38` | secties, kaarten |
| `--surface-2` | `#0D2242` | verhoogde kaarten |
| `--surface-3` | `#11294E` | hover / actieve staat |
| `--hairline` | `rgba(255,255,255,0.10)` | standaard rand |
| `--hairline-strong` | `rgba(255,255,255,0.16)` | sectienaad, actieve rand |
| `--text-display` | `#FFFFFF` (17,62:1) | **alleen** koppen — puur wit als lopende tekst bloeit op donker |
| `--text-body` | `rgba(255,255,255,0.90)` | lopende tekst |
| `--text-secondary` | `rgba(255,255,255,0.72)` | intro's, bijschriften |
| `--text-tertiary` | `rgba(255,255,255,0.60)` (≈6,9:1) | labels, meta |
| `--accent-cta` | `#F14C1D` (4,86:1 op navy) | knopvlak, focusring, één actie per viewport |
| `--accent-cta-text` | `#081930` (**4,86:1**) | knoplabel |
| `--accent-cta-hover` | `#FF5E30` | hover — oplichten, niet verdonkeren |
| `--wine` | `#844E58` (2,69:1) | **decoratieve vulling only** — nooit tekst, nooit functionele rand |
| `--wine-line` | `#8E545F` (3,00:1) | als de wijnkleur functioneel moet zijn (rand/icoon) |
| `--wine-text` | `#C399A0` (7,01:1) | wijngetinte tekst indien nodig |

Drie correcties op het aangeleverde palet, alle drie hard:

1. **Wit op `#F14C1D` = 3,63:1 en zakt onder WCAG AA.** Knoplabels worden `#081930` (4,86:1). Leest
   bovendien duurder: oranje vlak met donkere tekst is een merkkleur, wit-op-oranje is een banner.
2. **`#844E58` op navy = 2,69:1** — haalt zelfs de 3:1 voor niet-tekst niet. Alleen gevulde
   decoratie. Wit óp `#844E58` is wél goed (6,54:1), dus als vlak met witte tekst mag het.
3. **Oranje is schaars.** Eén primaire actie per viewport (Ryo Lu, Cursor: *"every single scroll,
   there is only one main CTA"*). Zodra `#F14C1D` decoratief wordt, leest de site als startup in
   plaats van adviesfirma. Alle decoratieve last ligt bij de wijnkleur.

### 3.2 Typografie

Inter als *display*-letter zonder tweede familie is volgens het onderzoek het luidste teken van een
gemiddelde site. Voorstel — drie families, met de mono in minieme dosering:

- **Display: Newsreader** (variabel, met `opsz`-as). Redactionele serif; signaleert institutioneel
  en geschreven, niet SaaS. Hebbia doet exact dit (serif display + grotesk UI).
- **UI/body: Inter** (variabel) — blijft, is al geladen.
- **Data/labels: IBM Plex Mono** — uitsluitend eyebrows, module-ID's, vertical-tellingen. Geeft het
  "instrument"-signaal dat Rogo met Fragment Mono haalt.

Regels:

- Volledig vloeiende schaal met `clamp()` + `vw`-term per stap, geen breekpuntsprongen.
- Negatieve tracking (−1 tot −2%) **alleen** boven ~32px; lopende tekst op `normal`.
- Serif op donker ~20–40 variabele gewichtseenheden lichter zetten dan de light-mode-equivalent
  (licht-op-donker bloeit). Koppen dus rond gewicht 400–440, niet 600–700.
- `next/font/google` met automatische metric-matched fallback → nul CLS op de LCP-kop.
  Preload alleen display + body; mono niet.
- Duits rekt ~35%, Nederlands ook. Navigatie- en knoplabels rekken het meest: +40% ruimte
  begroten, nooit een vaste knopbreedte.

### 3.3 Layout en detail

- Radius `2px` standaard, `4px` maximaal. Grote radii lezen als 2021-SaaS.
- Randen `1px`, omgezet naar **`0.5px` vanaf `min-resolution: 2dppx`**; aangrenzende cellen
  overlappen hun lijn (`margin: -0.5px`) zodat naden niet verdubbelen.
- Diepte komt van randen en een lichte bovenrand-highlight, niet van schaduwen. Waar toch schaduw:
  extreem zacht en vrijwel onzichtbaar.
- Vlakvullingen met **gedesatureerde** radiale verlopen, nooit hue-verzadigde.
- Grain-overlay: `feTurbulence baseFrequency=0.35 numOctaves=2` → `feGaussianBlur stdDeviation=0.3`
  → alpha **0,14**. (Bestaat al in `globals.css`; wordt op deze waarden getuned. 0,3 oogt vuil,
  0,05 is onzichtbaar.)
- Variatie in padding en radius om hiërarchie te maken — overal dezelfde waarden is een tell.
- Geen glasmorfisme als decoratie, alleen als échte laag. Geen bento-grid. Geen vier gelijke
  kaarten op een rij. Geen emoji- of generieke lijniconen. Geen stockfoto's. Geen AI-3D-vormen.

### 3.4 Beweging

Uitgangspunt na het YC-materiaal: **animatie is schuldig tot nut bewezen.** Uniforme
`whileInView`-fade-up op alles is inmiddels het sterkste AI-gegenereerd-signaal dat er is, en Ryo
Lu roast het expliciet (snelle scrollers missen inhoud).

Toegestaan:

- Korte reveals: 8–16px verplaatsing, ~400ms, stagger 40–60ms — **selectief**, niet op elke sectie.
- Sticky-kolom editorial scroller (de 31 verticals).
- Scroll-gekoppelde *toestand* die iets uitlegt (de pipeline die oplicht en achter je weer dooft).
- Sectienaad-haarlijnen die zichzelf tekenen.

Verboden:

- Scroll-jacking (Schaad: *"minus five points"*; sloopt bovendien de scrollbar als voortgangsmeter).
- Lenis/smooth-scroll op een contentsite — vecht met native scroll, schaadt INP.
- Horizontale pinned secties, parallax op elke sectie, letter-voor-letter SplitText,
  optellende cijfer-counters, auto-advance carrousels, WebGL-blobs.
- **Magnetische knoppen en custom cursors** — beide expliciet als gedateerd aangemerkt.
  → `packages/ui` `Button` krijgt een `magnetic`-prop die default `true` blijft, zodat `apps/web`
  identiek rendert; Factum zet hem uit.
- Bewegen terwijl de gebruiker leest.
- Essentiële inhoud achter tabs of hover (Ryo Lu: *"assume that anything behind these tabs, people
  will never see"*). De accordeon met verticals moet dus in dichte staat al communiceren.

Techniek:

- Motion v12, import uit `motion/react`. `LazyMotion` + `domAnimation` + `m` (~4,6kb i.p.v. ~34kb).
- `<MotionConfig reducedMotion="user">` in de root — de default is `"never"`, dat is nu een gat.
- Alles binnen `@media (prefers-reduced-motion: no-preference)` zodat er by default níets beweegt,
  in plaats van achteraf overschrijven.
- Reveals spelen **één keer** en worden daarna permanent ontwapend
  (`animation: none; opacity: 1; transform: none`). Opnieuw afspelen bij terugscrollen oogt goedkoop.
- De pipeline draait op CSS `animation-timeline: view()` — nul JS — met `@supports`-fallback naar de
  bestaande IntersectionObserver.
- Alleen `transform` en `opacity`. Nooit `transition: all`. De LCP-kop krijgt **geen** fade
  (`opacity: 0` houdt de LCP-klok lopen). Reveals reserveren hun ruimte: scroll-animaties zijn niet
  vrijgesteld van CLS.
- Tijden: hover 100–120ms, micro 180ms, entree 400ms. Easing `cubic-bezier(.4,0,.2,1)` voor
  functioneel, `cubic-bezier(.4,.05,.22,1.2)` voor expressief.
- Navigatie transparant bovenaan, krijgt achtergrond + haarlijn pas bij scroll of hover.

### 3.5 Componenten

`Button` (uit `@repo/ui`, met token- en magnetic-fix), `LanguageSwitcher` (nieuw; autonymen
English / Nederlands / Deutsch / Español / Português — nooit alleen vlaggen), `SiteNav` + mobiel
menu, `SectionHeader`, `StatBlock` (met verplicht caveat-slot), `VerticalIndex` (sticky serif-index
van 31), `Pipeline` (node/edge, CSS scroll-timeline), `SpecimenCard`, `TrustPanel`, `PersonCard`,
`FAQ`, `IntakeForm`, `SiteFooter`.

Alle states expliciet: hover / active / **focus-visible** (2px `#F14C1D` + 2px offset, voldoet aan
SC 2.4.11) / disabled / error.

---

## 4. Taal en content

- **Engels is de brontaal.** Ik schrijf EN eerst en vertaal daarvandaan naar NL, DE, ES, PT.
- **Niet vertalen:** "Factum Capital", "Buyer-Proof Sprint", "Buyer-Proof Guarantee", "Vigil".
- **Wel lokaliseren:** WHOA, IBR en boedelonderzoek zijn NL-specifiek. In EN/DE/ES/PT worden dat
  generieke omschrijvingen ("pre-insolvency restructuring review") zonder valse juridische
  equivalentie te suggereren.
- **Caveats worden woordelijk meevertaald.** Geen cijfer in geen enkele taal zonder zijn voorbehoud.
- Schrijfstijl: beknopt, scanbaar, objectief. Maar let op de YC-correctie op de gangbare
  CRO-wijsheid: het faalpatroon is *onder*uitleggen, niet overuitleggen. Van Dijk over een site met
  zes woorden uitleg: *"Add more content. More words."* Concreet en specifiek boven kort en vaag.
- **Noem het getal.** YC's eigen redesign schrapte "the results speak for themselves" met
  *"well, what are the results?"*. Dus: 241 modules, 31 verticals, 11 disciplines, 8
  exit-readiness-modules. Maar élk getal moet herleidbaar zijn — anders wordt het Zarna.
- Elke pagina eigen `title` en `description`, plus `alternates` met wederkerige hreflang en
  `x-default → /en`, volgens het patroon van `apps/web/lib/hreflang.ts`.

**Verouderde content die eruit gaat:** "29 modules" (→ 241), "Lancering 1 juli 2026" en "Vanaf
1 juli 2026 ook als SaaS" (datum gepasseerd), en de prijsregels "Vanaf €10.000 per deal / vanaf
€6.500 per maand".

---

## 5. Conversie

- **Primaire CTA, overal identiek:** *"Book a 30-minute intake call"* → cal.com/wwdijkman/intake-call.
  Concreet en tijdgebonden. Generieke labels presteren aantoonbaar slechter.
- **Eén primaire CTA per scherm.** Nooit twee primaire knoppen naast elkaar; bij twijfel één grote.
- **De ask wordt verdiend.** Van Dijk noemt "book a demo" als eerste vraag te zwaar:
  *"You probably first need to convince me what this is before I will do something as dramatic as
  booking a demo."* Daarom staat het specimen direct onder de vouw, vóór de tweede CTA-herhaling.
  De hero-secundair is een tekstlink *"See a specimen finding"*, geen tweede knop.
- **Formulier** (`/contact`): één stap, vijf velden — naam, e-mail, bedrijf, situatie (exit
  voorbereiden / bolt-on / anders), vrij tekstveld. Geen agenda-embed in de hero; de agenda
  verschijnt op de bevestigingsstap.
- **Social proof zonder klanten**, alles echt materiaal:
  - Team met verifieerbare cv's en uitgaande LinkedIn-links (Wouter: ING Acquisition & Leveraged
    Finance, Rabobank bijzonder beheer, Alter Domus. Daniel: Dandro Solutions, 50.000+ medische
    records/dag, FHIR/HL7, MSc Medical Informatics UvA). Foto's genormaliseerd: achtergrond
    weggesneden, uniform zwart-wit.
  - **Ongated** methodologie op `/platform`. Geen e-mailmuur.
  - Expliciete security-, DPA- en hostingverklaring op `/governance`.
  - De Buyer-Proof-garantie als risico-omkering.
  - Het specimen (zie §7).
- **Geleende geloofwaardigheid mag nooit leiden.** ING/Rabobank/UvA horen op `/team`, niet in de
  hero. YC over "Backed by YC"-badges: *"that is actually not the main thing you're doing."*
- Nul detailfouten boven de vouw. Dubbele spaties, verkeerde apostrofs en verouderde functietitels
  worden gelezen als karakterbewijs.

---

## 6. Technische wijzigingen

| Bestand | Wijziging |
|---|---|
| `apps/factum/i18n/routing.ts` | `defaultLocale: 'en'`; `localeDetection: false` — URL's worden deterministisch. |
| `apps/factum/proxy.ts` | IP-geo-redirect eruit. W3C en Google raden auto-redirect af: het breekt deeplinks en crawling. `/` → `/en`; taalmismatch krijgt een sluitbare banner met cookie. |
| `apps/factum/app/layout.tsx` | `viewport.colorScheme: 'light'` → `'dark'`; hardcoded `<html lang="nl">` → werkelijke locale (nu een i18n/SEO-bug). Nieuwe fontladingen. |
| `apps/factum/app/globals.css` | Volledig nieuw tokenset (§3.1–3.4). `@source "../../../packages/ui/src/**"` **moet blijven staan**, anders renderen de gedeelde primitives ongestyled. |
| `apps/factum/app/[locale]/*` | Home opgeknipt; zeven nieuwe routes; nieuwe componenten. |
| `apps/factum/lib/hreflang.ts` | Nieuw, gemodelleerd op `apps/web/lib/hreflang.ts`, met `x-default → /en`. |
| `apps/factum/messages/*.json` | Herschreven; `en.json` wordt de bron; `de/es/pt.json` nieuw. |
| `packages/ui/src/Button.tsx` | `color: '#ffffff'` → `var(--accent-cta-text, #ffffff)`; nieuwe `magnetic`-prop met default `true`. Beide fallbacks zorgen dat `apps/web` byte-identiek rendert. |

**Verificatie vóór productie:** Vercel *preview*-deploy, screenshots van elke pagina in meerdere
talen, Lighthouse/CWV-check op de home, contrastcheck, keyboard-only doorloop,
`prefers-reduced-motion`-doorloop. Pas daarna de vraag om te mergen.

---

## 7. Openstaande afhankelijkheden (nodig van Wouter)

1. **Specimen-bevinding** — één geredigeerde, échte bevinding met bronpassage. Dit is het
   krachtigste element op de hele site en het enige dat ik niet kan maken. Zonder dit beschrijf ik
   alleen de structuur van de deliverable.
2. **Portretfoto's** van Wouter en Daniel.
3. **Doorlooptijd van de Buyer-Proof Sprint** — ik wil "in days, not months" alleen schrijven als
   het in de offerte staat. Nog te verifiëren; anders gaat de claim eruit.
4. **Logo/wordmark** — nu een generiek sketch-icoon + "FACTUM.". Is er een echt bestand?
5. Bevestiging dat de Buyer-Proof-garantie zonder prijsvermelding genoemd mag worden.

---

## 8. Bronnen (design en conversie)

YC Design Review (geverifieerd, met transcript):
- Ryo Lu (Cursor) — *Cursor Head of Design Roasts Startup Websites*, 2025-11-20 — https://www.youtube.com/watch?v=RynySryqM_0
- Jorn van Dijk (CEO Framer) — *Why Your Startup Website Isn't Converting*, 2026-01-29 — https://www.youtube.com/watch?v=leQ89XSHILw
- Eve Bouffard (YC) — *How We Redesigned Our Website*, 2026-01-30 — https://www.youtube.com/watch?v=K5JoLAauzq4
- Raphael Schaad (YC) — *Common Mistakes With Vibe Coded Websites*, 2026-03-06 — https://www.youtube.com/watch?v=DNSXlBmukck
- Katie Dill (Stripe) — *How Stripe Built Their New Website*, 2026-04-22 — https://www.youtube.com/watch?v=ypzNhwpmOD4
- Karri Saarinen (Linear) — *Brand Design Tips From Linear Founder*, 2025-07-25 — https://www.youtube.com/watch?v=uEeFsW9343g
- Aaron Epstein & Pete Koomen — *Design Review: How to convert more visitors into customers*, 2023 — https://www.ycombinator.com/blog/design-review-tips-for-increasing-conversions

Referentiesites (live CSS geïnspecteerd): hebbia.ai · rogo.ai · keye.co (directe concurrent) ·
linear.app · anthropic.com · airbyte.com · watershed.com · modal.com · mercury.com · temporal.io

Motion v12: https://motion.dev/docs/react-use-scroll · https://motion.dev/docs/react-scroll-animations

Eerdere ronde: Nielsen Norman Group (boven-de-vouw-aandacht, formulierlengte, CTA-formulering,
prijstransparantie), W3C/Google (geen auto-redirect op taal), WCAG 2.2 SC 1.4.3 / 1.4.11 / 2.4.11,
web.dev (LCP-renderdelay, CLS bij scroll-animaties).
