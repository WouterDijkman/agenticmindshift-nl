# Factum Capital — volledige site-inhoud

Brontaal **Engels**. Dit is de volledige tekst van factumcapital.eu: 731 strings over 10 pagina's.

> **Gegenereerd bestand.** Gemaakt met `scripts/dump-content.py`. Bewerk deze md vrij — ik zet de wijzigingen daarna terug in `messages/en.json` en draag ze over naar nl/de/es/pt. Draai het script opnieuw om te resynchroniseren.

## Hoe je dit bewerkt

- **De sleutel boven elke regel (`home.hero.title`) is de koppeling naar de code. Laat die staan.** Verander alleen de tekst eronder.
- **Volgorde = leesvolgorde op de pagina**, niet de volgorde in het JSON-bestand. Secties verplaatsen doe je niet hier maar in de page-component; zeg het en ik doe het.
- **`{iets}` tussen accolades is een getal dat uit de code komt**, niet uit de tekst. Laat het staan waar je het wilt zien. Zie de getallenlijst onderaan voor de actuele waarden.
- **Rechte apostrof `'` is verboden.** ICU leest hem als escape en eet dan stilletjes de placeholder erachter op. Gebruik altijd `’`.
- **Secties gemarkeerd als GEDEELD staan op meerdere pagina's.** Eén bewerking werkt overal door. Dat is bewust: het voorkomt dat twee pagina's uit elkaar gaan lopen.
- **Nieuwe tekst mag langer of korter.** Als een lijst een item méér of minder krijgt, zeg dat er expliciet bij — sommige lijsten hebben een build-controle op hun lengte (9 disciplines, 22 modules, 5 waves).

## Wat hier NIET in staat

- **Tekst in afbeeldingen: die is er niet.** Alle 15 beelden zijn abstracte macrofoto's zonder letters, en ze staan bewust op `alt=""` omdat ze decoratief zijn. Er valt dus niets aan te schrijven. Wil je bijschriften onder de beelden, dan is dat nieuwe copy en nieuwe code.
- **Grafieken en diagrammen bevatten wél tekst, en die staat hier wel in** — labels van het dispatch-diagram, de vergelijkingsmatrix en de bevindingsschema-tabel zitten onder `shared.chart`, `platform.alternatives` en `shared.schema`.
- **De ja/nee-oordelen in de vergelijkingsmatrix staan in de code** (`app/[locale]/platform/page.tsx`, `MATRIX`), niet in de tekst. Dat is opzet: het zijn claims over wat we wel en niet kunnen, identiek in elke taal, en een vertaler mag een "nee" niet per ongeluk in een "ja" veranderen. Wil je er een wijzigen, zeg welke rij en welke kolom.
- **nl/de/es/pt.** Die zijn inhoudelijk gelijkwaardig maar niet woordelijk gelijk. Als dit document klaar is draag ik de wijzigingen over.

## Hoeveel tekst staat er nu per pagina

Alleen eigen tekst van de pagina — gedeelde blokken en navigatie niet meegeteld, want die staan overal. Ter ijking: een pagina die als volwaardig leest heeft grofweg 700–1200 woorden.

| pagina | route | woorden | secties |
| --- | --- | ---: | ---: |
| Homepage | `/` | 552 | 12 |
| Platform | `/platform` | 1040 | 10 |
| Diligence sprint | `/diligence-sprint` | 518 ⚠️ | 8 |
| The method | `/method` | 902 | 7 |
| Limits of AI | `/limits-of-ai` | 701 | 6 |
| Governance | `/governance` | 1033 | 11 |
| Partnerships | `/partnerships` | 513 ⚠️ | 7 |
| Team | `/team` | 297 ⚠️ | 6 |
| Contact | `/contact` | 287 ⚠️ | 6 |
| Privacy | `/privacy` | 336 ⚠️ | 4 |

⚠️ = dun. Dat is niet per se fout — /contact hoort kort te zijn — maar /team, /partnerships en /diligence-sprint dragen wel gewicht en hebben minder tekst dan de homepage.

---

## 0. Site-breed (staat op elke pagina)

_Navigatie, footer, en de blokken die meerdere pagina's delen._

### Navigatie  `nav`

**`nav.primary`**
Primary

**`nav.platform`**
Platform

**`nav.sprint`**
Diligence Sprint

**`nav.method`**
The method

**`nav.aiLimits`**
Limits of AI

**`nav.governance`**
Governance

**`nav.team`**
Team

**`nav.partnerships`**
Partnerships

**`nav.contact`**
Contact

**`nav.cta`**
Book a demo

**`nav.openMenu`**
Open menu

**`nav.closeMenu`**
Close menu

### Footer  `footer`

**`footer.blurb`**
AI due diligence for M&A and private equity. Every finding cited to a document. Every output reviewed by a named person.

**`footer.sitemap`**
Sitemap

**`footer.reference`**
Reference

**`footer.company`**
Company

**`footer.privacy`**
Privacy

**`footer.kvk`**
KvK {number}

**`footer.copyright`**
© {year} Factum Capital. Pre-launch.

### Toegankelijkheidslabels  `a11y`

**`a11y.skipToContent`**
Skip to content

**`a11y.changeLanguage`**
Change language

### 404-pagina  `notFound`

**`notFound.title`**
This page isn’t in the record

**`notFound.body`**
The link is broken or the page has moved.

**`notFound.home`**
Back to the home page

**`notFound.platform`**
See how the platform works

---

## 1. Gedeelde blokken  `shared`

**Let op: elk blok hieronder verschijnt op meer dan één pagina.** Eén bewerking werkt overal door.

### `shared.disciplines`  — GEDEELD

_De negen disciplines. Build faalt bij een ander aantal dan 9, en de volgorde is vast — de iconen worden op positie gekoppeld._

**`shared.disciplines.0.label`**
Financial

**`shared.disciplines.0.pain`**
The EBITDA in the information memorandum has already been normalised by the seller.

**`shared.disciplines.0.result`**
Which adjustments hold, which don’t, and what that does to the price.

**`shared.disciplines.1.label`**
Commercial

**`shared.disciplines.1.pain`**
Revenue concentration rarely makes the summary page.

**`shared.disciplines.1.result`**
Which customers carry the revenue, on what terms, and who is free to walk.

**`shared.disciplines.2.label`**
Legal

**`shared.disciplines.2.pain`**
Change-of-control clauses sit in the schedules nobody reads to the end.

**`shared.disciplines.2.result`**
Every clause that triggers on the transaction itself, with clause number and page.

**`shared.disciplines.3.label`**
Tax

**`shared.disciplines.3.pain`**
A tax position that doesn’t hold announces itself years later.

**`shared.disciplines.3.result`**
Where the structure carries risk, and what belongs in the purchase agreement because of it.

**`shared.disciplines.4.label`**
HR

**`shared.disciplines.4.pain`**
Key people leave after closing, and the earn-out was resting on them.

**`shared.disciplines.4.result`**
Who is contractually tied in, who isn’t, and what pension and collective labour agreements really cost.

**`shared.disciplines.5.label`**
Technology (IT & AI)

**`shared.disciplines.5.pain`**
Technical debt is on nobody’s balance sheet, and “AI-driven” is usually a licence on someone else’s model.

**`shared.disciplines.5.result`**
What actually runs, what it costs to fix, and what falls under the AI Act.

**`shared.disciplines.6.label`**
ESG

**`shared.disciplines.6.pain`**
Reporting obligations move to the buyer along with the company.

**`shared.disciplines.6.result`**
What has to be reported from here, and what that takes in investment.

**`shared.disciplines.7.label`**
Operational

**`shared.disciplines.7.pain`**
Margin leaks through processes nobody has put a number on.

**`shared.disciplines.7.result`**
Where the margin goes, and which levers genuinely exist after closing.

**`shared.disciplines.8.label`**
Valuation

**`shared.disciplines.8.pain`**
The bid comes out of a model that hadn’t seen the findings yet.

**`shared.disciplines.8.result`**
What the findings do to the price, calculated through rather than assumed.

### `shared.schema`  — GEDEELD

_Het bevindingsschema, getoond op de homepage en /platform._

**`shared.schema.label`**
Output contract — every finding

**`shared.schema.footnote`**
The schema every finding has to satisfy. A document, a passage and a named reviewer behind each one — still openable months later.

**`shared.schema.rows.module`**
Module

**`shared.schema.rows.finding`**
Finding

**`shared.schema.rows.evidence`**
Verbatim excerpt

**`shared.schema.rows.document`**
Source document and passage

**`shared.schema.rows.review`**
Human review

**`shared.schema.values.module`**
Pre-scoped, one of the library

**`shared.schema.values.finding`**
One claim, in one sentence

**`shared.schema.values.evidence`**
Quoted word for word

**`shared.schema.values.document`**
File name and page

**`shared.schema.values.review`**
Required before release

**`shared.schema.more`**
+2 fields, on a wider screen

### `shared.governancePoints`  — GEDEELD

_Staat op zowel de homepage als /governance._

**`shared.governancePoints.0.title`**
EU-hosted analysis

**`shared.governancePoints.0.body`**
All analysis runs on Google Vertex AI in an EU region, under a Data Processing Agreement.

**`shared.governancePoints.1.title`**
Zero retention at the model provider

**`shared.governancePoints.1.body`**
The model provider does not keep your documents or train on them.

**`shared.governancePoints.2.title`**
Pseudonymized before processing

**`shared.governancePoints.2.body`**
Confidential data is pseudonymized before analysis. Reversed only in the final output.

**`shared.governancePoints.3.title`**
One accountable point of contact

**`shared.governancePoints.3.body`**
A named person reviews every output before it reaches you.

### `shared.modules`  — GEDEELD

_De 22 modulenamen. Build faalt bij een ander aantal dan 22._

**`shared.modules.0`**
Financial DD

**`shared.modules.1`**
Commercial DD

**`shared.modules.2`**
HR DD

**`shared.modules.3`**
Technology DD

**`shared.modules.4`**
ESG DD

**`shared.modules.5`**
Operational DD

**`shared.modules.6`**
IM screener

**`shared.modules.7`**
Vigil monitoring

**`shared.modules.8`**
Tax DD

**`shared.modules.9`**
Legal DD

**`shared.modules.10`**
Deal economics

**`shared.modules.11`**
Valuation

**`shared.modules.12`**
Portfolio management

**`shared.modules.13`**
Post-merger integration

**`shared.modules.14`**
Vendor due diligence

**`shared.modules.15`**
IC memo

**`shared.modules.16`**
Teaser / CIM

**`shared.modules.17`**
Financing memorandum

**`shared.modules.18`**
Document factory

**`shared.modules.19`**
Exit readiness

**`shared.modules.20`**
Portfolio health

**`shared.modules.21`**
IC report

### `shared.waves`  — GEDEELD

_De vijf waves. Build faalt bij een ander aantal dan 5._

**`shared.waves.0.title`**
Independent reads

**`shared.waves.0.body`**
These modules need nothing upstream of them. They all start at once.

**`shared.waves.1.title`**
Dependent reads

**`shared.waves.1.body`**
Tax and legal can only reason with the first wave in hand.

**`shared.waves.2.title`**
Synthesis

**`shared.waves.2.body`**
Valuation, deal economics and portfolio read across everything before them.

**`shared.waves.3.title`**
Deliverables

**`shared.waves.3.body`**
The documents you actually receive, assembled from the waves above.

**`shared.waves.4.title`**
Post-close

**`shared.waves.4.body`**
Monitoring and reporting. Runs on its own clock, after the deal.

### `shared.chart`  — GEDEELD

_Labels in het dispatch-diagram op /platform._

**`shared.chart.zdr`**
ZDR

**`shared.chart.zdrTitle`**
Zero-retention routing enforced. The run refuses to start without it.

**`shared.chart.modulesLabel`**
modules

**`shared.chart.kinds.analysis`**
Finding

**`shared.chart.kinds.deliverable`**
Document

**`shared.chart.kinds.monitoring`**
Ongoing

### `shared.specimen`  — GEDEELD

_Het uitgewerkte voorbeeld van één bevinding, op de homepage._

**`shared.specimen.pageLabel`**
Data room

**`shared.specimen.pageRef`**
TargetCo — Master Services Agreement, p. 14

**`shared.specimen.highlight`**
Cited passage

**`shared.specimen.findingLabel`**
The finding it produced

**`shared.specimen.footnote`**
A constructed example on a fictional target. No client document appears here. Your mandate produces these same five fields, on your own room.

**`shared.specimen.quote`**
Customer may terminate this Agreement on thirty (30) days’ written notice in the event of a change of control of Supplier.

**`shared.specimen.tag`**
Illustrative

**`shared.specimen.values.module`**
Contracts — change of control

**`shared.specimen.values.finding`**
TargetCo’s largest customer can leave over the transaction itself, at thirty days’ notice and with no break fee.

**`shared.specimen.values.evidence`**
Clause 14.2, quoted in full on the left.

**`shared.specimen.values.document`**
TargetCo — Master Services Agreement with Customer A, page 14.

**`shared.specimen.values.review`**
Approved by W. Dijkman before release.

### `shared.ctaProof`  — GEDEELD

_Het zinnetje onder elke CTA-knop._

**`shared.ctaProof`**
Three material findings your team didn’t already have, or the engagement is free — on pilot mandates.

### `shared.guarantee`  — GEDEELD

_De garantie, herhaald naast elke CTA-knop._

**`shared.guarantee.label`**
The Findings Guarantee

**`shared.guarantee.claim`**
Three material findings your own team had not already identified, or the engagement is free.

**`shared.guarantee.note`**
For pilot mandates. We carry the risk of this being early, not you.

### `shared.links`  — GEDEELD

_Terugkerende linkteksten tussen pagina's._

**`shared.links.governance`**
How documents are handled

**`shared.links.platform`**
How the platform works

**`shared.links.sprint`**
What the sprint covers

**`shared.links.method`**
The method, end to end

**`shared.links.limits`**
What AI cannot do

**`shared.links.intake`**
Book a demo

### `shared.reframe`  — GEDEELD

_De openingszin, gedeeld door homepage en /diligence-sprint zodat ze niet uit elkaar lopen._

**`shared.reframe.quote`**
Running the buyer’s pass on your own side first is what a well-run process looks like.

---

## 2. Homepage — `/`

_552 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.home.title`**
AI due diligence for M&A and private equity

**`meta.home.description`**
Nine disciplines over the full data room. Reconciled against each other. Reviewed by a person before you see it.

### `home.hero`

**`home.hero.title`**
Read the entire data room in days

**`home.hero.lead`**
AI-driven due diligence for M&A and private equity. Conventional diligence samples the room and reports in weeks. We read all of it, and every finding cites the document and page behind it.

**`home.hero.cta`**
Book a demo

### `home.problem`

**`home.problem.title`**
Most diligence never reads the whole data room

**`home.problem.lead`**
There is never enough time. So the price gets set on a sample of the documents.

**`home.problem.points.0.title`**
You are working from a sample

**`home.problem.points.0.body`**
Traditional diligence reads a fraction of the room. The rest is still in there.

**`home.problem.points.1.title`**
The risk sits between disciplines

**`home.problem.points.1.body`**
A quality-of-earnings read covers earnings. The expensive surprises sit where two specialists each assumed the other was looking.

### `home.reframe`

**`home.reframe.attr`**
Why a second pass

### `home.guide`

**`home.guide.title`**
A leveraged-finance banker and a data engineer

**`home.guide.lead`**
Wouter structured acquisition and leveraged finance at ING. Daniel builds regulated data pipelines. One of them approves every output before it reaches you.

**`home.guide.link`**
Meet the team

### `home.specimen`

**`home.specimen.title`**
What a finding looks like

**`home.specimen.lead`**
A worked example on a fictional target. The format is the one you receive.

### `home.pipeline`

**`home.pipeline.title`**
Every mandate runs the same five steps

**`home.pipeline.lead`**
Anyone can point an AI tool at a data room. The question is what happens when the model gets something wrong.

**`home.pipeline.refusalTitle`**
The pipeline stops and calls a person

**`home.pipeline.refusals.0`**
Fabricated or hallucinated citations

**`home.pipeline.refusals.1`**
Privacy leaks

**`home.pipeline.refusals.2`**
Scope refusals

**`home.pipeline.refusals.3`**
Drafts below the reviewer threshold

**`home.pipeline.refusalNote`**
Every hard-block condition routes to a person.

### `home.trust`

**`home.trust.title`**
Where your documents go, and who can see them

**`home.trust.lead`**
EU hosting, zero retention at the model provider, pseudonymization before analysis, and one named reviewer. Four mechanisms, no certification.

**`home.trust.link`**
Read the governance page

### `home.coverage`

**`home.coverage.title`**
Nine disciplines, one pass over the same room

**`home.coverage.lead`**
What one discipline finds is on the table for the next one.

**`home.coverage.note`**
Dependency-ordered: later work waits for the findings it depends on.

**`home.coverage.ctaLine`**
Your team cannot get through this in two weeks.

### `home.cycle`

**`home.cycle.title`**
The same evidence base, five times in the deal cycle

**`home.cycle.lead`**
The room gets re-read every time somebody new has to trust it. Read it once, properly.

**`home.cycle.stages.0.title`**
Acquiring

**`home.cycle.stages.0.body`**
Findings land while they can still move price and structure.

**`home.cycle.stages.1.title`**
Financing

**`home.cycle.stages.1.body`**
The lender reads it anyway. Give them a base that is already sourced.

**`home.cycle.stages.2.title`**
Holding

**`home.cycle.stages.2.body`**
Covenant headroom and KPI drift, plus the levers a risk list never looks for.

**`home.cycle.stages.3.title`**
Selling

**`home.cycle.stages.3.body`**
Run the buyer’s pass on your own side first, while there is time to fix it.

**`home.cycle.stages.4.title`**
Restructuring

**`home.cycle.stages.4.body`**
Going concern, creditor position and covenant headroom, while there is still something to choose.

**`home.cycle.link`**
What the Diligence Sprint covers

### `home.success`

**`home.success.title`**
What changes when you sign

**`home.success.lead`**
You arrive at the table with the whole room behind you.

**`home.success.points.0.title`**
The price reflects the whole room

**`home.success.points.0.body`**
Every discipline, reconciled, before the number is set.

**`home.success.points.1.title`**
You already know what they’ll find

**`home.success.points.1.body`**
The buyer’s advisers run this pass anyway. This time you saw it first.

### `home.plan`

**`home.plan.title`**
Three steps to get started

**`home.plan.lead`**
No proposal until we both know it fits.

**`home.plan.steps.0.title`**
Book a thirty-minute demo

**`home.plan.steps.0.body`**
We walk you through the platform on a live run, then work out whether it suits your situation.

**`home.plan.steps.1.title`**
Sign the NDA, then point us at the room

**`home.plan.steps.1.body`**
An NDA before a single document moves. Access runs under a DPA, in the EU, with zero retention.

**`home.plan.steps.2.title`**
Read the findings in days

**`home.plan.steps.2.body`**
Each one cites its source. A named person approved it before it reached you.

### `home.cta`

**`home.cta.title`**
See it running, then decide

**`home.cta.body`**
Thirty minutes: a walkthrough of the platform, then your own situation. If it does not fit, we will say so.

**`home.cta.button`**
Book a demo

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.schema`, `shared.guarantee`, `shared.reframe`, `shared.specimen`, `shared.disciplines`. Zie sectie 1.

---

## 3. Platform — `/platform`

_1040 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.platform.title`**
AI due diligence platform

**`meta.platform.description`**
22 due-diligence modules across nine disciplines. Every finding cites a document. Every output passes a human gate.

### `platform.header`

**`platform.header.title`**
How the platform reads a data room

**`platform.header.lead`**
{modules} pre-scoped modules, in a fixed dependency order, with four grounding checks and a mandatory human gate. The same run, every mandate.

**`platform.header.cta`**
Book a demo

### `platform.pipeline`

**`platform.pipeline.title`**
From upload to a finished finding

**`platform.pipeline.lead`**
Five stages. The same five, every time, whether or not anyone is watching.

**`platform.pipeline.stages.0.title`**
Grounded retrieval

**`platform.pipeline.stages.0.body`**
The module goes into the data room and pulls the passages that answer its question.

**`platform.pipeline.stages.0.note`**
Confidential financial and personal data is pseudonymized before it reaches this layer.

**`platform.pipeline.stages.1.title`**
Drafting against the schema

**`platform.pipeline.stages.1.body`**
A claim without a document and a passage behind it is not a finding.

**`platform.pipeline.stages.2.title`**
Generate-critique-retry

**`platform.pipeline.stages.2.body`**
A reviewer agent critiques the draft and sends it back. Up to two retries per specialist.

**`platform.pipeline.stages.3.title`**
Four-layer grounding check

**`platform.pipeline.stages.3.body`**
Index, quote, entailment, second opinion. Each layer catches what the one before it missed.

**`platform.pipeline.stages.4.title`**
Cross-discipline reconciliation

**`platform.pipeline.stages.4.body`**
Findings are read against each other and resolved into one narrative.

**`platform.pipeline.stages.5.title`**
Human review and approval

**`platform.pipeline.stages.5.body`**
A named person reviews the findings before release.

**`platform.pipeline.stages.5.note`**
Pseudonymization is reversed only here, in the final delivered output.

### `platform.grounding`

**`platform.grounding.title`**
Four checks, each narrower than the last

**`platform.grounding.lead`**
A claim has to survive all four. One failure sends it back.

**`platform.grounding.catchLabel`**
Catches

**`platform.grounding.layers.0.title`**
Citation calibration

**`platform.grounding.layers.0.body`**
Every citation index is checked against the set of passages that were actually retrieved.

**`platform.grounding.layers.0.catches`**
Citations pointing at a document the run never opened.

**`platform.grounding.layers.1.title`**
Lexical quote check

**`platform.grounding.layers.1.body`**
The quoted text has to appear in the cited passage, character for character.

**`platform.grounding.layers.1.catches`**
Paraphrase presented as a verbatim excerpt.

**`platform.grounding.layers.2.title`**
Entailment judge

**`platform.grounding.layers.2.body`**
A separate model reads the claim and the passage and rules on whether one follows from the other.

**`platform.grounding.layers.2.catches`**
Real quotes that do not support the claim built on them.

**`platform.grounding.layers.3.title`**
Second-opinion verify

**`platform.grounding.layers.3.body`**
A local natural-language-inference model re-runs the judgment. This layer fails closed.

**`platform.grounding.layers.3.catches`**
Whatever the first three let through.

**`platform.grounding.repair`**
Claims that fail get one repair attempt: re-quote from source, then re-judge. Claims that still fail are cut or marked unconfirmed.

### `platform.blocks`

**`platform.blocks.title`**
{blocks} conditions that stop auto-approval

**`platform.blocks.lead`**
Retries are capped at two per specialist. These conditions end the loop regardless and route the draft to a person.

**`platform.blocks.items.0.title`**
Privacy leak

**`platform.blocks.items.0.body`**
Data crossed a boundary it should not have.

**`platform.blocks.items.1.title`**
Fabricated source

**`platform.blocks.items.1.body`**
A citation that does not resolve to a real passage.

**`platform.blocks.items.2.title`**
Scope refusal

**`platform.blocks.items.2.body`**
The module cannot answer inside its brief, and says so.

**`platform.blocks.items.3.title`**
Insufficient depth

**`platform.blocks.items.3.body`**
An answer that does not meet the standard the schema demands.

**`platform.blocks.items.4.title`**
Placeholder text

**`platform.blocks.items.4.body`**
Filler left where evidence belongs.

**`platform.blocks.items.5.title`**
Near-empty draft

**`platform.blocks.items.5.body`**
Too little substance to review.

**`platform.blocks.items.6.title`**
Low reviewer score

**`platform.blocks.items.6.body`**
The critic agent scored the draft below threshold.

### `platform.coverage`

**`platform.coverage.title`**
The module library, in dispatch order

**`platform.coverage.lead`**
A module that waits on another module’s output cannot start any earlier. That dependency sets the running order, not our preference. The label under each module says what it hands back: a finding, a document, or an ongoing signal.

**`platform.coverage.note`**
Derived from the dispatch graphs in the product source, not estimated. ZDR marks the modules whose provider routing is hard-gated to a zero-retention EU endpoint.

### `platform.scale`

**`platform.scale.title`**
The platform in numbers

**`platform.scale.lead`**
Counted from the product source, not estimated.

**`platform.scale.tiles.modules.title`**
Modules per engagement

**`platform.scale.tiles.modules.body`**
Each one pre-scoped to a discipline or a deliverable. They all run, every mandate.

**`platform.scale.tiles.analysis.title`**
Return findings

**`platform.scale.tiles.analysis.body`**
They read the data room out and return claims with the source passage underneath.

**`platform.scale.tiles.deliverables.title`**
Assemble documents

**`platform.scale.tiles.deliverables.body`**
IC memo, vendor due diligence, teaser, financing memorandum. Built on the findings above.

**`platform.scale.tiles.monitoring.title`**
Keep running after close

**`platform.scale.tiles.monitoring.body`**
Covenant headroom and early warning signals, on their own clock.

**`platform.scale.tiles.waves.title`**
Dispatch waves

**`platform.scale.tiles.waves.body`**
Ordered by dependency. Wave 1 opens with eight modules at once.

**`platform.scale.tiles.zdr.title`**
Zero-retention gated

**`platform.scale.tiles.zdr.body`**
Tax, legal and financial refuse to run off a retaining model.

**`platform.scale.tiles.blocks.title`**
Hard-block conditions

**`platform.scale.tiles.blocks.body`**
Conditions that stop a draft from being auto-approved, however many retries it has had.

### `platform.alternatives`

**`platform.alternatives.title`**
Three other ways to do this

**`platform.alternatives.lead`**
Compared as categories of tool, not as named products. Marks answer one question each: does this category of tool do this thing at all.

**`platform.alternatives.columns.0`**
Virtual data room

**`platform.alternatives.columns.1`**
AI diligence tools

**`platform.alternatives.columns.2`**
General-purpose AI

**`platform.alternatives.columns.3`**
Factum

**`platform.alternatives.legend.yes`**
Yes

**`platform.alternatives.legend.partial`**
Partly

**`platform.alternatives.legend.no`**
No

**`platform.alternatives.legend.na`**
Not applicable

**`platform.alternatives.rows.0.label`**
Pre-scoped module per discipline

**`platform.alternatives.rows.1.label`**
Runs without being prompted

**`platform.alternatives.rows.2.label`**
Citation required by the schema

**`platform.alternatives.rows.3.label`**
Cross-discipline reconciliation

**`platform.alternatives.rows.4.label`**
Produces the deliverable, not an answer

**`platform.alternatives.rows.5.label`**
Zero retention at the model provider

**`platform.alternatives.rows.6.label`**
Named person signs off

**`platform.alternatives.rows.7.label`**
Published accuracy audit

**`platform.alternatives.rows.7.note`**
Nobody in this table has one, including us.

**`platform.alternatives.note`**
Categories, not vendors. Named products change quarterly and most public claims about them are vendor-published.

### `platform.limits`

**`platform.limits.title`**
What we don’t claim about the platform

**`platform.limits.lead`**
Everything above describes a mechanism. None of it is a certified metric.

**`platform.limits.items.0`**
No audited accuracy rate. Internal benchmarks are single-dataset and unaudited.

**`platform.limits.items.1`**
No claim that the human gate is optional. It is mandatory.

**`platform.limits.items.2`**
No completed public case studies yet.

**`platform.limits.items.3`**
No uniform track record. The financial module has run end to end on a live deal and been verified against source documents. The reconciliation layer is younger.

**`platform.limits.items.4`**
No product-level technical due diligence. Source-code review, architecture assessment and scalability testing sit outside the standard pass.

**`platform.limits.items.5`**
No integrity or reputational screening. Background checks on people and counterparties run outside this platform.

**`platform.limits.items.6`**
No general availability. Factum is pre-launch.

### `platform.faq`

**`platform.faq.title`**
Questions we get

**`platform.faq.items.0.q`**
Isn’t this just an AI chatbot with extra steps?

**`platform.faq.items.0.a`**
A chat session is one context window that you steer. This is {modules} pre-scoped modules in a fixed dependency order, with four grounding checks and a mandatory human gate. The difference is what happens when nobody is watching.

**`platform.faq.items.1.q`**
Why waves instead of running everything at once?

**`platform.faq.items.1.a`**
Tax cannot reason without the financial and legal reads. Valuation cannot price without tax. The dependency graph sets the order; wave 1 still runs eight modules in parallel.

**`platform.faq.items.2.q`**
What happens when the model doesn’t know?

**`platform.faq.items.2.a`**
It has to say so. A finding is either backed by a citation that survived four checks or flagged as unconfirmed. Fabricated sources are one of the {blocks} hard blocks.

**`platform.faq.items.3.q`**
How do I know the platform can carry findings this material?

**`platform.faq.items.3.a`**
The financial module is the most numerically exposed part of any read. It has run end to end on a live deal and been independently verified against source documents. Newer layers have less history, and we tell you which is which.

**`platform.faq.items.4.q`**
How fast is it?

**`platform.faq.items.4.a`**
The pipeline pass runs in hours. The finished, reviewed output takes days. We don’t quote a delivery date before seeing the data room.

### `platform.cta`

**`platform.cta.title`**
See it run on a real dispatch graph

**`platform.cta.body`**
We open the dispatch graph, run a module, and follow one finding back to its source passage.

**`platform.cta.button`**
Book a demo

**`platform.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.ctaProof`, `shared.schema`, `shared.modules`, `shared.waves`, `shared.chart`, `shared.guarantee`. Zie sectie 1.

---

## 4. Diligence sprint — `/diligence-sprint`

_518 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.sprint.title`**
Full data-room review in days

**`meta.sprint.description`**
Nine specialist passes over one data room, reconciled into a single narrative, with a live data-gap tracker.

### `sprint.header`

**`sprint.header.title`**
See what a buyer would find, before they do

**`sprint.header.lead`**
All {disciplines} disciplines, reconciled into one narrative. Run it on a target, a company you hold, or your own business.

**`sprint.header.cta`**
Book a demo

### `sprint.reframe`

**`sprint.reframe.attr`**
Why a second pass

### `sprint.disciplines`

**`sprint.disciplines.title`**
All {disciplines} disciplines, one fixed scope

**`sprint.disciplines.lead`**
Each one is a scoped pass with its own question and its own output.

**`sprint.disciplines.note`**
One engagement, one price. No à la carte menu and no upsell after signing. What each discipline looks at is set against your data room in the demo.

### `sprint.layers`

**`sprint.layers.title`**
What makes it one deliverable

**`sprint.layers.lead`**
What turns {disciplines} separate reads into one deliverable, instead of {disciplines} separate reports.

**`sprint.layers.items.0.title`**
Value-creation read

**`sprint.layers.items.0.body`**
Margin leakage, indexation gaps, cross-sell levers. The report carries the upside case too.

**`sprint.layers.items.1.title`**
Cross-discipline reconciliation

**`sprint.layers.items.1.body`**
Every discipline’s findings resolved into one coherent narrative, with a named person behind the result.

**`sprint.layers.items.2.title`**
Live data-gap tracker

**`sprint.layers.items.2.body`**
The running question list, updated as gaps close.

### `sprint.delivery`

**`sprint.delivery.title`**
How it arrives

**`sprint.delivery.lead`**
Three formats, running side by side from day one.

**`sprint.delivery.formats.0.label`**
Review dashboard

**`sprint.delivery.formats.0.items`**
Financial, tax, technology and going-concern

**`sprint.delivery.formats.0.body`**
A live, click-through dashboard. Follow any finding back to its source passage.

**`sprint.delivery.formats.1.label`**
Written report

**`sprint.delivery.formats.1.items`**
The remaining disciplines

**`sprint.delivery.formats.1.body`**
A structured written report, reconciled into the same narrative.

**`sprint.delivery.formats.2.label`**
Alongside both

**`sprint.delivery.formats.2.items`**
The data-gap tracker

**`sprint.delivery.formats.2.body`**
A structured gap list, delivered while there is still time to close the gaps.

### `sprint.inputs`

**`sprint.inputs.title`**
What we need to start

**`sprint.inputs.lead`**
Two things. No workshop, no kick-off week.

**`sprint.inputs.items.0.title`**
Data-room access

**`sprint.inputs.items.0.body`**
Financials, legal, tax, HR, contracts and IP, as agreed in the demo.

**`sprint.inputs.items.1.title`**
Answers to the data-gap tracker

**`sprint.inputs.items.1.body`**
Your answers close the gaps. One round to fold them in and re-run affected analysis is included.

### `sprint.faq`

**`sprint.faq.title`**
Questions we get

**`sprint.faq.items.0.q`**
Does this replace a quality-of-earnings report?

**`sprint.faq.items.0.a`**
It is broader, and it is not an attest service. A quality-of-earnings read covers one dimension in four to ten weeks. This runs {disciplines} disciplines and reconciles them. A signed accountant’s opinion stays a separate engagement.

**`sprint.faq.items.1.q`**
How long does it take?

**`sprint.faq.items.1.a`**
Days, not weeks. The pipeline pass runs in hours; human review and reconciliation come after it. We don’t commit to a date before seeing the data room.

**`sprint.faq.items.2.q`**
What does it cost?

**`sprint.faq.items.2.a`**
One price for the whole scope, set in the demo against the size and state of your data room. No tiered menu.

**`sprint.faq.items.3.q`**
What happens to our documents?

**`sprint.faq.items.3.a`**
Confidential data is pseudonymized before analysis and reversed only in the final output. Analysis runs on Google Vertex AI in an EU region under a Data Processing Agreement. The model provider does not keep your documents or train on them.

**`sprint.faq.items.4.q`**
Can I see an example report?

**`sprint.faq.items.4.a`**
Not a real one. Client documents are confidential and no client has elected to be named. In the demo we show you the live dashboard, the output schema, and how a finding traces back to its source.

**`sprint.faq.items.5.q`**
Who actually reviews the output?

**`sprint.faq.items.5.a`**
A named person, before anything reaches your desk. While Factum is pre-launch, that person is the founder, on every mandate.

### `sprint.cta`

**`sprint.cta.title`**
See whether a sprint fits your situation

**`sprint.cta.body`**
Fifteen minutes of the platform, fifteen on your data room: what is in it, what is missing, and whether a sprint is the right instrument.

**`sprint.cta.button`**
Book a demo

**`sprint.cta.note`**
A limited number of pilot mandates, counted in single digits.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.ctaProof`, `shared.reframe`, `shared.disciplines`, `shared.guarantee`. Zie sectie 1.

---

## 5. The method — `/method`

_902 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.method.title`**
How AI due diligence actually works

**`meta.method.description`**
The order the modules run in, the contract every finding has to satisfy, and what a named reviewer checks before anything is delivered.

### `method.header`

**`method.header.title`**
The method, end to end

**`method.header.lead`**
The long version. What runs in which order, the contract every finding has to satisfy, and what a person checks before anything reaches you.

**`method.header.cta`**
Book a demo

### `method.waves`

**`method.waves.title`**
{modules} modules, {waves} waves, one order

**`method.waves.lead`**
Nothing runs early. A module starts when the work it depends on is finished, which is why the run has a shape rather than a queue.

**`method.waves.steps.0.title`**
Wave one — the independent reads

**`method.waves.steps.0.body`**
{w1} modules open at the same moment. Financial, commercial, HR, technology, ESG and operational go into the data room in parallel, alongside the information-memorandum screener and the monitoring set-up. None of them needs another module’s answer to start.

**`method.waves.steps.1.title`**
Wave two — the reads that have to wait

**`method.waves.steps.1.body`**
Tax and legal. Both reason about consequences: a tax position is a consequence of the structure the financial read has just described, and a legal exposure is usually a consequence of a commercial term. Running them first produces confident answers to the wrong question.

**`method.waves.steps.2.title`**
Wave three — synthesis

**`method.waves.steps.2.body`**
{w3} modules read across everything above them. Valuation recalculates the price through the findings rather than around them. Deal economics, portfolio and post-merger integration take the same body of findings and ask a different question of it.

**`method.waves.steps.3.title`**
Wave four — the documents

**`method.waves.steps.3.body`**
{w4} deliverables, assembled from the waves above: vendor due diligence, the investment-committee memo, the teaser or CIM, the financing memorandum, and the document factory for whatever else the process needs.

**`method.waves.steps.4.title`**
Wave five — after the deal

**`method.waves.steps.4.body`**
{w5} modules on their own clock. Exit readiness, portfolio health and the periodic investment-committee report. They are not part of the sprint and do not wait for it.

**`method.waves.note`**
Waves one and two are the diligence pass. Everything after them is what you do with it.

### `method.contract`

**`method.contract.title`**
The output contract, field by field

**`method.contract.lead`**
Five fields. A finding that cannot fill all five is not delivered as a finding.

**`method.contract.failLabel`**
When it can’t be filled

**`method.contract.items.0.title`**
Module

**`method.contract.items.0.body`**
Which of the {modules} produced it. Pre-scoped, so the question was written before the data room was opened rather than improvised from what happened to be in it.

**`method.contract.items.0.fail`**
There is no free-text lane. No module, no finding.

**`method.contract.items.1.title`**
Finding

**`method.contract.items.1.body`**
One claim, in one sentence. Compound claims are split, because a sentence with two claims in it can only ever be half-checked.

**`method.contract.items.1.fail`**
Too vague to check is treated the same as wrong.

**`method.contract.items.2.title`**
Verbatim excerpt

**`method.contract.items.2.body`**
The supporting passage, quoted word for word. Not summarised, not tidied, not shortened to fit.

**`method.contract.items.2.fail`**
A paraphrase presented as a quote fails the lexical check and goes back.

**`method.contract.items.3.title`**
Source document and passage

**`method.contract.items.3.body`**
File name and page, so you can open it yourself. This is the field that makes a finding arguable instead of authoritative.

**`method.contract.items.3.fail`**
A citation that does not resolve to a real passage is a hard block, not a warning.

**`method.contract.items.4.title`**
Human review

**`method.contract.items.4.body`**
The person who approved it, by name, before release. Every finding, every mandate.

**`method.contract.items.4.fail`**
There is no fast lane for a busy week.

**`method.contract.note`**
A claim that fails a check gets one repair attempt: re-quote from source, then re-judge. What still fails is either cut or delivered marked unconfirmed. Unconfirmed is a legitimate output. A quietly dropped claim is not.

### `method.trail`

**`method.trail.title`**
What gets recorded, and in what order

**`method.trail.lead`**
A finding is a chain. Every link is written down, which is the only reason a question three months from now has an answer.

**`method.trail.steps.0`**
The document enters the room and is indexed. Confidential financial and personal values are pseudonymised before any model sees them.

**`method.trail.steps.1`**
The module retrieves the passages that answer its own question, and only those.

**`method.trail.steps.2`**
The draft is written against the contract above. A claim with no passage behind it does not get written.

**`method.trail.steps.3`**
A reviewing pass critiques the draft and sends it back. Two retries, then the loop stops and a person takes it.

**`method.trail.steps.4`**
Four grounding checks run in sequence: the citation index, the quote itself, whether the claim follows from the passage, and a second opinion that fails closed.

**`method.trail.steps.5`**
A named person reviews, reconciles and approves. Pseudonymised values are reversed here and nowhere earlier.

**`method.trail.steps.6`**
You receive the finding with its document reference attached, and it stays openable afterwards.

**`method.trail.note`**
The worked example — a clause on page 14 of a fictional master services agreement, and the finding it produced — is on the homepage.

**`method.trail.link`**
See the worked example

### `method.gate`

**`method.gate.title`**
What the reviewer actually does

**`method.gate.lead`**
“Human in the loop” is a phrase. This is the sequence behind it.

**`method.gate.items.0`**
Opens the cited document and reads the passage against the claim built on it.

**`method.gate.items.1`**
Decides materiality — which findings change what you pay, or whether you sign at all.

**`method.gate.items.2`**
Resolves conflicts between modules. Two disciplines reading one fact differently is itself a finding, not an error to smooth over.

**`method.gate.items.3`**
Marks what could not be confirmed, and says why.

**`method.gate.items.4`**
Reverses the pseudonymisation in the final output, and only there.

**`method.gate.items.5`**
Signs. One named person, accountable for the document you receive.

**`method.gate.note`**
{blocks} failure classes end the automated loop early and route the draft to that person regardless of how it scored.

**`method.gate.link`**
How documents are handled

### `method.stops`

**`method.stops.title`**
Where the method stops

**`method.stops.lead`**
Everything above is work a machine can be held to. A good part of diligence is not, and pretending otherwise is how these systems lose the room.

**`method.stops.link`**
What AI cannot do in due diligence

### `method.cta`

**`method.cta.title`**
Watch the method run on a real room

**`method.cta.body`**
We open the pipeline, run a module, and follow one finding back to its source passage.

**`method.cta.button`**
Book a demo

**`method.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.guarantee`. Zie sectie 1.

---

## 6. Limits of AI — `/limits-of-ai`

_701 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.aiLimits.title`**
What AI cannot do in due diligence

**`meta.aiLimits.description`**
Five things no model does on a data room, why the human gate is mandatory, and three questions to ask any AI diligence vendor.

### `aiLimits.header`

**`aiLimits.header.title`**
What AI cannot do in due diligence

**`aiLimits.header.lead`**
We sell an AI pipeline. This page is about the part of the job it does not do, and who does that instead.

**`aiLimits.header.cta`**
Book a demo

### `aiLimits.limits`

**`aiLimits.limits.title`**
Five things no model does on a data room

**`aiLimits.limits.lead`**
These are not tuning problems. They are categories of work that sit outside what a language model is.

**`aiLimits.limits.humanLabel`**
Who does it

**`aiLimits.limits.items.0.title`**
Decide what matters

**`aiLimits.limits.items.0.body`**
A model can find every change-of-control clause in the room. It cannot tell you which one kills the deal. Materiality is a judgement about your structure, your price and your appetite, and none of those is in the data room.

**`aiLimits.limits.items.0.human`**
The reviewer ranks findings against the deal you are actually doing.

**`aiLimits.limits.items.1.title`**
Cite the document that isn’t there

**`aiLimits.limits.items.1.body`**
Retrieval reads what was uploaded. The most expensive thing in diligence is often an absence — the contract nobody filed, the year missing from the payroll export. An absence has no passage to quote, so no grounded system can raise it as a finding.

**`aiLimits.limits.items.1.human`**
The data-gap tracker is a person’s running list of what was asked for and never arrived. It is delivered alongside the findings.

**`aiLimits.limits.items.2.title`**
Read what nobody wrote down

**`aiLimits.limits.items.2.body`**
Management sessions, the site visit, a customer reference call, an integrity check on a shareholder. These produce the findings that move bids most often, and none of them starts as a document.

**`aiLimits.limits.items.2.human`**
Your own team, or your advisers. This platform does not do it and does not imply otherwise.

**`aiLimits.limits.items.3.title`**
Tell soft from hidden

**`aiLimits.limits.items.3.body`**
A number can be weak because the business is weak, or because the seller shaped the process. On the page the two look identical. Telling them apart takes knowledge of how sellers behave, not of what the file says.

**`aiLimits.limits.items.3.human`**
Someone who has run the other side of the table. On our side that is a leveraged-finance banker.

**`aiLimits.limits.items.4.title`**
Be accountable

**`aiLimits.limits.items.4.body`**
A model cannot be a Representative under your NDA, cannot answer to your investment committee, and cannot sign. Accountability is not a capability you add to a system. It attaches to a person or it does not exist.

**`aiLimits.limits.items.4.human`**
One named person approves every output and stands behind it.

**`aiLimits.limits.note`**
If a vendor claims their system does any of the five, ask which page it cited.

### `aiLimits.gate`

**`aiLimits.gate.title`**
Which is why the gate is mandatory

**`aiLimits.gate.lead`**
The human step is not a safety blanket bolted onto a finished product. It is where four of the five above actually get done.

**`aiLimits.gate.items.0`**
A name and a date on every output, not a confidence score.

**`aiLimits.gate.items.1`**
Materiality decided against your deal, not against a benchmark.

**`aiLimits.gate.items.2`**
Unconfirmed claims marked unconfirmed rather than quietly dropped.

**`aiLimits.gate.items.3`**
One person to argue with when you disagree.

**`aiLimits.gate.link`**
How documents are handled

### `aiLimits.machine`

**`aiLimits.machine.title`**
And what the machine is genuinely better at

**`aiLimits.machine.lead`**
The honest version of this argument runs both ways.

**`aiLimits.machine.items.0.title`**
It reads all of it

**`aiLimits.machine.items.0.body`**
A team under deadline reads a sample and calls it coverage. Page 900 gets the same attention as page 9.

**`aiLimits.machine.items.1.title`**
It does not get tired

**`aiLimits.machine.items.1.body`**
The same schema, the same checks and the same standard of evidence at the end of the run as at the start. Consistency is what people are worst at and machines are free at.

**`aiLimits.machine.items.2.title`**
It runs in parallel

**`aiLimits.machine.items.2.body`**
{first} modules opening at once instead of queueing behind each other is where the days come from — not from any single answer arriving faster.

### `aiLimits.ask`

**`aiLimits.ask.title`**
Three questions for any AI diligence vendor

**`aiLimits.ask.lead`**
Including us. The answers tell you more than the demo does.

**`aiLimits.ask.items.0.title`**
Who signs?

**`aiLimits.ask.items.0.body`**
If the answer is a dashboard, nobody does. Ask for a name, and ask what happens when that name is wrong.

**`aiLimits.ask.items.1.title`**
What happens to a claim that can’t be cited?

**`aiLimits.ask.items.1.body`**
There are three honest answers: it is cut, it is flagged, or it is shown with its evidence gap visible. A system with no answer is showing you unmarked guesses.

**`aiLimits.ask.items.2.title`**
What does it do when a document is missing?

**`aiLimits.ask.items.2.body`**
Silence is the wrong answer. A missing document should produce an item on a list, not the absence of a finding.

**`aiLimits.ask.link`**
The method, end to end

### `aiLimits.cta`

**`aiLimits.cta.title`**
Ask us the three questions

**`aiLimits.cta.body`**
Thirty minutes with the person whose name goes on the output. Bring the awkward ones.

**`aiLimits.cta.button`**
Book a demo

**`aiLimits.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.guarantee`. Zie sectie 1.

---

## 7. Governance — `/governance`

_1033 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.governance.title`**
AI governance and data handling

**`meta.governance.description`**
How documents are processed, what the human gate does, and what Factum does not claim.

### `governance.header`

**`governance.header.title`**
How your documents are handled, and what we don’t claim

**`governance.header.lead`**
Data handling is built into how the pipeline runs. It is also narrower than most security pages imply, so this page states the boundary.

**`governance.header.cta`**
Book a demo

### `governance.data`

**`governance.data.title`**
Four things that are true of every engagement

**`governance.data.lead`**
Four mechanisms. None of them is a certification.

### `governance.gate`

**`governance.gate.title`**
The one mandatory human step

**`governance.gate.lead`**
A named person approves every output. These are the conditions that force it.

**`governance.gate.items.0`**
Findings are checked back against the source documents before delivery.

**`governance.gate.items.1`**
The gate runs every time, automatically.

**`governance.gate.items.2`**
{blocks} failure classes route to a person instead of auto-approving.

**`governance.gate.items.3`**
A named person reviews, reconciles and stands behind the output.

**`governance.gate.items.4`**
Pseudonymized values are reversed only here, in the final output.

### `governance.zdr`

**`governance.zdr.title`**
Three modules refuse to run off a retaining model

**`governance.zdr.lead`**
Zero data retention is a routing rule in the code, not a promise on a page. Tax, legal and financial are gated on it.

**`governance.zdr.items.0`**
The gate is a hard requirement, checked before dispatch.

**`governance.zdr.items.1`**
There is no silent downgrade to a retaining provider.

**`governance.zdr.items.2`**
Analysis runs on Google Vertex AI in an EU region, under a Data Processing Agreement.

**`governance.zdr.items.3`**
The other {other} modules run on the same infrastructure. Only these three refuse to start without the gate.

### `governance.learning`

**`governance.learning.title`**
Two memories. One is shared, one never leaves your tenant.

**`governance.learning.lead`**
What we learn across clients, and what stays with you.

**`governance.learning.columns.0.label`**
Shared across clients

**`governance.learning.columns.0.body`**
Methodology lessons — how a check should be run, where a class of analysis tends to go wrong. Scrubbed of personal data before storage. The top lessons are re-injected into later runs.

**`governance.learning.columns.0.items.0`**
Method, not content

**`governance.learning.columns.0.items.1`**
Personal data scrubbed before storage

**`governance.learning.columns.0.items.2`**
No client names, documents or figures

**`governance.learning.columns.1.label`**
Never leaves your tenant

**`governance.learning.columns.1.body`**
Rules derived from your own engagements. Strictly scoped to your account; the service refuses to run without a client identifier.

**`governance.learning.columns.1.items.0`**
Your documents and findings

**`governance.learning.columns.1.items.1`**
Your derived rules and preferences

**`governance.learning.columns.1.items.2`**
Scoped by client ID, enforced in code

**`governance.learning.note`**
If cross-client methodology learning is a problem for your mandate, say so in the demo. It can be switched off for your account.

### `governance.grounding`

**`governance.grounding.title`**
One benchmark, published with its caveats attached

**`governance.grounding.lead`**
We would rather show a number with its limits than no number at all.

**`governance.grounding.dialLabel`**
Claims either grounded in a cited passage or explicitly flagged as unconfirmed

**`governance.grounding.dialCaveat`**
One internal dataset, measured {date}. Not audited. Not a guarantee for your deal, and not comparable to anyone else’s figure.

**`governance.grounding.items.0`**
Single dataset, single run. No third party has checked it.

**`governance.grounding.items.1`**
The remainder is not “{remainder}% wrong”. It is the share the checks could not conclusively ground or flag.

**`governance.grounding.items.2`**
A different data room will produce a different number.

**`governance.grounding.items.3`**
This is why the human gate is mandatory, not optional.

### `governance.legal`

**`governance.legal.title`**
Why this is not a chat window

**`governance.legal.lead`**
One from the courts. One from your own NDA. One from the statute book.

**`governance.legal.items.0.title`**
A public AI tool is not a private one

**`governance.legal.items.0.body`**
In United States v. Heppner a federal court held that a defendant’s exchanges with a public AI assistant were neither privileged nor work product, and handed them to prosecutors. Where the work runs decides who can read it later.

**`governance.legal.items.1.title`**
Your NDA may not cover the tool

**`governance.legal.items.1.body`**
Most M&A NDAs permit disclosure only to named Representatives: staff, advisers, financing sources. An AI platform is rarely one of them. Putting the data room into a consumer tool can be the breach itself.

**`governance.legal.items.2.title`**
The EU AI Act runs on a clock

**`governance.legal.items.2.body`**
General-purpose AI obligations have applied since 2 August 2025. The Article 50 transparency duties follow on 2 August 2026. A documented human gate is easier to place inside that regime than a chat session nobody logged.

**`governance.legal.note`**
None of this is legal advice. All three are reasons the pipeline is shaped the way it is.

### `governance.terms`

**`governance.terms.title`**
The terms

**`governance.terms.lead`**
What is in the engagement agreement, before you have to ask for it.

**`governance.terms.items.0.title`**
An NDA first

**`governance.terms.items.0.body`**
Signed before a single document moves. Not after scoping, not alongside the engagement letter. First.

**`governance.terms.items.1.title`**
Who you contract with

**`governance.terms.items.1.body`**
Factum Capital is not yet a separate legal entity. Engagements are contracted by Agentic Mindshift Consultancy, Netherlands, KvK {kvk}. Incorporation is with the notary.

**`governance.terms.items.2.title`**
Liability, capped

**`governance.terms.items.2.body`**
Our liability is capped at the price of the engagement. Consequential loss, lost profit and missed IRR are excluded.

**`governance.terms.items.3.title`**
Professional indemnity

**`governance.terms.items.3.body`**
Cover runs through Agentic Mindshift Consultancy, the contracting entity. Factum’s own policy follows its incorporation.

**`governance.terms.items.4.title`**
What we keep, and why

**`governance.terms.items.4.body`**
Your documents and findings stay in your own tenant, so a later mandate can read across an earlier one. Deleted on request, at any point. The term is set in the engagement agreement.

**`governance.terms.items.5.title`**
Sub-processors

**`governance.terms.items.5.body`**
Analysis runs on Google Vertex AI in an EU region, under a DPA. Scheduling runs on Cal.com. The full list per module is on the table before you upload anything.

**`governance.terms.note`**
Ask for it in writing. Under DORA, a fund above the threshold has to name every ICT third party in a register filed with its supervisor — including us.

### `governance.transparency`

**`governance.transparency.title`**
What the machine does, and what the person does

**`governance.transparency.lead`**
You should be able to tell, for any finding, what produced it and what checked it.

**`governance.transparency.steps.0`**
Each module retrieves evidence from your uploaded documents on its own.

**`governance.transparency.steps.1`**
A second reviewer agent critiques each draft.

**`governance.transparency.steps.2`**
A separate pass fact-checks claims against the source text.

**`governance.transparency.steps.3`**
A person reviews the result.

**`governance.transparency.steps.4`**
Claims that can’t be tied to a passage are flagged as unconfirmed.

**`governance.transparency.machineLabel`**
Machine

**`governance.transparency.humanLabel`**
Person

### `governance.limits`

**`governance.limits.title`**
What we don’t claim

**`governance.limits.lead`**
Most of what a buyer wants on a page like this, we don’t have yet. Listing it beats implying it.

**`governance.limits.items.0`**
No ISO 27001, SOC 2 or any other certification. No third-party audit of the pipeline.

**`governance.limits.items.1`**
No penetration test, single sign-on or audit-log commitment.

**`governance.limits.items.2`**
No published EU region. Analysis runs on Google Vertex AI in an EU region; we don’t name which one.

**`governance.limits.items.3`**
No asserted GDPR-compliance status. Processing terms belong in an engagement agreement.

**`governance.limits.items.4`**
No breach-notification or disaster-recovery commitment stated here.

**`governance.limits.items.5`**
No audited accuracy rate. The one benchmark on this page is internal and single-dataset.

**`governance.limits.note`**
If your process needs any of these in writing, raise it in the demo. There is a real answer either way.

### `governance.cta`

**`governance.cta.title`**
Bring the awkward questions to the demo

**`governance.cta.body`**
The list above is deliberately unflattering. If something on it blocks you, better to find that out in thirty minutes.

**`governance.cta.button`**
Book a demo

**`governance.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.ctaProof`, `shared.governancePoints`, `shared.chart`, `shared.guarantee`. Zie sectie 1.

---

## 8. Partnerships — `/partnerships`

_513 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.partnerships.title`**
Diligence capacity for advisers

**`meta.partnerships.description`**
Diligence-grade analytical capacity behind your own client relationships.

### `partnerships.header`

**`partnerships.header.title`**
More mandates than your team can read

**`partnerships.header.lead`**
You keep the relationship and the judgment. We run the read across every discipline behind it, under your name.

**`partnerships.header.cta`**
Book a demo

### `partnerships.who`

**`partnerships.who.title`**
Who this tends to work for

**`partnerships.who.lead`**
Described by the shape of the firm, never by name.

**`partnerships.who.profiles.0.title`**
Corporate finance boutiques

**`partnerships.who.profiles.0.body`**
Buy- and sell-side processes where the analytical load is the constraint.

**`partnerships.who.profiles.1.title`**
Exit and value-creation advisors

**`partnerships.who.profiles.1.body`**
Owners two to five years out, who need a defensible baseline first.

**`partnerships.who.profiles.2.title`**
Restructuring and turnaround practices

**`partnerships.who.profiles.2.body`**
Where an independent review has to be fast and hold up to lenders.

**`partnerships.who.profiles.3.title`**
PE and buy-side advisors

**`partnerships.who.profiles.3.body`**
Competitive processes on a tight clock, where the read still has to survive an investment committee.

### `partnerships.split`

**`partnerships.split.title`**
You keep the relationship. We supply the pass.

**`partnerships.split.lead`**
The same platform, every discipline, the same review gate. Delivered under your name.

**`partnerships.split.columns.0.label`**
You keep

**`partnerships.split.columns.0.items.0`**
The client relationship and the mandate

**`partnerships.split.columns.0.items.1`**
The advisory judgment and the recommendation

**`partnerships.split.columns.0.items.2`**
The commercial terms with your client

**`partnerships.split.columns.0.items.3`**
Control of what is delivered under your name

**`partnerships.split.columns.1.label`**
We supply

**`partnerships.split.columns.1.items.0`**
The full pass over the data room, every discipline

**`partnerships.split.columns.1.items.1`**
Cross-discipline reconciliation as a fixed step

**`partnerships.split.columns.1.items.2`**
Findings tied to a document and a passage, every time

**`partnerships.split.columns.1.items.3`**
A named reviewer standing behind the output

**`partnerships.split.seam`**
Boundary

### `partnerships.start`

**`partnerships.start.title`**
How a partnership actually starts

**`partnerships.start.lead`**
With one real engagement, run properly, before anyone commits to anything.

**`partnerships.start.steps.0.title`**
A demo, and a look at your pipeline

**`partnerships.start.steps.0.body`**
We show you the platform, then map what your engagements look like and where the analytical load sits. Thirty minutes.

**`partnerships.start.steps.1.title`**
One mandate, run end to end

**`partnerships.start.steps.1.body`**
One live engagement, same review gate. You see the output before signing anything.

**`partnerships.start.steps.2.title`**
Terms shaped around what happened

**`partnerships.start.steps.2.body`**
Scope, pricing and rhythm set against a real deliverable. A first draft of a partnership.

### `partnerships.boundaries`

**`partnerships.boundaries.title`**
What a partnership does not include

**`partnerships.boundaries.lead`**
Some are commitments to existing partners. The rest is the honest state of a pre-launch company.

**`partnerships.boundaries.items.0`**
No white-labelled claim of certification or audit. We can’t stand behind a badge we don’t hold.

**`partnerships.boundaries.items.1`**
No unlimited capacity. A partnership that outruns the review gate is worse than no partnership.

**`partnerships.boundaries.items.2`**
No blanket referral-fee policy. Where attest or independence rules apply, it is checked per relationship.

**`partnerships.boundaries.items.3`**
No claim on your client. Nothing we run for you becomes a case study without your written agreement.

**`partnerships.boundaries.items.4`**
No conflicting mandate where we have already committed exclusively. Where an exclusivity exists, we say so.

### `partnerships.faq`

**`partnerships.faq.title`**
What partners ask first

**`partnerships.faq.items.0.q`**
Do you work directly with owners as well?

**`partnerships.faq.items.0.a`**
Yes. Where that could overlap with your market, we’ll tell you before it becomes a problem.

**`partnerships.faq.items.1.q`**
Whose name goes on the report?

**`partnerships.faq.items.1.a`**
Set on the first mandate. Both models exist: delivered under your name with Factum as the engine, or co-delivered.

**`partnerships.faq.items.2.q`**
Can you run only part of the scope?

**`partnerships.faq.items.2.a`**
The full pass is fixed, because the value sits in the reconciliation between disciplines. What varies is the depth of the write-up.

**`partnerships.faq.items.3.q`**
How exclusive is this?

**`partnerships.faq.items.3.a`**
Exclusivity is possible in a defined lane, and it is a real commitment when we make it.

### `partnerships.cta`

**`partnerships.cta.title`**
Start with one mandate

**`partnerships.cta.body`**
Point it at a live engagement and read the output.

**`partnerships.cta.button`**
Book a demo

**`partnerships.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.ctaProof`, `shared.guarantee`. Zie sectie 1.

---

## 9. Team — `/team`

_297 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.team.title`**
The team behind Factum

**`meta.team.description`**
A leveraged-finance banker and a data engineer. One of them approves every output.

### `team.header`

**`team.header.title`**
The people behind the output

**`team.header.lead`**
Wouter structured acquisition and leveraged finance at ING. Daniel builds regulated data pipelines. One of them approves every output.

**`team.header.cta`**
Book a demo

### `team.people`

**`team.people.0.name`**
Wouter Dijkman

**`team.people.0.title`**
Founder, Factum

**`team.people.0.bio`**
More than five years inside the institutions that fund these deals. At ING, Acquisition & Leveraged Finance — structuring and vetting the credit behind exactly this kind of transaction. Before that, financial restructuring at Rabobank. He also runs Agentic Mindshift, his own AI consultancy.

**`team.people.0.history.0.org`**
Factum Capital

**`team.people.0.history.0.role`**
Founder

**`team.people.0.history.0.period`**
2026 —

**`team.people.0.history.1.org`**
Agentic Mindshift

**`team.people.0.history.1.role`**
Founder, AI consultancy

**`team.people.0.history.1.period`**
2025 —

**`team.people.0.history.2.org`**
ING

**`team.people.0.history.2.role`**
Acquisition & Leveraged Finance

**`team.people.0.history.2.period`**
2023 – 2025

**`team.people.0.history.3.org`**
Rabobank

**`team.people.0.history.3.role`**
Specialist Financial Restructuring

**`team.people.0.history.3.period`**
2020 – 2023

**`team.people.0.history.4.org`**
Alter Domus

**`team.people.0.history.4.role`**
Legal Officer

**`team.people.0.history.4.period`**
2019 – 2020

**`team.people.1.name`**
Daniel Dropuljic

**`team.people.1.title`**
Technical Lead, Factum

**`team.people.1.bio`**
Daniel builds the systems behind Factum’s diligence engine. As founder of Dandro Solutions he designs data pipelines processing over 50,000 records a day for international healthcare clients, under GDPR and FHIR.

**`team.people.1.history.0.org`**
Dandro Solutions

**`team.people.1.history.0.role`**
Founder, software engineering

**`team.people.1.history.0.period`**
2021 —

**`team.people.1.history.1.org`**
Healex, Berlin

**`team.people.1.history.1.role`**
HL7/FHIR implementation, led a three-person team

**`team.people.1.history.1.period`**
2019 – 2021

**`team.people.1.history.2.org`**
Uniklinik Köln

**`team.people.1.history.2.role`**
Research data infrastructure

**`team.people.1.history.2.period`**
2019

**`team.people.1.history.3.org`**
Furore, Amsterdam

**`team.people.1.history.3.role`**
Data engineering

**`team.people.1.history.3.period`**
2018

### `team.historyLabel`

**`team.historyLabel`**
Background

### `team.closing`

**`team.closing`**
The same scrutiny, turned on the deal in front of you.

### `team.roles`

**`team.roles.title`**
Who signs off on what

**`team.roles.lead`**
Two people, and no analyst pool behind them.

**`team.roles.items.0.label`**
Wouter Dijkman

**`team.roles.items.0.body`**
Sets the scope with you, and approves every finding before it leaves. Nothing reaches you unread.

**`team.roles.items.1.label`**
Daniel Dropuljic

**`team.roles.items.1.body`**
Owns the infrastructure: EU hosting, zero-retention routing, and the retention setting at every provider.

**`team.roles.items.2.label`**
Nobody else

**`team.roles.items.2.body`**
No offshore team, no rotating juniors. If a mandate is bigger than two people and the platform, we say so before you sign.

### `team.cta`

**`team.cta.title`**
You’ll speak to the person who reviews the output

**`team.cta.body`**
While Factum is pre-launch, the demo, the review gate and the walkthrough are the same person.

**`team.cta.button`**
Book a demo

**`team.cta.note`**
Thirty minutes: a walkthrough of the platform, then your own situation.

> **Gebruikt ook deze gedeelde blokken:** `shared.links`, `shared.ctaProof`, `shared.guarantee`. Zie sectie 1.

---

## 10. Contact — `/contact`

_287 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.contact.title`**
Book a demo

**`meta.contact.description`**
Book a thirty-minute demo with the person who reviews every output.

### `contact.header`

**`contact.header.title`**
Book a demo with the person who reviews the output

**`contact.header.lead`**
No form. Pick an open slot in the calendar and we will show you the platform running.

**`contact.header.cta`**
Book a demo

### `contact.call`

**`contact.call.title`**
Book thirty minutes

**`contact.call.lead`**
A walkthrough of the platform, then your own situation. If this is not the right instrument for you, that is a faster answer than a proposal.

**`contact.call.button`**
Book a demo

**`contact.call.note`**
Pick any open slot.

### `contact.documents`

**`contact.documents.eyebrow`**
Before you send anything

**`contact.documents.title`**
Don’t send documents to book a demo

**`contact.documents.lead`**
The demo needs nothing but the conversation. Document access is agreed afterwards, in writing.

### `contact.agenda`

**`contact.agenda.label`**
What we cover

**`contact.agenda.items.0`**
Where you are in the cycle: acquiring, financing, holding or selling.

**`contact.agenda.items.1`**
What is in the data room today, and what is missing.

**`contact.agenda.items.2`**
Which disciplines carry the real risk in your situation.

**`contact.agenda.items.3`**
Whether a sprint fits your situation, or whether it is too early.

**`contact.agenda.items.4`**
What it would cost, scoped against the actual room.

### `contact.faq`

**`contact.faq.title`**
What people ask before they book

**`contact.faq.items.0.q`**
Do I need to prepare anything?

**`contact.faq.items.0.a`**
No. If you have a live deal, bring it. If you don’t, we run the demo on a constructed data room instead.

**`contact.faq.items.1.q`**
Who will I be speaking to?

**`contact.faq.items.1.a`**
Wouter Dijkman. Factum is pre-launch, so the person who shows you the platform is the person who approves every finding it produces.

**`contact.faq.items.2.q`**
We are already mid-process with an adviser. Is it too late?

**`contact.faq.items.2.a`**
Usually not. A sprint runs alongside as a second read, or on the disciplines nobody was scoped for.

**`contact.faq.items.3.q`**
What happens to what I say in the demo?

**`contact.faq.items.3.a`**
It stays confidential from the first message. No documents move until an NDA is signed.

### `contact.details`

**`contact.details.title`**
Who you’re dealing with

**`contact.details.entityLabel`**
Entity

**`contact.details.entityValue`**
Agentic Mindshift Consultancy, Netherlands. Factum Capital is its trading name until incorporation completes.

**`contact.details.kvkLabel`**
Chamber of Commerce

**`contact.details.languagesLabel`**
Working languages

**`contact.details.languagesValue`**
English and Dutch

> **Gebruikt ook deze gedeelde blokken:** `shared.ctaProof`. Zie sectie 1.

---

## 11. Privacy — `/privacy`

_336 woorden. Secties in leesvolgorde._

### Zoekresultaat (browsertitel + Google-omschrijving)

_Titel krijgt automatisch ` — Factum Capital` erachter; houd hem onder de 43 tekens of de build klaagt._

**`meta.privacy.title`**
Privacy

**`meta.privacy.description`**
How this website and our engagements handle personal data.

### `privacy.header`

**`privacy.header.title`**
What this site collects, and what an engagement does

**`privacy.header.lead`**
This page covers the website. Engagement data handling is governed by the agreement we sign.

### `privacy.updated`

**`privacy.updated`**
Last reviewed 5 August 2026.

### `privacy.sections`

**`privacy.sections.0.title`**
This website

**`privacy.sections.0.body.0`**
No contact form, no account system, no login. There is nothing here to submit.

**`privacy.sections.0.body.1`**
Your language comes from the URL you are on. No cookie, no IP-based detection.

**`privacy.sections.0.body.2`**
Visits are counted with Plausible Analytics: no cookie, no fingerprint, no cross-site profile, data held in the EU. It records the page, the referring site, the country and the device type.

**`privacy.sections.0.body.3`**
That count writes nothing to your device. That is why this site carries no cookie banner.

**`privacy.sections.1.title`**
Booking a demo

**`privacy.sections.1.body.0`**
The booking link takes you to Cal.com, a third-party scheduling service. What you enter there is processed under their terms and shared with us so we can hold the meeting.

**`privacy.sections.1.body.1`**
We use it to prepare for the demo and to follow up. We do not add it to a marketing list.

**`privacy.sections.2.title`**
Documents you share with us

**`privacy.sections.2.body.0`**
No documents are shared through this website. Access is agreed separately, in writing.

**`privacy.sections.2.body.1`**
During an engagement, confidential data is pseudonymized before analysis and reversed only in the final output. Analysis runs on Google Vertex AI in an EU region under a Data Processing Agreement. The model provider does not keep your documents or train on them.

**`privacy.sections.2.body.2`**
Retention and deletion terms on our own side are set in the engagement agreement.

**`privacy.sections.3.title`**
Your rights

**`privacy.sections.3.body.0`**
Under the GDPR you can ask what personal data we hold, have it corrected or deleted, or object to how it is used. Raise it in the demo or reply to any email from us.

**`privacy.sections.3.body.1`**
If you are not satisfied, you can complain to the Autoriteit Persoonsgegevens, the Dutch data protection authority.

**`privacy.sections.4.title`**
Changes

**`privacy.sections.4.body.0`**
This page will change as Factum moves out of pre-launch. The review date above shows how current it is.

### `privacy.controller`

**`privacy.controller`**
The controller is Agentic Mindshift Consultancy, registered with the Dutch Chamber of Commerce under number {kvk} and trading as Factum Capital. This page is a plain-language summary.

---

## Getallen die de code invult

Deze verschijnen als `{iets}` in de tekst hierboven. Ze staan in `lib/site.ts` en worden uit de echte lijsten afgeleid, zodat een wijziging aan de moduleroster automatisch elke zin bijwerkt. **Typ ze niet als cijfer in de tekst** — dan lopen ze stil uit de pas.

| placeholder | nu | bron |
| --- | --- | --- |
| `{modules}` | 22 | aantal modules in MODULES (`MODULE_COUNT`) |
| `{waves}` | 5 | aantal waves (`WAVE_COUNT`) |
| `{disciplines}` | 9 | aantal disciplines (`DISCIPLINE_COUNT`) |
| `{blocks}` | 7 | harde blokkeerklassen (`HARD_BLOCK_COUNT`) |
| `{zdr}` | 3 | modules met zero retention (`ZDR_MODULE_COUNT`) |
| `{date}` | 15 July 2026 | datum van de groundingmeting (`GROUNDING_AUDIT_DATE`) |
| `{remainder}` | 3.3 | 100 min de groundingscore (`GROUNDING_REMAINDER`) |
| `{kvk}` | 99495945 | KvK-nummer (`KVK`) |
| `{w1}..{w5}` | 8 / 2 / 4 / 5 / 3 | modules per wave, afgeleid (`WAVE_SIZES`) |
| `{first}` | 8 | modules in wave 1 (`WAVE_SIZES[0]`) |
| `{other}` | 19 | afgeleid (`MODULE_COUNT - ZDR_MODULE_COUNT`) |

Verder vast in de code: groundingscore **96.7%** (gemeten 15 July 2026, interne telling), dekking **9 van 14** diligence-dimensies volledig, **5** gedeeltelijk.
