# Meetopzet — de eigen-datapagina

Status: **niet gebouwd, en dat is opzet.** Dit document is de voorwaarde, niet de pagina.
Laatste update: 2026-08-06.

Hoort bij `AUDIT-SEO-AEO-CRO-2026-08-06.md` §2.3B, kandidaat 3 ("eigen data").
Kandidaat 1 en 2 zijn wél gebouwd: `/method` en `/limits-of-ai`.

---

## 0. Waarom deze pagina er niet is

De audit noemt eigen data "de hoogste plafond-hefboom en de enige die ongevraagde
vakperspermeldingen oplevert". Dat klopt. Het is ook de enige van de drie die we
niet kúnnen schrijven, want er is niets gemeten.

De huisregel is absoluut: **geen verzonnen cijfers.** Een pagina met plausibele
percentages over mid-market datarooms zou vandaag binnen een uur te schrijven
zijn en zou precies dat zijn wat de rest van de site aanvalt — een leverancier
die een getal noemt zonder noemer. Eén geverifieerde tegenspraak van een
corp-dev-lezer kost meer dan de pagina ooit oplevert.

Dus: eerst het instrument, dan de sprints, dan pas de pagina.

**Wat dit document is:** de specificatie van wat er tijdens sprints wordt
vastgelegd, hoe, en welke bewering daaruit gepubliceerd mág worden.
**Wat het niet is:** een contentplan. Er staat hier geen copy in.

---

## 1. De blokkade die vóór alles komt: vertrouwelijkheid

Dit is geen formaliteit en het is de reden dat dit document met een juridische
sectie begint in plaats van met een lijstje metrieken.

De hele site staat op de belofte dat alles vertrouwelijk is. Elke sprint draait
onder NDA. Geaggregeerde statistiek over andermans dataroom is niet
vanzelfsprekend toegestaan alleen omdat er geen naam bij staat.

**Te regelen vóór de eerste meting:**

1. **NDA-doorlichting op een aggregatie-uitzondering.** Standaardclausule
   toevoegen aan nieuwe NDA's: geaggregeerde, niet-herleidbare procesdata mag
   worden gebruikt voor methodologische publicatie. Bestaande sprints tellen
   níét mee tenzij de tegenpartij dit alsnog schriftelijk toestaat — met
   terugwerkende kracht meten mag niet.
2. **Gescheiden opslag.** De meetstore bevat geen klantnaam, geen dealnaam, geen
   bestandsnamen, geen citaten. Alleen een sprint-ID, een datum, en de
   gecodeerde waarden uit §2. De koppeling sprint-ID → deal leeft ergens anders
   en gaat nooit mee in een export.
3. **k-anonimiteitsdrempel.** Publiceer nooit een cel die op minder dan **5**
   onderliggende deals rust. Dat geldt ook voor doorsneden: "software, DACH,
   €20–50M" is met n=3 een herkenbare deal, ook zonder naam.
4. **Geen sector-plus-omvang-plus-geografie tegelijk.** Maximaal twee van die
   drie assen in één gepubliceerde uitsplitsing.

*Punt 1 is een vraag aan Wouter en is een echte go/no-go. Zonder die clausule
stopt dit document hier.*

---

## 2. Wat we meten

Drie tiers, geordend naar hoeveel extra werk ze kosten. Tier 1 valt bijna
gratis uit de pijplijn; tier 3 vereist de klant. Begin bij tier 1 — een
meetopzet die te zwaar is wordt na sprint drie niet meer ingevuld, en dan is de
reeks waardeloos.

### Tier 1 — valt al uit een sprint (geen extra werk, alleen vastleggen)

**A. Dataroomcompleetheid.** *Dit is de kopclaim.* De audit noemt precies dit
voorbeeld: hoe vaak ontbreekt welk documenttype in een mid-market dataroom.

Per sprint, per documenttype op een **vaste** checklist, één van vier waarden:

| code | betekenis |
| --- | --- |
| `present` | aanwezig en compleet genoeg om de module op te draaien |
| `partial` | aanwezig maar incompleet (gaten in de reeks, verouderd, ongetekend) |
| `absent` | niet in de dataroom, wel verwacht voor dit dealtype |
| `na` | niet van toepassing op deze deal |

De checklist volgt de negen disciplines (Financial, Commercial, Legal, Tax, HR,
Technology, ESG, Operational, Valuation) en telt ±20 typen. **De checklist
wordt vastgezet vóór sprint 1 en daarna niet meer gewijzigd.** Een checklist die
tussentijds verandert maakt de reeks onvergelijkbaar, en dat is precies de fout
die dit soort leveranciersdata meestal onbruikbaar maakt. Wijzigen mag alleen
door een nieuwe versie te beginnen met een eigen teller.

Het onderscheid `absent` versus `na` is de hele meting. Wie die twee door elkaar
haalt meet niets. Definieer per documenttype schriftelijk wanneer het "verwacht"
is — één zin per type, vooraf.

**B. Hard-block-incidentie.** De zeven blokkeerklassen bestaan al in de pijplijn
(`HARD_BLOCK_COUNT = 7`): privacy leak, fabricated source, scope refusal,
insufficient depth, placeholder text, near-empty draft, low reviewer score.

Log per sprint per klasse: hoe vaak gevuurd, en op welke module. Dit is pure
logging — de gebeurtenis bestaat al, hij wordt alleen niet geteld. Dit is
tegelijk de meest onderscheidende data die we kunnen hebben: geen enkele
concurrent publiceert hoe vaak zijn eigen systeem tegengehouden wordt.

**C. Review-gate-uitkomst.** Per bevinding, één van drie: `accepted` (ongewijzigd
vrijgegeven), `edited` (inhoudelijk aangepast door de reviewer), `rejected`
(niet vrijgegeven). Plus bij `edited` een reden uit een gesloten lijst van ±6.

Dit is het cijfer dat `/limits-of-ai` inhoudelijk onderbouwt. "De mens is
verplicht" is nu een belofte; dit maakt er een gemeten aandeel van.

**D. Bevindingen per sprint**, uitgesplitst naar module en naar ernst. Puur
volume, maar het is de noemer waar A, B en C op rusten — zonder D is C een
percentage zonder basis.

### Tier 2 — kleine bewuste vastlegstap

**E. Groundingprotocol.** Er ligt al één getal: `GROUNDING_RATE = 96.7`, audit
van 15 juli 2026. Er ligt **geen geschreven protocol**, en dat is een risico:
als de tweede audit een andere noemer gebruikt is het verschil tussen de twee
metingen betekenisloos, en dan is de trend erger dan geen trend.

Vast te leggen, eenmalig, met terugwerkende kracht op de julimeting:
- Wat is de noemer — alle bevindingen, of alleen vrijgegeven bevindingen?
- Wat telt als "grounded" — bestaat het document, of klopt ook het paginanummer,
  of komt het citaat woordelijk voor?
- Wie beoordeelde, en beoordeelde één persoon of twee onafhankelijk?
- Steekproef of volledige telling? Bij steekproef: hoe getrokken?

Zonder deze vier is 96,7% één keer bruikbaar en daarna niet meer.

**F. Doorlooptijd.** Wall-clock van dataroomtoegang tot oplevering, plus de tijd
tot de eerste bruikbare bevinding. Onderbouwt de "in dagen"-claim die nu op vijf
pagina's staat zonder meting eronder.

### Tier 3 — vereist de klant, hoogste waarde

**G. Dealimpact.** Heeft een bevinding geleid tot een prijsaanpassing, een
SPA-clausule, een aanvullende garantie, of een afgebroken deal?

Dit is verreweg de citeerbaarste data die dit bedrijf kan bezitten en ook de
enige die niet uit onze eigen systemen komt. Vereist een expliciete vraag bij
deal-close. Verwacht een lage responsgraad; behandel het als bonus, niet als
fundament, en bouw geen publicatie die erop leunt.

---

## 3. Het instrument

Eén record per sprint plus één record per bevinding. Meer niet.

De verleiding is een dashboard. Doe dat niet — bij dit volume is een
versiebeheerd bestand beter dan een applicatie, want het kost niets om te
onderhouden en het is te reviewen in een diff.

- **Formaat:** twee CSV's of één JSON per sprint, in een privé-repo (níét deze
  repo — deze is publiek te maken en de meetdata hoort daar nooit in).
- **Invulmoment:** aan het eind van de sprint, door de reviewer, in één sessie.
  Niet gaandeweg — dan wordt het half gedaan.
- **Tijdsbudget:** ≤ 20 minuten per sprint. Wordt het meer, dan is de opzet te
  zwaar en moet er een meting uit.
- **Codeboek:** één markdownbestand naast de data met de definitie van elke
  waarde. Bij twijfelgevallen wordt het codeboek uitgebreid met het voorbeeld,
  niet de waarde opgerekt.

---

## 4. Publicatiedrempels — vooraf vastgelegd

Dit is het deel dat voorkomt dat we onszelf later voor de gek houden. De
drempels worden nú vastgesteld, vóórdat we de uitkomsten kennen, zodat de keuze
"wat publiceren we" niet achteraf op de gunstigste snit valt.

| n (sprints) | wat mag naar buiten |
| --- | --- |
| < 5 | niets. Uitsluitend intern. |
| 5–14 | **alleen absolute aantallen**, met n in dezelfde zin. "In 9 van de eerste 12 sprints ontbrak X." Geen percentages. |
| 15–29 | percentages toegestaan, altijd met n én meetperiode in dezelfde zin of directe caption. |
| ≥ 30 | uitsplitsing naar sector of omvang toegestaan, binnen de k≥5-regel uit §1. |

**Waarom geen percentages onder n=15:** bij twaalf sprints verschuift één extra
geval het percentage met acht punten. "75%" suggereert dan een precisie die er
niet is, terwijl "9 van de 12" exact even informatief is en niet liegt. Dit is
dezelfde redenering waarom `GROUNDING_RATE` op de site met zijn restpost
(`GROUNDING_REMAINDER`) en zijn auditdatum naast zich staat in plaats van als los
percentage.

**Vooraf geregistreerde claimsjablonen.** Vul in als de data er is; formuleer nu
al zo dat een tegenvallende uitkomst nog steeds publicabel is:

- *A:* "In {n} mid-market datarooms tussen {start} en {eind} ontbrak {type}
  volledig in {k} gevallen en was het incompleet in {m}."
- *B:* "Over {n} sprints stopte de automatische lus {k} keer op {klasse}."
- *C:* "Van {n} bevindingen ging {k} ongewijzigd de deur uit; {m} werd door de
  reviewer aangepast, {p} gehaald."
- *E:* "{pct}% van de bevindingen leidde terug naar bestaand document en
  paginanummer ({n} bevindingen, {datum}, interne telling, niet extern geaudit)."

Elk sjabloon eindigt met noemer, datum en de erkenning dat het één interne,
niet-geauditeerde dataset is. Dat is geen zwakte om weg te schrijven — het is
precies de toon die de rest van de site voert, en het is wat de pagina
citeerbaar maakt in plaats van verdacht.

**Een tegenvallende uitkomst wordt ook gepubliceerd.** Als blijkt dat de
reviewer de helft van alle bevindingen aanpast, is dát het artikel. Het bevestigt
`/limits-of-ai` in plaats van het tegen te spreken, en het is oneindig veel
geloofwaardiger dan een cijfer dat ons goed uitkomt. Vastleggen nu, zodat het
later geen keuze meer is.

---

## 5. Hoe het de site in komt

Wanneer de drempel gehaald is, geldt dezelfde discipline als voor elk ander
getal op deze site:

1. **Constante in `lib/site.ts`**, met een doc-comment die n, de meetperiode en
   de status ("interne telling, niet extern geaudit") benoemt — exact zoals
   `GROUNDING_RATE` en `COVERAGE_DIMENSIONS` dat nu doen.
2. **Nooit een getal in een message-bestand.** Getallen gaan als ICU-argument
   door `t()`. Een getal dat in `nl.json` staat, staat vier keer verkeerd zodra
   het verandert — zo overleefde ooit een hardgecodeerde "thirteen" een roster
   die naar tien was teruggebracht.
3. **De caveat is niet los te koppelen.** Het cijfer en zijn noemer staan in
   dezelfde component, zoals `Dial` de restpost naast de waarde zet.
4. **Route:** `/data` of `/what-we-see`, met dezelfde behandeling als `/method`
   en `/limits-of-ai` — buiten de header, in `REFERENCE_NAV`, in de sitemap, met
   contextuele links vanaf de pagina's wier claims het onderbouwt.

---

## 6. Wat we expliciet niet meten

- **Nauwkeurigheid tegen een "juist" antwoord.** Er is geen grondwaarheid voor
  een dataroom. Elke accuracy-claim zou een eigen oordeel als maatstaf nemen.
- **Vergelijking met menselijke due diligence.** Vereist parallelle uitvoering
  van dezelfde deal door een adviseur. Onbetaalbaar, en de uitkomst zou
  onvermijdelijk in ons voordeel geframed zijn.
- **Alles wat naar de klant herleidbaar is**, ongeacht hoe interessant. Zie §1.
- **Tevredenheidsscores.** Bij dit volume is het ruis, en het is het genre cijfer
  dat elke leverancier heeft en niemand gelooft.

---

## 7. Eerstvolgende acties

| # | actie | wie |
| --- | --- | --- |
| 1 | NDA-clausule voor geaggregeerde publicatie laten opstellen | Wouter — **go/no-go** |
| 2 | Documenttype-checklist vastzetten (±20 typen, met "verwacht"-definitie per type) | Wouter + Daniel, vóór de volgende sprint |
| 3 | Groundingprotocol van de julimeting alsnog opschrijven (§2E) | Daniel |
| 4 | Codeboek + twee CSV-templates in privé-repo | kan door mij, zodra 1 en 2 rond zijn |
| 5 | Meten vanaf de eerstvolgende sprint | doorlopend |

Pagina 3 wordt herbeoordeeld bij **n = 5** (mag het al intern iets betekenen) en
gebouwd bij **n = 15**. Niet eerder.
