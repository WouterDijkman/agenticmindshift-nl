# Factum — todo

Alles uit het positioneringsdocument (`factum-positionering-site.md`) dat níet in
de tekstronde van 2026-08-24 is meegegaan. Gesorteerd op of het kan, niet op hoe
graag ik het wil.

Wat er wél is doorgevoerd staat onderaan.

---

## Kan wanneer je wilt — kost alleen werk

### 1. Een echte interface-mockup op de site

Het gat waar het document het meest gelijk in heeft. **De site laat het product
nergens zien.** Geen screenshot, geen mockup, geen frame. Op een site waarvan de
CTA "start een sprint" is en waarvan pijler 3 belooft dat je elke claim live kunt
bewijzen, is dat vreemd.

`Specimen` op de homepage komt het dichtst in de buurt, maar dat is een
geconstrueerd tekstvoorbeeld, geen interface.

**Wacht bewust.** Beslist op 2026-08-24: het product gaat pas de site op als we
het zelf getest hebben. Dat is de juiste volgorde — een interface tonen die nog
niet af is, is precies de belofte die je bij de eerste demo niet waar kunt maken.

Als het zover is: beslis dan of het een geconstrueerd dossier wordt zoals
`Specimen` nu, of een echte run met de namen eruit. Dat tweede is overtuigender
en vraagt een beslissing over wat er herkenbaar in beeld mag.

### 2. Een diagram voor de negatieve ruimte

De tekst zegt nu wat er nooit is aangeleverd. Er is geen beeld dat het laat zien.
Wat het vraagt: de data room als raster met de gaten gemarkeerd.

De negentien bestaande stills hebben er twee die er dichtbij komen — `caliper`
(twee randen met een zwart gat ertussen) en `seal` (stof met één schone
rechthoek waar iets heeft gestaan). `seal` is eigenlijk de negatieve ruimte in
één beeld en draagt nu een citaat op de homepage-band. Die kan verschoven worden
zonder iets nieuws te maken.

### 3. `Specimen` de lijn laten tekenen

Clausule links, bevinding rechts, en niets ertussen. Die verbinding is precies
wat pijler 3 belooft dat je aan tafel laat zien, en het is het enige object op de
site dat het kan tonen. Kleine ingreep, groot effect.

---

## Kan pas als het product er is

### 4. Alle fase-2 copy uit het document

Voor elke ICP staat er een self-serve blok. Daarin:

- een self-serve workspace met onbeperkt uploaden
- white-label export naar de PowerPoint-stijlgids van de klant, met één klik
- een two-tier portal met Client View en Command View
- een "Seller Readiness Score"
- een "Buyside Attack Simulator"
- realtime risico-identificatie door de analisten van de klant zelf

Geen daarvan bestaat. `/platform` zegt letterlijk *"Geen algemene
beschikbaarheid. Factum is pre-launch."* en `/partnerships` belooft expliciet
géén white-label claim van certificering.

Zodra een van deze dingen echt draait, is de copy uit het document een prima
startpunt.

### 5. Eén regel op `/platform` over waar het heen gaat

Tussenvorm voor punt 4: richting benoemen zonder aanbod doen. Vraagt jouw
akkoord, want een roadmap-belofte op een pre-launch site is een risico op zich.

---

## Bewust niet gedaan, en dat blijft zo tenzij je me overrulet

### 6. De absolute claims

Het document belooft "100% menselijke verificatie", "geen hallucinaties" en
"foutloze rapporten". De site zegt het tegenovergestelde en dat is met opzet:
`/platform` heeft zeven dingen die we níet claimen, `/limits-of-ai` is een hele
pagina daarover, en het gemeten cijfer is 96,7% grounded-or-honest, niet 100.

Tegen een publiek dat aannames beroepsmatig wantrouwt is de partij die zijn eigen
gaten noemt de enige die te geloven is. En "foutloos" beloven maakt één fout
fataal.

De kracht is wel overgenomen, zonder de absoluutheid: elke bewering staat aan een
document en een pagina, of hij staat er als onbevestigd bij. Even hard, wel waar,
en controleerbaar terwijl je het zegt.

### 7. "Verdrievoudig uw dealcapaciteit"

Verzonnen factor. Er is nog geen afgeronde case. Het argument eronder is sterk
genoeg zonder getal, en staat al zo op `/partnerships`.

### 8. Het visuele voorstel

Wit plus antraciet, crimson accent, Roboto. Botst met de design lock
(`#081930` / `#844E58` / `#F14C1D`, Newsreader + Inter + IBM Plex Mono) en met je
eigen uitspraak dat de kleuren blijven.

Twee dingen om te onthouden:

- **De intentie achter crimson zit er al in.** Het document motiveert rood met
  lakwerk en de lakstempel op een strategisch document. Dat is `#844E58` wine,
  die nu alleen decoratief wordt gebruikt omdat hij op navy 2,69:1 haalt en dus
  geen tekst kan dragen. Wil je die gedachte sterker, dan is dat die kleur meer
  werk laten doen — geen nieuw palet.
- **"Geen stockfoto's van lachende mensen in pakken" was al staand beleid.** De
  negentien beelden zijn macrofoto's van objecten. Geen mens te zien.

De penseelstreken uit het document zou ik laten vallen. Dat is een tweede
visuele taal naast de macrofotografie, en twee talen door elkaar ziet er slechter
uit dan één consequent volgehouden.

---

## Gedaan

### De moduleroster ijlde weer na, in twee stappen · 2026-09-08

`lib/site.ts`'s `MODULES` beschrijft zichzelf als "derived from the product
source rather than from a strategy document", maar was sinds 21 augustus niet
meer nagekeken tegen `MODULE_WAVES` in `src/lib/dispatch/module-registry.ts`.

**Eerste pas.** Op 21 augustus zijn zes opleveringsmodules (vdd, ic-memo,
teaser, fin-memo, document-factory, ic-report) verhuisd naar het aparte repo
`factum-deliverables`, en zes andere (vigil, portfolio, pmi, exit-readiness,
portfolio-health, im-screener) uit de productpropositie gehaald. De site bleef
23 modules in 6 golven tonen. Bevestigd met Wouter: het product levert vandaag
één live dashboard en één gesynthetiseerd geschreven rapport, geen losse
opleveringsmodules meer.

**Tweede pas, alleen gevonden doordat Wouter er expliciet naar vroeg.** Op 3
september zijn óók `it` en `esg` uit de moduleroster gelicht (naar
`factum-it-dd`/`factum-esg-dd`), en op 4 september is de golfindeling zelf
veranderd: legal, tax, deal-economics en valuation kregen elk hun eigen golf
in plaats van gedeelde golf 2/3, omdat twee modules in dezelfde golf elkaars
output nooit konden lezen (signalen publiceren pas als een module helemaal
klaar is). De eerste pas had dit gemist — hij keek naar `MODULE_WAVES`'
golfstructuur maar niet naar `ModuleSlug` zelf, waar `it`/`esg` al ontbraken.
Wat overblijft: **9 modules, 5 golven die iets dragen** (golf 6 blijft
gereserveerd), **8 disciplines** (`DISCIPLINES` verloor `it` en `esg` net als
`MODULES`).

**Wat is aangepast, cumulatief over beide passen:**

| Bestand | Wijziging |
|---|---|
| `lib/site.ts` | `MODULES` teruggebracht naar de 9 echte modules over 5 golven (golf 1: financial/commercial/hr/operational/ai-dd; golf 2: legal; golf 3: tax; golf 4: deal-economics; golf 5: valuation); `DISCIPLINES` van 10 naar 8 (`it`/`esg` eruit); `WAVE_COUNT` 6→5; `POST_CLOSE_FIRST_WAVE` verwijderd; `HARD_BLOCK_COUNT` 7→8 (`agent-review-graph.ts` heeft aparte `FABRICATED_SOURCE`- en `FABRICATION_CHECK_FAILED`-blokkades) |
| `components/DisciplineGrid.tsx` | `ICONS` teruggebracht van 10 naar 8 marks, `SketchGear`(it)/`SketchKnowledge`(esg) eruit, positioneel gelijk gehouden met `DISCIPLINES` |
| `components/DispatchGraph.tsx` | de dashed-rail-logica voor post-close golven verwijderd |
| `app/globals.css` | `.discipline-index`'s brede breakpoint van 5 naar 4 kolommen (8 disciplines deelt niet meer exact door 5); `.discipline-grid` blijft op 2 kolommen (8 deelt nog steeds exact door 2) |
| `app/[locale]/platform/page.tsx` | "deliverables"/"monitoring"-tegels uit de cijferblok; achtste hard-block-item toegevoegd aan de tegel-spans |
| `app/[locale]/method/page.tsx` | `numbers` uitgebreid naar `w1`..`w5` (was `w1`..`w3`) voor de 5 golfstappen |
| `messages/{nl,en,de,es,pt}.json` | `shared.modules` (23→9, herordend naar de echte golfvolgorde), `shared.waves` (6→5, elk van golf 2-5 nu één module) en `shared.disciplines` (10→8, `it`/`esg`-rijen eruit) getrimd, positioneel gelijk gehouden zoals `roster.manifest.ts` vereist; het statische "Ten/Tien/Zehn/Diez/Dez disciplines"-opschrift (2× per taal: metadata-omschrijving + coverage-titel) hardgecodeerd naar acht — dit gebruikte geen ICU-variabele en zou anders zijn blijven staan; `platform.scale.tiles.deliverables`/`.monitoring` verwijderd; `platform.blocks.items` kreeg een achtste item; `method.waves.steps` herschreven naar 5 stappen (golf 2 = alleen legal, golf 3 = alleen tax, golf 4 = deal economics, golf 5 = valuation); `method.waves.note` en `sprint.delivery` herschreven naar "één dashboard, één rapport, plus de openstaande-vragenlijst"; een hardgecodeerd "acht/eight/ocho/oito modules"-getal in de FAQ (golf 1) vervangen door de `{w1}`-ICU-variabele |

**Gecontroleerd, niet aangepast:** `governance`'s "The other {other} modules"
en alle `{modules}`/`{waves}`/`{blocks}`/`{w1}`..`{w5}`-ICU-plekken rekenen
zich vanzelf om zodra `lib/site.ts` klopt.

`node_modules/.bin/tsc --noEmit` schoon. `shared.modules`/`shared.waves`/
`shared.disciplines`-lengtes handmatig geverifieerd tegen
`MODULE_COUNT`/`WAVE_COUNT`/`DISCIPLINE_COUNT` voor alle vijf talen (elk
9/5/8) — dezelfde toets die `lib/roster.manifest.ts` bij de volgende
build/cold-start zelf ook doet. Geen `next build` gedraaid: er draaide al een
dev-server van een andere sessie in deze map.

**Les voor de volgende keer dit soort telling nakijkt:** kijk naar
`ModuleSlug` én `MODULE_WAVES` samen, niet naar de golfstructuur alleen — de
eerste pas keek alleen naar welke golven leeg waren en miste daardoor dat de
roster zelf ook was gekrompen.

**Nog niet gedaan, met opzet:** een moedertaalspreker-controle op de
Duitse/Spaanse/Portugese vertalingen hierboven. De structuur en cijfers zijn
correct (build-guard-getoetst), de formulering is een directe, zorgvuldige
vertaling maar niet door een native speaker nagelezen. Doe dat voordat dit
live gaat als het nog niet is gebeurd.

### `/pre-sale` — de verkoperskant heeft een eigen deur · 2026-08-24

ICP 3 uit het document. Stond als één bijzin in de lead van
`/diligence-sprint`; is nu een pagina met een eigen plek in de navigatie, in
vijf talen, in de sitemap en met breadcrumb.

Zeven blokken: wie het draait (drie soorten verkoper), de read van de koper op
u gericht, **wat er in uw data room ontbreekt**, wat een pre-sale sprint níet is,
FAQ, en de CTA met de garantie ernaast.

Gebouwd met de bestaande componenten van `/partnerships` en drie bestaande
stills. Geen nieuwe styling, geen nieuwe assets. `seal` draagt het middelste
profiel: stof met één schone rechthoek waar iets heeft gestaan, en dat is de
negatieve ruimte in één beeld.

De grens staat er expliciet bij: wij zien dát er iets ontbreekt, niet of het er
bewust uit is gelaten. Dat tweede zou een claim over iemands bedoeling zijn, en
daar zit geen bewijs voor in een data room.

## Wat er op 2026-08-24 wél is doorgevoerd

Puur tekst, vijf talen, geen styling aangeraakt, veertien strings.

| Wat | Van | Naar |
|---|---|---|
| `home.hero.title` | "Lees de hele data room in dagen" — een capaciteit | "Weet wat er ligt voordat u een prijs noemt" — een uitkomst |
| `home.hero.lead` | beschreef de engine | beschrijft wat de lezer aan tafel kan, met het bewijs erbij |
| `home.problem.title` + `lead` | "De meeste due diligence leest de data room nooit helemaal" | "De data room die u leest is samengesteld door de verkoper" — de negatieve ruimte als het kopprobleem |
| `home.problem.points[0].body` | steekproef | steekproef, scherper |
| `home.problem.points[1]` | risico tussen disciplines | **ongewijzigd** — dat argument was al goed en draagt de one-stop-shop-claim |
| `home.cta` | "Zie het draaien, beslis daarna" | "Draai hem op een dossier dat nu openstaat" |
| `sprint.header.lead` | drie gebruiksopties in een opsomming | de koperskant en de verkoperskant, allebei als zin |
| de vier data-gap-strings | "lijst van wat ontbreekt", passief | "wat nooit is aangeleverd", met de grens erbij: een gat dat je kunt benoemen is een vraag aan de verkoper |
| `meta.home.description` | disciplines opsommen | uitkomst plus bewijs |

Wat de negatieve-ruimtecopy bewust **niet** zegt: dat de verkoper documenten
opzettelijk heeft achtergehouden. Wij zien dát iets ontbreekt, niet waarom. Die
grens staat in de tekst, want een claim over iemands bedoeling kunnen we niet
onderbouwen.
