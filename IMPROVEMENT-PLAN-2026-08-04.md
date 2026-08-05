# Verbeterplan — agenticmindshift.nl + factumcapital.eu

**Datum:** 4 augustus 2026
**Basis:** het CRO-framework uit de video "Alex Hormozi's advies over webdesign" (youtu.be/Kzx8iw4hEc0), gelegd langs beide apps.
**Status:** analyse + plan. Nog niets geïmplementeerd behalve wat expliciet als "al gedaan" staat.

---

## 0. Korte conclusie vooraf

Je vindt de site "meh". Dat klopt, en de oorzaak is niet wat je zou verwachten.

De site is niet lelijk. Typografie, kleur, spacing en detail zijn beter dan 90% van de adviesbureau-sites. Het probleem zit ergens anders, en het framework uit de video legt precies de vinger op de wond:

> "Most people spent the first half of their career trying to beef up the top side — promise bigger, more testimonials, more results. The actual fortunes rely on the bottom side of the equation."

De hele site is **teller**. Belofte, droomuitkomst, pijn, kosten van niets doen. Zes van de dertien homepage-secties argumenteren dat je een probleem hebt.

De **noemer** is leeg. Nul klantcitaten, nul klantnamen, nul cases, nul logo's, nul gezichten, nul echte output op de plek waar iedereen kijkt. Op beide sites. Op factumcapital.eu staat het zelfs letterlijk in de vergelijkingsmatrix: de rij "Published accuracy audit" scoort `no` voor alle vier kolommen, met de voetnoot dat niemand in die tabel er een heeft, "including us".

Dat is de "meh". Een pagina die veel belooft en niets bewijst voelt generiek, ongeacht hoe mooi de letters staan. En het is niet met design op te lossen.

Daarnaast vier structurele bevindingen die ik hieronder onderbouw:

1. **Boven de vouw op de geldpagina staat geen enkel beeld.** Hormozi's op één na belangrijkste testvariabele — het beeld direct onder de kop — bestaat niet op agenticmindshift.nl. Terwijl je een uitstekend artefact hébt: de rapportmock. Die staat op scrollpositie 2.850 van 10.734.
2. **De homepage herhaalt zichzelf visueel vier keer.** Vier secties draaien dezelfde donkere-kaart-grid met bijna identieke gegenereerde SVG's. Dat leest als een template, niet als een bedrijf met een mening.
3. **Er zit geen analytics op beide apps.** Geen Plausible, geen PostHog, geen Vercel Analytics, geen gtag. Nul. Hormozi's kernadvies — één split-test per week — is nu fysiek onmogelijk. Je weet niets.
4. **Factum heeft de juiste wapens en heeft ze zelf ontwapend.** De enige echte risico-omkering op beide properties — drie materiële bevindingen of gratis — ligt op 58% van de homepage en staat bij géén enkele knop. Het enige echte artefact draagt een bijschrift dat uitlegt waarom er geen bewijs te zien is. En onder de twee belangrijkste knoppen staat, in plaats van een vertrouwenselement, dat het bedrijf nog niet gelanceerd is. Drie tekstbesluiten. Deze week te repareren. Zie §4.

*Nauwkeurigheidsnoot: §4 is herschreven nadat ik factumcapital.eu zelf pagina voor pagina had gemeten in plaats van op een tekstaudit te vertrouwen. Twee claims in de eerste versie waren onjuist; die staan in §4.0 rechtgezet.*

---

## 1. Het framework, uitgepakt in zes wetten

Uit de transcriptie, teruggebracht tot wat toetsbaar is:

### Wet 1 — Verkeer is niet de hefboom, conversie is dat
Advertentieveilingen worden alleen duurder. Wie beter converteert wint. Iedereen obsedeert over verkeer, bijna niemand over wat er gebeurt als dat verkeer landt.

### Wet 2 — Mooi ≠ converterend
Duidelijk verslaat mooi. Als een bezoeker binnen enkele seconden niet kan zien wat je doet en wat de volgende stap is, heeft het ontwerp gefaald, hoe goed het er ook uitziet.

### Wet 3 — Weinig variabelen, veel effect
Twee of drie beslissingen die conversie bewegen, de rest negeren. Eén split-test per week. Een volledige redesign leert je niets omdat er veertig dingen tegelijk veranderen.

### Wet 4 — Boven de vouw is bijna alle winst
Het enige stuk dat iedere bezoeker zeker ziet. De twee dingen die de moeite van het testen waard zijn: **de kop** en **het beeld direct daaronder**. De kop moet in ≤5 seconden zeggen wie je bent, wat je doet en vooral **wat de bezoeker krijgt**.

### Wet 5 — De waardevergelijking, en het geld zit in de noemer

```
              Droomuitkomst  ×  Waargenomen kans van slagen
Waarde  =  ──────────────────────────────────────────────────
               Tijdsvertraging  ×  Moeite & opoffering
```

Iedereen pompt energie in de teller. Het geld zit onder de streep: bewijs, snelheid, wrijvingsverlaging. Amazon veranderde het product niet — het veranderde de waargenomen kans van slagen met reviews.

### Wet 6 — Je concurreert met stilstand, niet met concurrenten
Je verkoopt tegen twijfel, risico en het comfort van niets doen. Verlaag de actiedrempel tot erover stappen triviaal is. **Zet de vertrouwenselementen pal bij de knop**, want daar piekt de twijfel.

### Aanvulling van de presentator zelf
Als je site eruitziet als elk ander bedrijf in je sector, word je geprijsd als elk ander bedrijf in je sector. In een markt vol identieke AI-pagina's winnen de pagina's die lezen als een echt bedrijf met een echte mening.

---

## 2. Diagnose — beide sites langs de zes wetten

### Wet 4 — Boven de vouw

**agenticmindshift.nl (`/nl`), gemeten op 1440×900:**

| Element | Wat er staat |
|---|---|
| Eyebrow | "VOOR PE-PARTNERS, M&A-DIRECTORS EN FAMILY OFFICES" |
| H1 | "Hoeveel rendement laat uw portefeuille liggen?" |
| Subkop | "Zes dimensies die het IM en de maandrapportage niet laten zien. Twaalf minuten invullen, daarna heeft u een onderbouwd rapport." |
| Primaire CTA | Start de Scorecard |
| Secundair | Werkwijze & tarieven → |
| Spec-strip | 12 MINUTEN · 6 DIMENSIES · GEEN ACCOUNT · VERTROUWELIJK |
| **Beeld** | **geen** |

Wat er goed is: de spec-strip. Dat is puur noemer — tijd, moeite, risico — precies wat Hormozi zegt dat je moet doen, en het is het beste element boven de vouw. Behouden en versterken.

Wat er misgaat:

1. **Geen beeld.** De rechterhelft van het scherm is leeg beige. Hormozi's tweede testvariabele bestaat niet. Erger: je hébt het beeld — `ScorecardReportMockup`, met de zes dimensiebalken naast het referentieniveau, plus de badge "2/6 dimensies onder referentieniveau". Dat is een uitstekend artefact. Het staat op scroll 2.850 van 10.734, oftewel op ongeveer een derde van de pagina. Van de bezoekers die niet scrollen ziet niemand het.

2. **De kop zegt niet wat je krijgt.** "Hoeveel rendement laat uw portefeuille liggen?" is een vraag, geen belofte. Hij benoemt een pijn en een droomuitkomst, maar niet wie je bent, wat je doet, of wat de bezoeker in handen krijgt. De subkop repareert dat deels, maar Hormozi's eis van ≤5 seconden slaat op de kop.

3. **De H1 begint pas op 320px van boven.** Er zit ~190px lege ruimte boven de eyebrow. Op een 850px-viewport is dat een kwart van je enige gegarandeerde scherm weggegeven aan niets.

**Alle andere pagina's van apps/web:** `/over`, `/werkwijze`, `/factum-capital` hebben **geen enkele CTA boven de vouw**. Het hero-"beeld" is op elke pagina één gigantisch achtergrondkarakter op 2,8% dekking — "W", "03", "C", "15". Dat is een decoratie, geen artefact. Het beantwoordt geen enkele vraag van de lezer.

**factumcapital.eu:** de homepage heeft CTA's. Alle zes de binnenpagina's gebruiken `PageHeader`, en die component heeft **geen CTA**. Omdat ik deze sessie `.fit-screen` heb toegevoegd is elke binnenpagina nu exact één scherm hoog — wat betekent dat het volledige eerste scherm van elke binnenpagina nu tekst zonder vraag is. Dat is een regressie die ik zelf heb geïntroduceerd en die gerepareerd moet worden.

### Wet 5, noemer 1 — Waargenomen kans van slagen (bewijs)

Dit is het hart van het probleem. Wat er **niet** is, op beide sites, geverifieerd door de hele codebase te doorzoeken:

| | agenticmindshift.nl | factumcapital.eu |
|---|---|---|
| Klantcitaten / testimonials | geen | geen |
| Klantnamen | geen | geen |
| Logowall | geen | geen |
| Cases | geen | geen |
| Reviews / ratings | geen | geen |
| Pilotresultaten | geen | geen |
| Certificeringen | één, indirect (Nyenrode) | geen — ISO 27001 en SOC 2 expliciet ontkend |
| Foto's van mensen | **geen** | **geen** |
| Screenshot van echte output | geen | geen |
| Pers / awards / investeerders | geen | geen |

Het enige citaat op agenticmindshift.nl is Wouter die zichzelf citeert. De enige "klantnamen" zijn oud-werkgevers: Rabobank, ING, Alter Domus.

**Waarom dit zwaarder weegt dan bij een gemiddeld bedrijf.** Je vraagt een PE-partner om vertrouwelijke dealdata aan een eenmanszaak van negen maanden oud te geven. De site vermeldt zelf "opgericht oktober 2025" in de footer. De waargenomen kans van slagen is de enige factor die telt en het is de enige factor waar niets over gezegd wordt.

**Wat er wél is en onderbenut blijft:**
- De garantie op factumcapital.eu: *"Drie materiële bevindingen die je eigen team niet al had gevonden, of de opdracht is gratis."* Dat is precies wat Hormozi bedoelt met een **specifieke** garantie — geen vage "tevredenheidsgarantie" die het brein overslaat. Hij staat begraven op één pagina, alleen voor pilot-mandaten, en niet bij een knop.
- `GROUNDING_RATE = 96,7` met auditdatum. Eén echt intern gemeten getal. Zwaar van voorbehouden voorzien en visueel niet uitgelicht.
- De garantie op /werkwijze van agenticmindshift.nl: gratis scorecard, twintig minuten zonder factuur, start binnen zeven werkdagen. Ook alleen op één pagina.

**Interne tegenstrijdigheden die de kans van slagen actief verlagen.** Hormozi: je verkoopt tegen twijfel. Elke tegenstrijdigheid is gratis twijfel:
- "31 modules" op de site versus "29 modules" in `public/llms.txt`
- retainer-minimum: **drie** maanden op /werkwijze, **zes** maanden in de voorwaarden
- Sparring Sessie: 20 minuten op de site, 30 minuten in llms.txt
- Wouter is "voormalig portefeuillemanager" in llms.txt, acquisition finance overal elders
- `llms.txt` belooft nog steeds "SaaS launch 1 juli 2026" — die datum is voorbij

Bij een due-diligence-propositie is inconsistentie in je eigen cijfers de duurste fout die je kunt maken. Je verkoopt nauwkeurigheid.

### Wet 5, noemer 2 — Tijd en moeite

**agenticmindshift.nl:** de scorecard is 7 schermen, 15 vragen, elke sectie volledig verplicht (de knop is `disabled` tot alles ingevuld is). Daarna een muur met drie verplichte velden (naam, zakelijk e-mail, bedrijf). Wat je vóór die muur te zien krijgt is één cirkel met een totaalscore op 75. Alle interpretatie zit erachter. Daarna nog eens 20–30 seconden wachten op de AI-analyse.

Hormozi: *"speed starts before any of that."* Twaalf minuten is eerlijk gecommuniceerd — dat is goed — maar de waarde-uitkering komt pas op scherm zeven.

**factumcapital.eu:** hier is het extremer. Er is **één actie op de hele site**: `https://cal.com/wwdijkman/intake-call`. Acht call-sites, nul uitzonderingen. Geen formulier, geen e-mailadres, geen download, geen demo, geen nieuwsbrief, geen LinkedIn. Het is een bewuste keuze — er staat letterlijk in de code dat een formulier een wachtrij impliceert en dat er een agenda is.

Maar in Hormozi's termen: er is precies één sport op de ladder en die staat hoog. Wie 80% overtuigd is heeft nul manieren om in contact te blijven. Dat is de "comfort of not doing the thing" in zijn zuiverste vorm.

### Wet 6 — Bewijs bij de knop

Geen enkele CTA op beide sites heeft een vertrouwenselement ernaast. De eind-CTA op de homepage is gecentreerde tekst op marineblauw met twee knoppen en verder niets. Geen garantie, geen citaat, geen "geen account nodig", geen privacyregel. Precies op de halve seconde waar volgens Hormozi de twijfel piekt staat er niets.

Uitzondering: de spec-strip in de hero. Die staat wel bij de knop en werkt.

### Wet 2 en de aanvulling — ziet dit eruit als een echt bedrijf met een mening?

Dit is de directe verklaring voor "meh".

**De homepage is 10.734px — ongeveer twaalf schermen — en verdeeld over dertien secties.** Uit de screenshots:

- **Sectie 2** (Herkenbaar?): eyebrow → serif-kop → drie kaarten met donkere illustratiekop
- **Sectie 3** (Zo werkt het): eyebrow → serif-kop → drie kaarten met donkere illustratiekop
- **Sectie 9** (Zes dimensies): eyebrow → serif-kop → zes kaarten met donkere illustratiekop
- Alle illustratieblokken komen uit dezelfde deterministische SVG-generator: hetzelfde marineblauwe "sterrenbeeld"- of "grafiek"-tafereel met een oranje lijnicoon erin.

Drie keer exact hetzelfde ritme, twaalf bijna identieke beeldblokken. Je oog leert na de tweede sectie dat er niets nieuws komt. Dat is precies "the plain one was clear and the pretty one made you work" — alleen is dit de derde variant: mooi én uniform, wat neerkomt op onzichtbaar.

**Twee secties voeren hetzelfde argument.** Sectie 10 ("Van onderbuik naar onderbouwing", zonder/na-vergelijking) en sectie 12 ("De kosten van niets doen", kostenanker) zeggen allebei: zonder meten verlies je geld. Sectie 2 zei het al. Sectie 5 (statistieken) zei het ook.

**Twee regels uit je eigen geheugen worden geschonden:**
- *Nooit lopende tekst centreren.* De statistiekenkaarten (0,5× / 3 / 12) hebben gecentreerde cursieve onderschriften van vier tot vijf regels. De eind-CTA is volledig gecentreerd. Beide moeten links uitgelijnd.
- *Crisp SVG boven raster.* Wordt gehaald, maar het is doorgeslagen: er is nul fotografie in de hele repo. Geen `.jpg`, geen `.webp`, geen `next/image` behalve het eigen logo.

**Een concrete renderfout:** op de dimensiekaarten staat "Meet deze dimensie → →" — twee pijlen. Er zit een pijl in de vertaalstring én een pijl-icoon in de component.

**factumcapital.eu** heeft het omgekeerde probleem. Daar is de visuele taal wél onderscheidend — donkere marine, wijnrood accent, de gegenereerde `SegmentField`-silhouetten, een strak monospace-register. Het is duidelijk geen template. Maar er is nul fotografie, geen productscreenshot, en de teamkaarten gebruiken monogrammen in plaats van portretten. Het argument tegen generieke LLM's en tegen traditionele due diligence is structureel sterk — dispatch-graaf, 254 sub-agents, vaste afhankelijkheidsvolgorde, vier grounding-checks, verplichte menselijke poort — maar het wordt **beweerd, nooit getoond**.

### Wet 3 — Weinig variabelen, en de meetbaarheid daarvan

**Er zit geen analytics op beide apps.** Geverifieerd in beide `package.json`-bestanden en door de hele broncode: geen Plausible, PostHog, Vercel Analytics, Umami, Fathom, Matomo of gtag.

Dat betekent dat je vandaag niet weet:
- hoeveel bezoekers de homepage krijgt
- hoeveel er op "Start de Scorecard" klikken
- waar in de zeven schermen ze afhaken
- hoeveel er de e-mailmuur passeren
- hoeveel er een intake boeken

Zonder dat kun je geen enkele wijziging in dit plan beoordelen en is Hormozi's "één split-test per week" niet uitvoerbaar. **Dit is stap nul en het is de goedkoopste stap in het hele document.**

### Positionering — twee merken, één verhaal

Overkoepelend en niet uit de video, maar het beïnvloedt alles hierboven: een bezoeker kan niet uitleggen wat hij koopt.

- agenticmindshift.nl verkoopt een gratis scorecard die leidt naar advies van één persoon
- factumcapital.eu verkoopt een platform met 31 modules en 254 sub-agents, en een Diligence Sprint
- de scorecard "draait op Factum Capital"
- dezelfde oprichter, twee domeinen, twee visuele talen, twee CTA's, twee prijsverhalen (agenticmindshift toont prijzen, factum niet)

Wet 4 zegt: in vijf seconden moet duidelijk zijn wie je bent en wat je doet. Over twee sites verdeeld lukt dat niet. Het is een ander gesprek dan dit plan, maar het is de reden dat elke afzonderlijke pagina moeilijker te schrijven is dan nodig.

---

## 3. Plan — agenticmindshift.nl

Gerangschikt op hefboom, niet op inspanning. Hormozi: twee of drie beslissingen die bewegen, de rest negeren.

### A0 — Analytics installeren *(vereiste, vóór al het andere)*

Plausible of PostHog, cookieloos, in de root layout van beide apps. Vastleggen als events:

```
hero_cta_click            scorecard_start
scorecard_section_done    (met sectienummer)
scorecard_abandon         (met sectienummer)
gate_view                 gate_submit
report_view               intake_click
```

**Waarom:** zonder deze events is elke verdere regel in dit document een mening. Met deze events wordt het een testprogramma. Cookieloos zodat de privacypagina niet hoeft te veranderen en er geen cookiebanner bijkomt — die zou zelf een conversielek zijn.

### A1 — Het artefact naar boven de vouw *(hoogste hefboom van het hele document)*

Zet de `ScorecardReportMockup` — of een strak uitgesneden variant van drie of vier dimensiebalken plus de badge "2/6 dimensies onder referentieniveau" — rechts naast de H1 in de hero. Tweekolomsindeling, zoals de hero op factumcapital.eu al doet.

**Waarom:** dit is Hormozi's letterlijke tweede testvariabele. Je hebt het beeld al, het is echt (geen stockfoto, en het is expliciet gelabeld "Illustratief voorbeeld · geen echte data"), en het beantwoordt de vraag "wat krijg ik eigenlijk" op het moment dat de bezoeker nog beslist of hij blijft. Het verandert de hero van een belofte in een preview. En het vult de lege rechterhelft van het scherm die er nu uitziet als een onaf ontwerp.

Bijkomend voordeel: het label "geen echte data" is eerlijk en het staat er al. Dat past bij de rest van de site.

### A2 — De kop herschrijven en testen

De huidige kop moet blijven bestaan als variant A. Test hem tegen twee alternatieven die wél zeggen wat de bezoeker krijgt. Richtingen (definitieve tekst in overleg):

- **A (huidig):** "Hoeveel rendement laat uw portefeuille liggen?"
- **B (uitkomst + deliverable):** iets in de trant van "Twaalf minuten. Daarna weet u op welke twee punten uw dealproces rendement lekt." — noemt tijd, uitkomst en specificiteit
- **C (deliverable eerst):** een kop die het rapport zelf tot onderwerp maakt in plaats van het probleem

Regel voor alle varianten: één zin, ≤5 seconden, en de lezer moet kunnen navertellen wat hij krijgt.

**Waarom:** de kop is Hormozi's variabele nummer één en hij noemt vandaag geen deliverable.

### A3 — Bewijs bouwen *(de echte klus, en hij is niet technisch)*

Dit vereist input van jou, niet van code. Ik kan en zal niets verzinnen. In volgorde van waarde:

1. **Eén klantcitaat met naam en functie.** Eén. Van iemand die de scorecard of een traject heeft gedaan. Als naamsvermelding niet kan: "Partner, mid-market PE-fonds, Benelux" is nog altijd oneindig veel meer dan nul. Plaatsing: direct onder de hero én naast de eind-CTA.
2. **Een echt geanonimiseerd voorbeeldrapport als downloadbare PDF.** Dit bestaat al — de site zegt nu "vraag het op via LinkedIn of e-mail". Dat is een wrijvingsmuur voor iets dat een link zou moeten zijn. Zie ook A5.
3. **Een foto van Wouter.** Zie A4.
4. **Eén geanonimiseerde mini-case:** situatie, wat de scorecard liet zien, wat er is gedaan. Drie alinea's. Geen cijfers die je niet kunt onderbouwen.
5. **De Nyenrode-certificering** naar boven halen als visueel element in plaats van een regel in een tijdlijn.

**Waarom:** Amazon veranderde het product niet, het veranderde de waargenomen kans van slagen. Dit is de enige noemer-factor die je nu op nul hebt staan.

### A4 — Fotografie invoeren

Minimaal: één echt portret van Wouter op `/over` en in het oprichtersblok op de homepage. Verder: één foto van de werkelijke werkomgeving.

Expliciet **geen** stockfoto's. De video is hier ondubbelzinnig: iedereen herkent het team dat high-fivet in een boardroom, en op het moment dat ze het doorhebben vraagt een stemmetje wat er nog meer nep is. Echte, licht imperfecte beelden doen het omgekeerde — en met AI die het internet volgooit met perfect en zielloos ontwerp is "een mens heeft hier tijd in gestoken" het sterkste vertrouwenssignaal dat er nog is.

**Waarom hier extra:** `/over` is je vertrouwenspagina. De H1 is letterlijk "Wouter Dijkman", gezet tegen een spookletter "W" op 2,8% dekking. Een naam zonder gezicht op de pagina die vertrouwen moet wekken bij mensen die je vertrouwelijke dealdata gaan sturen.

### A5 — Een lagere sport op de ladder

Voeg één actie toe die minder kost dan twaalf minuten:

- **Voorbeeldrapport downloaden** (e-mail optioneel, of helemaal zonder). Dit is de logische keuze: het bewijst de deliverable én het is een lead-magnet.

En verlaag de bestaande drempel:
- Toon **de score per dimensie** vóór de e-mailmuur, niet alleen het totaal van 75. Houd de interpretatie en het advies achter de muur. Nu geef je een getal zonder betekenis en vraag je drie velden voor de betekenis.
- Maak "bedrijf" optioneel. Naam + zakelijk e-mail is genoeg om een rapport te sturen.

**Waarom:** *"we have to lower that bar so much that there's so little friction."* Twee verplichte velden minder en een echt resultaat vóór de muur verlagen precies de twee factoren onder de streep.

### A6 — De homepage inkorten en visueel doorbreken

Van dertien secties naar acht à negen. Concreet:

- **Samenvoegen:** sectie 10 (Van onderbuik naar onderbouwing) en sectie 12 (De kosten van niets doen) voeren hetzelfde argument. Eén van beide behouden — bij voorkeur het kostenanker, want dat is concreter — en de ander schrappen.
- **Verplaatsen:** het bewijs uit A3 hoort hoog, direct na de hero of na sectie 2.
- **Doorbreken:** maximaal twee secties met het donkere-kaart-grid. De rest krijgt een ander formaat: een tabel, een tijdlijn, een groot enkel beeld, een citaat over de volle breedte. Nu is het drie keer hetzelfde raster met twaalf bijna identieke gegenereerde illustraties.
- **Links uitlijnen:** de statistiekenkaarten en de eind-CTA staan gecentreerd. Tegen de eigen huisregel.

**Waarom:** twaalf schermen scrollen is in Hormozi's termen pure Moeite in de noemer. En de visuele uniformiteit is precies waar de presentator voor waarschuwt: het ziet eruit als elk ander bedrijf in de sector, dus wordt het geprijsd als elk ander bedrijf in de sector.

### A7 — Bewijs bij elke knop

Standaardpatroon, overal waar een primaire CTA staat: knop + één regel bewijs eronder of ernaast.

- Bij de scorecard-CTA's: de bestaande spec-strip (12 min · geen account · vertrouwelijk) — die werkt al, hergebruik hem.
- Bij de intake-CTA's: de garantie uit /werkwijze, in één zin, plus "u hoort niets van ons tenzij u zelf contact opneemt" — dat is een sterke anti-verkoopbelofte die nu weggestopt zit.
- Bij de eind-CTA: het klantcitaat uit A3 zodra dat er is.

**Waarom:** *"I put these right around the call to action button on purpose because that's the exact spot where the doubt spikes."*

### A8 — CTA's boven de vouw op de binnenpagina's

`/over`, `/werkwijze` en `/factum-capital` hebben geen enkele actie boven de vouw. Voeg er één toe per pagina, passend bij de intentie van die pagina.

### A9 — Inconsistenties opruimen

- `public/llms.txt` synchroniseren of verwijderen: 29 vs 31 modules, 20 vs 30 minuten, verlopen lanceerdatum, verkeerde functieomschrijving
- retainer-minimum: drie of zes maanden, één antwoord, overal
- de dubbele pijl op de dimensiekaarten
- "3 werkdagen per maandrapportage" heeft geen bron en geen label, terwijl het kostenanker daar wel netjes een voetnoot bij heeft. Labelen of schrappen.

**Waarom:** je verkoopt nauwkeurigheid. Elke tegenstrijdigheid is gratis munitie voor de twijfel waar je volgens wet 6 tegen vecht.

---

## 4. Plan — factumcapital.eu

*Deze sectie is herschreven. De vorige versie leunde op een tekstaudit en bevatte twee feitelijke fouten — die staan expliciet benoemd in §4.0. Wat hieronder staat heb ik zelf gemeten: alle acht homepagesecties en alle zes binnenpagina's, op 1440×900, EN, met de reveal-animatie uitgezet.*

### 4.0 Twee correcties op mijn eigen eerdere tekst

1. **"Geen enkel voorbeeld van een bevinding" was onjuist.** `FindingSchema` staat in de hero van de homepage, bóven de vouw, en nog een keer in de hero van `/platform`. Het is het enige echte artefact van de site en het staat op de twee beste plekken die er zijn. Het probleem is niet dat het ontbreekt — het probleem is wat het bijschrift eronder zegt. Zie F2.
2. **"Nul fotografie" klopt, maar niet om de reden die ik gaf.** Ik heb het nagekeken: er is geen `public/`-map, geen enkel raster-asset, geen `next/image`. Alles wat op een foto lijkt is `SegmentField` — een procedureel gegenereerde SVG. Zie F5. De conclusie wordt daardoor niet zwakker maar sterker.

### 4.1 Wat ik gemeten heb

| pagina | hoogte | secties |
|---|---|---|
| `/en` | 8.495 px | 8 |
| `/en/platform` | 11.029 px | 11 |
| `/en/governance` | 8.045 px | 10 |
| `/en/diligence-sprint` | 6.539 px | 9 |
| `/en/partnerships` | 5.584 px | 7 |
| `/en/team` | 2.976 px | 3 |
| `/en/contact` | 2.471 px | 3 |

Samen ruim 45.000 px scrollhoogte en 6.162 woorden in `messages/en.json`, voor een bedrijf dat nog geen klant heeft.

Kijk naar de verdeling, want die is het hele verhaal: **`/platform` en `/governance` zijn samen 19.000 px over hoe de machine werkt en wat we níét beweren. `/diligence-sprint` — het ding dat je koopt — is 6.500 px. `/team` — de mensen aan wie je je dataroom geeft — is 2.976 px, waarvan 831 px hero.** De aandacht is precies omgekeerd verdeeld aan wat een deal sluit.

Dat is geen toeval en het is ook geen luiheid. Het is wat een bedrijf doet dat zijn geloofwaardigheid nog niet kán aantonen: het beschrijft zijn eigen machinerie in meer detail dan iemand gevraagd heeft. Het is eerlijk, het is goed geschreven, en het leest als pre-revenue.

### 4.2 De vouw, pagina voor pagina

**De homepage-hero is het beste scherm van beide sites.** Dat moet gezegd. Twee kolommen, een kop met een mening — *"Nobody should sign a number they haven't read"* — een echt artefact rechts, een primaire CTA en een secundaire. Wet 4 vraagt: wie ben je, wat is het, wat krijg ik, binnen vijf seconden. Dit scherm haalt dat. Er hoeft niets aan behalve het bijschrift en de voetnoot.

**De zes binnenpagina's halen het niet.** `PageHeader` is op alle zes exact 831 px, en bevat kop + subkop. Geen CTA. Geen artefact, behalve op `/platform`, dat hetzelfde `FindingSchema` hergebruikt.

Het scherpste voorbeeld is `/diligence-sprint`, en dat is uitgerekend de productpagina. Het eerste scherm is: kop, twee regels subkop, en daaronder ruim zeshonderd pixel lege blauwe gradiënt. Geen knop, geen prijs, geen bewijs, geen volgende stap. Dat is de pagina waar iemand landt die al geïnteresseerd is.

### 4.3 Het artefact ontkent zijn eigen bewijskracht

Onder `FindingSchema` staat, letterlijk, dat het schema is waar elke bevinding aan moet voldoen — en dat klantwerk vertrouwelijk is, zodat er geen voorbeeld te publiceren valt.

Dat zinnetje staat **boven de vouw, op de twee belangrijkste pagina's van de site**. Het enige artefact dat je hebt gebruikt zijn onderschrift om uit te leggen waarom er geen bewijs is.

Ik snap waar het vandaan komt en het is integer. Maar wet 5 gaat over waargenomen kans van slagen, en dit is een actieve aftrek daarop, op de duurste vierkante centimeters die je bezit. Amazon veranderde niets aan het product en alles aan de waargenomen kans, met reviews. Factum doet het omgekeerde: het product is er, en de site zegt erbij dat je het niet mag zien.

### 4.4 "Pre-launch" staat negen keer in `en.json` — maar de plaatsing is het probleem

Drie van die negen zitten op de homepage, en precies op de drie plekken waar het het duurst is:

1. als voetnoot direct onder de primaire CTA in de hero;
2. als voetnoot direct onder de primaire CTA in de slot-CTA — *"counted in single digits"*;
3. in de footer-copyright, `© 2026 Factum Capital. Pre-launch.`

Wet 6 is hier heel precies: bij de knop piekt de twijfel, dús zet je daar je vertrouwenselement neer. Factum zet daar zijn grootste risicovlag neer. Twee keer, plus in de chrome.

Het feit moet blijven staan — je gaat niet doen alsof je klanten hebt. Maar het hoort niet ónder de knop.

### 4.5 De sterkste conversie-asset van beide sites ligt begraven

> *"Three material findings your own team had not already identified, or the engagement is free."*

Dat is precies de specifieke, controleerbare garantie die de video voorschrijft, in tegenstelling tot het vage badge-type dat het brein overslaat. Het is de enige echte risico-omkering op een van beide properties.

Gemeten waar hij staat:
- homepage: op **4.885 van 8.495 px** — 58% naar beneden, ruim voorbij het punt waar de meeste bezoekers weg zijn;
- `/diligence-sprint`: op 1.215 px, onder de vouw;
- bij een CTA: **nergens**.

De slot-CTA op de homepage, op 7.525 px, heeft geen garantie. Die heeft de pre-launch-disclaimer.

Je hebt dus het juiste wapen, in de verkeerde hand, met de veiligheidspal erop.

### 4.6 Dertig beeldposities, één generator, nul informatie

Dit is de bevinding waar ik het meest van schrok, omdat het vakwerk is dat de verkeerde kant op wijst.

Er staan acht `MediaCards`-grids op de site — drie op de homepage, drie op `/diligence-sprint`, één op `/governance`, één op `/partnerships` — plus een `SegmentField`-achtergrond achter elke `PageHeader`. Bij elkaar zo'n dertig beeldposities.

Alle dertig komen uit één component: een defocuste macro van zevensegment-glyphs, meters, puntenwolken en tijdlijnen. Twaalf presets, met een tooncyclus van 3 en een vormcyclus van 4, coprime gekozen zodat geen twee aangrenzende kaarten dezelfde vorm of kleur delen. Er zit echt denkwerk in.

En dan staat er in de code van `SegmentCard.tsx` het volgende, over waarom de cijfers eruit zijn gehaald: een cijfer is een vorm die een lezer zelfs bij zware blur probeert te ontcijferen, dus het bleef een getal binnenslepen op een plek waar geen numerieke claim gemaakt werd. De conclusie in het bestand zelf is dat het plaatje nu alleen nog licht is.

Dat is een eerlijke observatie en een correcte oplossing voor het probleem dat er stond. Maar het legt ook vast wat het beeld nu is: **decoratie waarvan expliciet is gegarandeerd dat het niets betekent.**

Wet 4 zegt dat er twee dingen zijn die het testen waard zijn: de kop, en het beeld er direct onder. Op factumcapital.eu is dat tweede vakje dertig keer gevuld met iets dat per ontwerp geen informatie draagt. Nul screenshots, nul diagrammen, nul gezichten, nul foto's.

Het scherpst zichtbaar in sectie 2 van de homepage, *"Who reads it"* — de sectie die bestaat om de twee mensen te verkopen (*"Underwritten like a bank would, built like production software has to be"*). Ernaast: een veld wazige bokehbollen. Dat is exact de plek waar een portret hoort.

En op `/team`: twee wijnrode vierkantjes met **WD** en **DD**. Je vraagt om toegang tot een dataroom. Er is geen gezicht op de hele site.

### 4.7 Wat er goed is, en waarom ik dat niet zou aanraken

Voor de balans, want dit is geen sloopplan:

- **De koppen zijn scherp en hebben een standpunt.** *"The whole room, not a sample of it"*, *"See what a buyer would find, before they do"*, *"Start with a call, not a proposal"*. Dat is schrijven met een mening, en dat is precies wat de presentator bedoelt met er niet uitzien als de rest van je branche.
- **De vijfstapsectie en de hard-blocks zijn overtuigend materiaal.** Een blok dat opsomt waarop de loop weigert automatisch goed te keuren, met de regel dat elke hard-block naar een mens routeert — dat is concreet en verifieerbaar.
- **De expliciete limits-secties** op `/platform` en `/governance` — de erkenning dat het meeste wat een koper op zo'n pagina wil er nog niet is, en dat opsommen beter is dan het impliceren — zijn zeldzaam en juist.
- **Geen formulier op `/contact`**, met de redenering dat een formulier een wachtrij impliceert. Verdedigbaar als *primair* pad.

Het ontwerp is niet het probleem. De teller van de waardevergelijking is in orde. Alles wat hieronder staat zit in de noemer.

---

### F1 — CTA in `PageHeader` *(regressie van deze sessie, visueel bevestigd)*

`PageHeader` heeft geen CTA-slot. Sinds elke binnenpagina op één scherm past, is het eerste en enige gegarandeerde scherm van zes pagina's tekst zonder vraag.

Voeg een optionele CTA-slot toe en vul hem op alle zes. Begin bij `/diligence-sprint`, want daar is de kost het hoogst.

**Waarom:** wet 4. Bijna alle winst zit boven de vouw, en zes van de zeven pagina's vragen daar niets.

### F2 — Herschrijf het bijschrift onder `FindingSchema`

Het artefact blijft; het bijschrift gaat eruit. Vervang de ontkenning door wat het schema wél garandeert — dat elke bevinding een document, een passage en een naam achter zich heeft, en dat je die maanden later nog kunt openen.

Als de vertrouwelijkheid genoemd moet worden, doe dat dan niet op de plek waar het bewijs zou moeten staan.

**Waarom:** wet 5. Dit is de enige plek op de site waar de waargenomen kans van slagen actief omláág wordt bijgesteld, en het gebeurt boven de vouw op twee pagina's.

### F3 — Zet de garantie waar hij werkt

*"Drie materiële bevindingen die je eigen team niet al had gevonden, of de opdracht is gratis."*

- Op de homepage, boven of direct onder de vouw — niet op 58%.
- **Naast elke intake-CTA**, inclusief de slot-CTA en de knop in de navigatie.
- Met de voorwaarde hardop in dezelfde zin. Een expliciete restrictie is geloofwaardiger dan een voetnoot, en het staat er nu al eerlijk bij: het risico van dit vroege stadium ligt bij Factum, niet bij de klant. Dat is een sterke zin. Laat hem meeliften in plaats van hem te verstoppen.

**Waarom:** wet 6, letterlijk. Vertrouwenselementen horen bij de knop, want daar piekt de twijfel.

### F4 — Haal "pre-launch" weg bij de knoppen

Het feit blijft, de plaatsing verandert. Concreet: weg uit de hero-voetnoot en weg uit de slot-CTA-voetnoot; die twee plekken krijgen de garantie uit F3. Laat het staan op `/team`, op `/governance` en in de footer, waar het als eerlijkheid leest in plaats van als waarschuwing.

**Waarom:** je vertelt de bezoeker nu op het moment van beslissen dat je nog geen klanten hebt. Dezelfde informatie, twintig regels eerder, leest als openheid.

### F5 — Vervang gegenereerd beeld door echt beeld, in deze volgorde

`SegmentField` mag blijven als achtergrondtextuur. Maar de dertig kaartposities verdienen inhoud. In volgorde van waarde:

1. **Een visualisatie van de dispatch-graaf.** Dit is je hele structurele argument tegen "gewoon een LLM met een groot contextvenster", het bestaat nu uitsluitend als tekst, en het is inherent visueel materiaal: modules in vaste afhankelijkheidsvolgorde. Dit is de goedkoopste echte winst op de site — je hebt er niemands toestemming voor nodig.
2. **Twee portretten.** Zie F6.
3. **Een screenshot of schermopname van het platform.** Geredigeerd mag.
4. **Eén echte, geredigeerde bevinding**, zodra een pilotklant er een vrijgeeft. De component staat er al klaar voor.

**Waarom:** wet 4 noemt het beeld onder de kop een van de twee dingen die het testen waard zijn. Wet 5 zegt dat echt, licht imperfect beeld inmiddels het sterkste vertrouwenssignaal is dat er bestaat. Dertig posities gevuld met bewust betekenisloze abstractie is dertig gemiste kansen op precies die twee assen.

### F6 — Gezichten

Twee oprichters, twee monogrammen. Twee portretten — op `/team`, en één van hen in sectie 2 van de homepage, waar nu de bokeh staat.

**Waarom:** hetzelfde argument als A4, en hier zwaarder. Je vraagt om toegang tot een dataroom.

### F7 — De onbeantwoorde angsten

De site behandelt netjes: EU-hosting onder DPA, geen training op klantdocumenten, pseudonimisering, een benoemde menselijke reviewer, zero-retention als routeringsregel die dichtklapt bij twijfel, tenancy-splitsing met opt-out. Dat is goed werk en het is meer dan de meeste concurrenten laten zien.

Wat nergens beantwoord wordt, en wat elke due-diligence-koper vraagt:

- aansprakelijkheidsplafond
- NDA vóór het gesprek
- belangenconflicten — wat als je aan de andere kant van dezelfde deal werkt
- versleuteling in rust en tijdens transport
- Factums eigen opslaglaag en bewaartermijn
- continuïteit als de enige reviewer niet beschikbaar is
- beroepsaansprakelijkheidsverzekering
- of de deliverable bruikbaar is in een SPA of richting een financier

Eén pagina, of één uitklapbaar blok onder de bestaande limits-sectie op `/governance` — die sectie heeft al de juiste toon, dit is de ontbrekende helft ervan.

**Waarom:** wet 6. Dit zijn de exacte risico's in het hoofd van je koper en ze staan nergens.

### F8 — Een tweede sport op de ladder

Nu: één URL, acht keer. De redenering achter het ontbrekende formulier is verdedigbaar voor het primaire pad, maar wie nog niet zover is heeft nul manieren om in beeld te blijven. Voeg toe:

- een e-mailadres, of
- een downloadbaar één-pagina-overzicht van de Diligence Sprint.

### F9 — Inkorten, en de aandacht herverdelen

45.000 px scroll voor zeven pagina's, met het zwaartepunt op mechanisme.

- `/platform` van elf naar zes à zeven secties. De inventaris- en alternatievensecties kunnen samen of naar beneden.
- `/governance` van tien naar zeven. De vier verschillende gegevensbehandelingsblokken maken deels hetzelfde punt.
- `/diligence-sprint` mag juist **groeien**, met de garantie en met de dispatch-graaf uit F5.

**Waarom:** wet 5, noemer — tijd en moeite. En wet 3: als de pagina's korter zijn is het verschil tussen twee versies daadwerkelijk toe te schrijven.

### F10 — Layout- en opruimdefecten

Gevonden tijdens de visuele sweep:

- **Het disciplinegrid op de homepage (sectie 4, "The whole room") heeft een rafelige laatste rij.** Dertien items: twee rijen van vijf, dan een rij van drie met een andere kolombreedte dan de rijen erboven, die niet doorloopt tot de rechtermarge. Het valt op omdat de rest van de site strak is uitgelijnd.
- **Twee verschillende linkermarges op één pagina.** De homepagesecties op 1.704 / 2.313 / 4.078 px beginnen op x = 145; die op 4.885 / 6.224 / 6.900 / 7.525 px beginnen op x = 280.
- **De slot-CTA heeft een volledig lege rechterhelft.** Daar hoort de garantie uit F3 te staan.
- `components/Figures.tsx` wordt nergens geïmporteerd — dood bestand.
- De comment in `proxy.ts` verwijst naar `LocaleBanner`, die niet bestaat. Bouwen (zie §5) of de comment corrigeren.
- De oude dev-server op poort 3100 serveert ongestyled HTML door een verlopen buildcache. Lokaal artefact, geen productiedefect, maar het is het controleren waard vóór de volgende deploy.

### 4.8 De samenvatting van deze sectie in één alinea

Factumcapital.eu is beter ontworpen en beter geschreven dan agenticmindshift.nl, en heeft één conversieprobleem dat groter is dan alle problemen van web bij elkaar: **het bezit precies één sterke risico-omkering en één sterk artefact, en het heeft ze allebei ontwapend.** De garantie ligt op 58% van de pagina en staat bij geen enkele knop; het artefact draagt een bijschrift dat uitlegt waarom er geen bewijs is; en bij de twee knoppen die er echt toe doen staat in plaats van een vertrouwenselement de mededeling dat het bedrijf nog niet gelanceerd is. Dat zijn drie tekstbesluiten, geen designbesluiten. Ze zijn deze week te repareren.

---

## 5. Taal op basis van IP-adres

### Wat er nu is

**apps/web heeft dit al** — `apps/web/proxy.ts` bevat een land→taal-tabel en redirect vanaf `/`:

```ts
const country = request.headers.get('x-vercel-ip-country') ?? 'NL';
```

De tabel klopt met je wens: NL/BE/SR/AW/CW/SX → nl, DE/AT/CH/LI → de, twintig Spaanstalige landen → es, PT/BR/AO/MZ/… → pt, de rest → en. Cookie `NEXT_LOCALE`, één jaar geldig. De redirect gebeurt alleen op `/`, niet op `/{locale}/...` — dat is SEO-technisch correct en moet zo blijven.

**apps/factum heeft dit niet.** `localeDetection: false`, dus `/` gaat altijd naar `/en`. Een Spanjaard krijgt Engels zonder enige melding.

### De vijf defecten

1. **Verkeerde fallback op web.** `?? 'NL'` betekent: elk verzoek zonder de Vercel-header krijgt Nederlands. Dat is niet wat je vroeg. Je vroeg Engels als fallback. Dit raakt localhost, sommige bots, en elk verzoek dat de edge-header mist.
2. **Geen `Vary`-header.** Het antwoord varieert op `x-vercel-ip-country` en op cookie, maar zegt dat niet. Een CDN mag dan de locale van de ene bezoeker aan de andere serveren. Dit is de meest waarschijnlijke echte bug in de bestaande implementatie.
3. **Geen `Accept-Language` als tussenstap.** Als de geo-header ontbreekt is de browsertaal een betere gok dan blind terugvallen.
4. **`x-default` wijst naar `/nl`** in `apps/web/lib/hreflang.ts`, terwijl de geo-fallback `en` is. Die twee moeten hetzelfde zeggen.
5. **Dubbele hreflang op web.** factum zet `alternateLinks: false` en levert hreflang één keer via de Metadata API. web zet dat niet, dus next-intl stuurt óók `Link:`-headers. Niet fataal, maar de twee bronnen kunnen uit elkaar lopen — en de headers weten niets van de `x-default`-keuze.

### Voorgestelde implementatie

**Eén gedeelde tabel.** Nieuw bestand `packages/ui/src/geo-locale.ts` (of een klein `packages/i18n-geo`), zodat beide apps één waarheid hebben:

```ts
export type Locale = 'nl' | 'en' | 'de' | 'es' | 'pt';

const COUNTRY_TO_LOCALE: Record<string, Locale> = { /* de bestaande tabel */ };

/** Volgorde: expliciete keuze (cookie) > land > browsertaal > 'en'. */
export function resolveLocale(opts: {
  country?: string | null;
  acceptLanguage?: string | null;
  supported: readonly Locale[];
}): Locale;
```

**Landbepaling met een keten in plaats van één header**, zodat het ook werkt als factum ergens anders draait dan Vercel:

```
x-vercel-ip-country  →  cf-ipcountry  →  null
```

Bij `null` valt hij door naar `Accept-Language`, en dan pas naar `'en'`.

**Waar het aangrijpt:** uitsluitend op `pathname === '/'`, in beide apps, met de cookiecheck ervoor. Op factum blijft `localeDetection: false` staan — die vlag regelt het gedrag op *alle* paden, en dat gedrag is bewust en goed. De geo-logica zit in de wrapper eromheen, precies zoals web het nu al doet.

**Op het redirect-antwoord:**
```
Vary: x-vercel-ip-country, cookie
```
en de cookie met `path: '/'`, `sameSite: 'lax'`, één jaar.

**307, niet 308.** Een permanente redirect op een geo-variërende URL wordt door de browser voor altijd gecached.

**Een uitweg voor de bezoeker.** Als we automatisch omleiden hoort daar een zichtbare ontsnapping bij — dat is ook Google's richtlijn. Bouw de `LocaleBanner` die in de factum-comment al genoemd wordt maar niet bestaat: één regel bovenaan, alleen zichtbaar na een automatische redirect, "Deze pagina wordt getoond in het Nederlands — bekijk in het Engels", wegklikbaar, en de keuze schrijft de cookie zodat geo hem nooit meer overrulet.

**SEO-veiligheid, expliciet:**
- redirecten gebeurt **alleen** op `/`. Alle `/{locale}/...`-URL's blijven 200 geven, ook voor Googlebot uit de VS.
- `/` staat in geen van beide sitemaps, dus de redirect kost geen indexdekking.
- `x-default` op web aanpassen naar `/en` zodat hij overeenkomt met de fallback.
- `alternateLinks: false` toevoegen aan de web-routing, zodat hreflang net als bij factum uit één bron komt.

**Te verifiëren vóór implementatie:**
- Schrijft de `LanguageSwitcher` de `NEXT_LOCALE`-cookie? Zo niet, dan wordt een handmatige keuze bij het volgende bezoek van `/` overruled door geo. Dat is de vervelendste bug in dit soort systemen.
- Draait factum op Vercel? Het staat niet in de repo — `.vercel/repo.json` bevat alleen het web-project en `apps/factum` heeft geen `vercel.json`. Dit moet bevestigd worden, anders is `x-vercel-ip-country` daar niet beschikbaar en doet alleen de `Accept-Language`-tak nog iets.

**Tests.** Er is op dit moment geen enkele test in de repo — geen vitest, geen jest, geen playwright. Een land→taal-tabel is de goedkoopst denkbare eerste unittest en de meest waardevolle: hij is puur, hij heeft een groot oppervlak, en een fout erin is onzichtbaar in ontwikkeling omdat de header lokaal nooit bestaat.

---

## 6. Volgorde

De video is expliciet over tempo: *"everyone wants to test 100 things"* — de discipline is één wijziging per keer, zodat je weet wát werkte.

**Sprint 0 — meten (een halve dag)**
- A0 analytics + events op beide apps

**Sprint 1 — de vouw (het meeste effect per uur)**
- A1 artefact naar de hero
- F1 CTA-slot in `PageHeader`, alle zes pagina's
- F2 bijschrift onder `FindingSchema` herschrijven
- F3 garantie naar de vouw en naar elke CTA
- F4 "pre-launch" weg bij de knoppen
- A8 CTA's op de binnenpagina's van web

*F2, F3 en F4 zijn drie tekstwijzigingen zonder designwerk en samen de grootste hefboom op factum. Wel één per keer meten, conform wet 3.*

**Sprint 2 — taal (los van het designdebat, kan parallel)**
- gedeelde `resolveLocale`, fallback naar `en`, `Vary`, `Accept-Language`-tak
- geo op factum, alleen op `/`
- `x-default` en `alternateLinks` rechtzetten
- `LocaleBanner`
- eerste unittests

**Sprint 3 — wrijving**
- A5 dimensiescores vóór de muur, "bedrijf" optioneel, voorbeeldrapport als download
- F8 tweede contactweg op factum

**Sprint 4 — bewijs** *(afhankelijk van jouw input, niet van code)*
- A3 citaat, case, voorbeeldrapport
- A4 + F6 portretten (factum: ook in sectie 2 van de homepage)
- F5.4 eerste vrijgegeven geredigeerde bevinding
- A7 bewijs bij elke knop

**Sprint 5 — vorm**
- A6 homepage inkorten van dertien naar acht à negen secties, kaartgrid doorbreken, tekst links uitlijnen
- F5.1 dispatch-graaf visualiseren *(geen toestemming van derden nodig — kan naar voren)*
- F5.3 screenshot van het platform
- F9 `/platform` en `/governance` inkorten, `/diligence-sprint` laten groeien
- F10 rafelig disciplinegrid, dubbele linkermarge, lege rechterhelft slot-CTA

**Doorlopend, één per week**
- A2 koptest, en daarna beeldtest. Nooit twee tegelijk.

---

## 7. Wat ik niet ga doen

- **Geen bedachte cijfers, citaten, klantnamen of logo's.** Dat is de repo-regel en het is ook gewoon de juiste keuze: dit is een due-diligence-propositie, één verzonnen getal kost je de hele geloofwaardigheid.
- **Geen stockfotografie.** De video is er ondubbelzinnig over en het zou hier extra hard aankomen.
- **Geen volledige redesign.** Dat is precies de fout die wet 3 beschrijft: veertig dingen tegelijk, achteraf niet te herleiden. Het ontwerp is niet het probleem.
- **Geen prijzen op factumcapital.eu**, geen partnernamen, geen derde teamlid. Vastgelegde beslissingen, ongewijzigd.

---

## 8. Wat ik van jou nodig heb om verder te kunnen

1. **Eén klantcitaat.** Naam mag geanonimiseerd. Dit is de grootste hefboom in het hele document en de enige die ik niet zelf kan maken.
2. **Een portretfoto** van jou, en van Daniel voor factum. Er staat op dit moment geen enkel gezicht op factumcapital.eu — alleen de monogrammen WD en DD — terwijl je om toegang tot een dataroom vraagt.
3. **Het geanonimiseerde voorbeeldrapport** als PDF, zodat het een download kan worden in plaats van een verzoek per e-mail.
4. **Een besluit over het retainer-minimum**: drie of zes maanden.
5. **Bevestiging waar apps/factum gehost wordt.**
6. **Analytics-keuze:** Plausible (eenvoudig, betaald, cookieloos) of PostHog (rijker, gratis tier, zwaarder).
7. **Akkoord op F4.** "Pre-launch" verdwijnt niet van de site, maar wel van de twee CTA-voetnoten. Dat is een positioneringskeuze, geen redactionele — daarom vraag ik hem expliciet.
8. **Toestemming om de dispatch-graaf te tekenen.** Dat is de enige grote visuele winst op factum waarvoor je niemand anders nodig hebt; ik moet alleen weten hoeveel van de structuur publiek mag.
