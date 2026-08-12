# Factum Capital — sitetekst

Alles wat er op factumcapital.eu staat, in leesvolgorde. Schrijf er vrij overheen.

---

## Homepage  (/)

### Lees de hele dataroom in dagen

AI-gedreven due diligence voor M&A en private equity. Gebruikelijke due diligence leest een steekproef en rapporteert in weken. Wij lezen alles, en elke bevinding verwijst naar het document en de pagina erachter.

→ Plan een demo

### De meeste due diligence leest de dataroom nooit helemaal

Er is nooit genoeg tijd. Dus wordt de prijs bepaald op een steekproef van de documenten.

#### U werkt met een steekproef

Klassiek boekenonderzoek leest een fractie van de dataroom. De rest zit er nog steeds in.

#### Het risico zit tussen de disciplines

Een quality-of-earnings read dekt de winst. De dure verrassingen zitten waar twee specialisten allebei dachten dat de ander keek.

Waarom een tweede lezing

### Een leveraged-finance bankier en een data-engineer

Wouter structureerde acquisitie- en leveraged finance bij ING. Daniel bouwt gereguleerde datapijplijnen. Een van beiden keurt elke output goed voordat u die ziet.

→ Maak kennis met het team

### Hoe een bevinding eruitziet

Een uitgewerkt voorbeeld op een fictieve target. Dit is het format dat u krijgt.

### Elk mandaat doorloopt dezelfde vijf stappen

Iedereen kan een AI-tool op een dataroom richten. De vraag is wat er gebeurt als het model iets fout heeft.

De pijplijn stopt en roept een persoon

Elke harde blokkade gaat naar een persoon.

- Verzonnen of gehallucineerde bronverwijzingen
- Privacylekken
- Scope-weigeringen
- Concepten onder de reviewerdrempel

### Waar uw documenten heen gaan, en wie ze kan zien

EU-hosting, zero retention bij de modelaanbieder, pseudonimisering vóór analyse, en één met naam genoemde beoordelaar. Vier mechanismen, geen certificering.

→ Lees de governancepagina

### Negen disciplines, één read over dezelfde dataroom

Wat de ene discipline vindt, ligt op tafel voor de volgende.

Geordend op afhankelijkheid: later werk wacht op de bevindingen die het nodig heeft.

*Uw team krijgt dit niet in twee weken rond.*

### Dezelfde bewijsbasis, vijf keer in de dealcyclus

De dataroom wordt opnieuw gelezen zodra iemand nieuws erop moet vertrouwen. Lees hem één keer, goed.

#### Kopen

Bevindingen landen terwijl ze prijs en structuur nog kunnen bewegen.

#### Financieren

De financier leest hem toch. Geef hem een basis die al onderbouwd is.

#### Houden

Convenantruimte en KPI-drift, plus de hefbomen waar een risicolijst nooit naar kijkt.

#### Verkopen

Draai de slag van de koper eerst aan uw eigen kant, nu er nog tijd is.

#### Herstructureren

Continuïteit, crediteurenpositie en convenantruimte, terwijl er nog te kiezen valt.

→ Wat de Diligence Sprint omvat

### Wat er verandert als u tekent

U komt aan tafel met de hele dataroom achter u.

#### De prijs weerspiegelt de hele dataroom

Elke discipline, afgestemd, voordat het bedrag vaststaat.

#### U weet al wat ze zullen vinden

De adviseurs van de koper doorlopen deze analyse toch. Deze keer zag u het eerst.

### Drie stappen om te beginnen

Geen voorstel voordat we allebei weten dat het past.

#### Plan een demo van dertig minuten

We lopen het platform met u door op een echte run, en bepalen daarna of het bij uw situatie past.

#### Teken de NDA, wijs ons dan de dataroom aan

Een NDA voordat er één document beweegt. Toegang loopt onder een verwerkersovereenkomst, in de EU, met zero retention.

#### Lees de bevindingen in dagen

Elke bevinding noemt zijn bron. Een persoon met naam keurde die goed voordat u hem zag.

### Zie het draaien, beslis daarna

Dertig minuten: eerst het platform, dan uw eigen situatie. Past het niet, dan zeggen we dat.

→ Plan een demo

*Google-resultaat:* **AI due diligence voor M&A en private equity** — Negen disciplines over de volledige dataroom. Onderling afgestemd. Beoordeeld door een persoon voordat u iets ziet.

---

## Platform  (/platform)

### Hoe het platform een dataroom leest

22 vooraf afgebakende modules, in een vaste afhankelijkheidsvolgorde, met vier onderbouwingscontroles en een verplichte menselijke toets. Elke keer dezelfde run.

→ Plan een demo

### Van upload tot een afgeronde bevinding

Vijf stappen. Elke keer dezelfde vijf, of er nu iemand meekijkt of niet.

#### Gefundeerde retrieval

De module gaat de dataroom in en haalt de passages op die zijn vraag beantwoorden.

Vertrouwelijke financiële en persoonsgegevens worden gepseudonimiseerd voordat ze deze laag bereiken.

#### Opstellen binnen het schema

Een claim zonder document en passage erachter is geen bevinding.

#### Generate-critique-retry

Een reviewer-agent bekritiseert het concept en stuurt het terug. Maximaal twee retries per specialist.

#### Vierlaagse groundingcheck

Index, citaat, entailment, second opinion. Elke laag vangt wat de vorige miste.

#### Reconciliatie tussen disciplines

Bevindingen worden tegen elkaar gelezen en tot één verhaal teruggebracht.

#### Menselijke review en goedkeuring

Een persoon met naam beoordeelt de bevindingen voor vrijgave.

Pseudonimisering wordt alleen hier teruggedraaid, in de uiteindelijke output.

### Vier checks, elk smaller dan de vorige

Een claim moet alle vier overleven. Eén fout stuurt hem terug.

*Vangt*

#### Citatiekalibratie

Elke citatie-index wordt gecontroleerd tegen de set passages die daadwerkelijk is opgehaald.

Verwijzingen naar een document dat de run nooit heeft geopend.

#### Lexicale citaatcheck

De geciteerde tekst moet letterlijk in de aangehaalde passage staan.

Parafrase gepresenteerd als woordelijk citaat.

#### Entailment-oordeel

Een apart model leest de claim en de passage en oordeelt of het een uit het ander volgt.

Echte citaten die de claim erboven niet dragen.

#### Second-opinion verificatie

Een lokaal NLI-model draait het oordeel opnieuw. Deze laag faalt gesloten.

Wat de eerste drie hebben doorgelaten.

Claims die falen krijgen één reparatiepoging: opnieuw citeren uit de bron, dan opnieuw beoordelen. Wat dan nog faalt, gaat eruit of wordt gemarkeerd als onbevestigd.

### 7 condities die automatische goedkeuring stoppen

Retries zijn gemaximeerd op twee per specialist. Deze condities beëindigen de lus hoe dan ook en sturen het concept naar een persoon.

#### Privacylek

Data is over een grens gegaan die er niet overheen mocht.

#### Verzonnen bron

Een bronverwijzing die niet naar een echte passage leidt.

#### Scope-weigering

De module kan het niet binnen zijn opdracht beantwoorden, en zegt dat.

#### Te weinig diepgang

Een antwoord dat de standaard van het schema niet haalt.

#### Placeholder-tekst

Opvultekst achtergelaten waar bewijs hoort.

#### Bijna leeg concept

Te weinig inhoud om te beoordelen.

#### Lage reviewerscore

De critic-agent scoorde het concept onder de drempel.

### De modulebibliotheek, in dispatchvolgorde

Een module die op de output van een andere wacht, kan niet eerder starten. Die afhankelijkheid bepaalt de volgorde, niet onze voorkeur. Het label onder elke module zegt wat hij oplevert: een bevinding, een document, of een doorlopend signaal.

Afgeleid uit de dispatchgrafen in de broncode, niet geschat. ZDR markeert de modules waarvan de routing hard is vastgezet op een zero-retention EU-endpoint.

### Het platform in cijfers

Geteld uit de broncode van het product, niet geschat.

#### Modules per opdracht

Elk vooraf afgebakend op een discipline of een oplevering. Ze draaien allemaal, elk mandaat.

#### Leveren bevindingen

Ze lezen de dataroom uit en leveren claims met de bronpassage eronder.

#### Stellen documenten samen

IC-memo, vendor due diligence, teaser, financieringsmemorandum. Gebouwd op de bevindingen erboven.

#### Lopen door na closing

Convenantruimte en vroege signalen, op een eigen klok.

#### Dispatchgolven

Geordend op afhankelijkheid. Golf 1 opent met acht modules tegelijk.

#### Zero-retention gated

Fiscaal, juridisch en financieel weigeren te draaien op een model dat data bewaart.

#### Harde blokkades

Condities die een concept tegenhouden, hoeveel retries er ook zijn geweest.

### Drie andere manieren om dit te doen

Vergeleken als categorieën gereedschap, niet als merknamen. Elk vinkje beantwoordt één vraag: doet deze categorie dit überhaupt.

- Virtuele dataroom
- AI-DD-tools
- Algemene AI
- Factum

Ja

Deels

Nee

Niet van toepassing

Vooraf afgebakende module per discipline

Draait zonder dat er geprompt wordt

Bronverwijzing verplicht in het schema

Reconciliatie tussen disciplines

Levert de deliverable, niet een antwoord

Zero retention bij de modelaanbieder

Persoon met naam tekent af

Gepubliceerde accuratesse-audit

Niemand in deze tabel heeft er een, wij ook niet.

Categorieën, geen leveranciers. Producten veranderen per kwartaal en de meeste publieke claims erover komen van de leverancier zelf.

### Wat we niet claimen over het platform

Alles hierboven beschrijft een mechanisme. Niets ervan is een gecertificeerde meting.

- Geen geauditeerd accuratessepercentage. Interne benchmarks zijn één dataset en niet extern gecontroleerd.
- Geen claim dat de menselijke poort optioneel is. Die is verplicht.
- Nog geen afgeronde publieke cases.
- Geen uniform trackrecord. De financiële module heeft end-to-end op een live deal gedraaid en is geverifieerd tegen brondocumenten. De reconciliatielaag is jonger.
- Geen technische due diligence op productniveau. Broncode-review, architectuurbeoordeling en schaalbaarheidstests zitten niet in de standaardslag.
- Geen integriteits- of reputatieonderzoek. Achtergrondchecks op personen en tegenpartijen lopen buiten dit platform om.
- Geen algemene beschikbaarheid. Factum is pre-launch.

### Vragen die we krijgen

#### Is dit niet gewoon een AI-chatbot met extra stappen?

Een chatsessie is één contextvenster dat u stuurt. Dit zijn 22 vooraf afgebakende modules in een vaste afhankelijkheidsvolgorde, met vier groundingchecks en een verplichte menselijke poort. Het verschil is wat er gebeurt als niemand kijkt.

#### Waarom golven en niet alles tegelijk?

Fiscaal kan niet redeneren zonder de financiële en juridische reads. Waardering kan niet prijzen zonder fiscaal. De afhankelijkheidsgraaf bepaalt de volgorde; golf 1 draait nog steeds acht modules parallel.

#### Wat gebeurt er als het model het niet weet?

Dan moet het dat zeggen. Een bevinding is óf gedekt door een bronverwijzing die vier checks heeft overleefd, óf gemarkeerd als onbevestigd. Verzonnen bronnen zijn één van de 7 harde blokkades.

#### Hoe weet ik dat het platform bevindingen van dit gewicht kan dragen?

De financiële module is het meest cijfermatig blootgestelde deel van elke read. Die heeft end-to-end op een live deal gedraaid en is onafhankelijk geverifieerd tegen brondocumenten. Nieuwere lagen hebben minder historie, en we zeggen erbij welke dat zijn.

#### Hoe snel is het?

De pipeline-pass draait in uren. De afgeronde, beoordeelde output kost dagen. We noemen geen leverdatum voordat we de dataroom hebben gezien.

### Zie het draaien op een echte dispatch-graaf

We openen de dispatch-graaf, draaien een module, en volgen één bevinding terug naar de bronpassage.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **AI-duediligenceplatform** — 22 due-diligencemodules over negen disciplines. Elke bevinding verwijst naar een document. Elke output passeert een menselijke toets.

---

## Diligence sprint  (/diligence-sprint)

### Zie wat een koper zou vinden, voordat hij het vindt

Alle 9 disciplines, afgestemd tot één verhaallijn. Gedraaid op een target, een onderneming die u houdt, of uw eigen bedrijf.

→ Plan een demo

Waarom een tweede lezing

### Alle 9 disciplines, één vaste scope

Elk is een afgebakende slag met een eigen vraag en een eigen uitkomst.

Eén opdracht, één prijs. Geen à-la-cartemenu en geen upsell na ondertekening. Waar elke discipline naar kijkt, bepalen we in de demo tegen uw dataroom.

### Wat er één deliverable van maakt

Wat 9 losse analyses tot één oplevering maakt, in plaats van 9 losse rapporten.

#### Waardecreatie-analyse

Margelekkage, indexatiegaten, cross-sellhefbomen. Het rapport draagt ook de upside.

#### Disciplineoverstijgende afstemming

De bevindingen van elke discipline opgelost tot één samenhangende verhaallijn, met een persoon met naam achter het resultaat.

#### Live data-gap tracker

De lopende vragenlijst, bijgewerkt terwijl gaten worden gedicht.

### Hoe het aankomt

Drie vormen, vanaf dag één naast elkaar.

#### Review-dashboard

Financieel, fiscaal, technologie en continuïteit

Een live, doorklikbaar dashboard. Volg elke bevinding terug naar de bronpassage.

#### Geschreven rapport

De overige disciplines

Een gestructureerd geschreven rapport, afgestemd tot dezelfde verhaallijn.

#### Naast beide

De data-gap tracker

Een gestructureerde lijst met datagaten, geleverd terwijl er nog tijd is om ze te dichten.

### Wat we nodig hebben om te beginnen

Twee dingen. Geen workshop, geen kick-offweek.

#### Toegang tot de dataroom

Financiën, juridisch, fiscaal, HR, contracten en IP, zoals afgesproken in de demo.

#### Antwoorden op de data-gap tracker

Uw antwoorden dichten de gaten. Eén ronde om ze te verwerken en de geraakte analyses opnieuw te draaien, zit inbegrepen.

### Vragen die we krijgen

#### Vervangt dit een quality-of-earnings-rapport?

Het is breder, en het is geen assurance-dienst. Een quality-of-earnings-analyse dekt één dimensie in vier tot tien weken. Dit draait 9 disciplines en stemt ze onderling af. Een ondertekende accountantsverklaring blijft een aparte opdracht.

#### Hoe lang duurt het?

Dagen, geen weken. De pipeline-slag draait in uren; de menselijke beoordeling en de afstemming volgen daarna. We committeren ons niet aan een datum voordat we de dataroom hebben gezien.

#### Wat kost het?

Eén prijs voor de hele scope, bepaald in de demo aan de hand van de omvang en de staat van uw dataroom. Geen menu met niveaus.

#### Wat gebeurt er met onze documenten?

Vertrouwelijke gegevens worden gepseudonimiseerd vóór de analyse en pas in de uiteindelijke output teruggezet. De analyse draait op Google Vertex AI in een EU-regio onder een verwerkersovereenkomst. De modelaanbieder bewaart uw documenten niet en traint er niet op.

#### Kan ik een voorbeeldrapport zien?

Geen echt rapport. Klantdocumenten zijn vertrouwelijk en geen enkele klant heeft ervoor gekozen bij naam genoemd te worden. In de demo laten we u het live dashboard zien, het outputschema, en hoe een bevinding terugleidt naar de bron.

#### Wie beoordeelt de output eigenlijk?

Een persoon met naam, voordat er iets op uw bureau ligt. Zolang Factum pre-launch is, is dat de oprichter, op elk mandaat.

### Kijk of een sprint bij uw situatie past

Een kwartier het platform, een kwartier uw dataroom: wat erin zit, wat ontbreekt, en of een sprint het juiste instrument is.

→ Plan een demo

Een beperkt aantal pilotmandaten, een handvol.

*Google-resultaat:* **Volledige dataroomreview in dagen** — Negen specialistische reads over één dataroom, samengebracht tot één verhaal, met een live datagap-tracker.

---

## The method  (/method)

### De methode, van begin tot eind

De lange versie. Wat in welke volgorde draait, het contract waar elke bevinding aan moet voldoen, en wat een mens controleert voordat er iets bij u terechtkomt.

→ Plan een demo

### 22 modules, 5 golven, één volgorde

Niets draait te vroeg. Een module start zodra het werk waar hij van afhangt klaar is. Daarom heeft de run een vorm en geen wachtrij.

#### Golf één — de onafhankelijke passages

8 modules openen tegelijk. Financieel, commercieel, HR, technologie, ESG en operationeel gaan parallel de dataroom in, naast de screener op het informatiememorandum en de opzet voor monitoring. Geen van hen heeft het antwoord van een andere module nodig om te beginnen.

#### Golf twee — de passages die moeten wachten

Fiscaal en juridisch. Beide redeneren over gevolgen: een fiscale positie is een gevolg van de structuur die de financiële passage net heeft beschreven, en een juridische blootstelling is meestal een gevolg van een commerciële voorwaarde. Ze eerder draaien levert stellige antwoorden op de verkeerde vraag.

#### Golf drie — synthese

4 modules lezen dwars door alles heen wat erboven ligt. Waardering herrekent de prijs dóór de bevindingen heen in plaats van eromheen. Deal economics, portfolio en post-merger integratie nemen dezelfde bevindingen en stellen er een andere vraag aan.

#### Golf vier — de documenten

5 deliverables, samengesteld uit de golven hierboven: vendor due diligence, het IC-memo, de teaser of CIM, het financieringsmemorandum en de documentfabriek voor wat het proces verder nodig heeft.

#### Golf vijf — na de deal

3 modules op hun eigen klok. Exit readiness, portefeuillegezondheid en de periodieke IC-rapportage. Ze horen niet bij de sprint en wachten er niet op.

Golf één en twee zijn de due diligence zelf. Alles daarna is wat u ermee doet.

### Het outputcontract, veld voor veld

Vijf velden. Een bevinding die ze niet alle vijf kan invullen, wordt niet als bevinding geleverd.

*Als het veld leeg blijft*

#### Module

Welke van de 22 hem heeft geproduceerd. Vooraf afgebakend, dus de vraag stond op papier voordat de dataroom openging — niet geïmproviseerd op wat er toevallig in bleek te zitten.

Er is geen vrije-tekstbaan. Geen module, geen bevinding.

#### Bevinding

Eén claim, in één zin. Samengestelde claims worden gesplitst, want een zin met twee claims erin kun je maar half controleren.

Te vaag om te controleren telt hetzelfde als onjuist.

#### Letterlijk citaat

De onderbouwende passage, woord voor woord geciteerd. Niet samengevat, niet opgepoetst, niet ingekort om te passen.

Een parafrase die als citaat wordt gepresenteerd zakt voor de tekstcontrole en gaat terug.

#### Brondocument en passage

Bestandsnaam en pagina, zodat u het zelf kunt openen. Dit is het veld dat een bevinding bespreekbaar maakt in plaats van gezaghebbend.

Een verwijzing die niet naar een echte passage leidt is een harde blokkade, geen waarschuwing.

#### Menselijke controle

De persoon die hem heeft goedgekeurd, met naam, vóór levering. Elke bevinding, elk mandaat.

Er is geen snelle route voor een drukke week.

Een claim die zakt voor een controle krijgt één herstelpoging: opnieuw citeren uit de bron, dan opnieuw beoordelen. Wat dan nog zakt wordt geschrapt of geleverd met het label onbevestigd. Onbevestigd is een legitieme uitkomst. Een stilletjes geschrapte claim niet.

### Wat er wordt vastgelegd, en in welke volgorde

Een bevinding is een keten. Elke schakel wordt vastgelegd, en dat is de enige reden dat een vraag over drie maanden nog een antwoord heeft.

- Het document komt binnen en wordt geïndexeerd. Vertrouwelijke financiële en persoonlijke waarden worden gepseudonimiseerd voordat enig model ze ziet.
- De module haalt de passages op die zijn eigen vraag beantwoorden, en alleen die.
- Het concept wordt geschreven tegen het contract hierboven. Een claim zonder passage erachter wordt niet geschreven.
- Een controleronde bekritiseert het concept en stuurt het terug. Twee pogingen, daarna stopt de lus en neemt een mens het over.
- Vier funderingscontroles op volgorde: de verwijzingsindex, het citaat zelf, of de claim volgt uit de passage, en een tweede oordeel dat dichtvalt bij twijfel.
- Een persoon met naam beoordeelt, verzoent en keurt goed. Pseudonimisering wordt hier teruggedraaid en nergens eerder.
- U krijgt de bevinding met de documentverwijzing eraan vast, en die blijft daarna te openen.

Het uitgewerkte voorbeeld — een clausule op pagina 14 van een fictieve raamovereenkomst, en de bevinding die eruit volgde — staat op de homepage.

→ Bekijk het uitgewerkte voorbeeld

### Wat de reviewer werkelijk doet

“Human in the loop” is een uitdrukking. Dit is de volgorde erachter.

- Opent het geciteerde document en leest de passage naast de claim die erop is gebouwd.
- Bepaalt materialiteit — welke bevindingen veranderen wat u betaalt, of óf u tekent.
- Lost conflicten tussen modules op. Twee disciplines die één feit anders lezen is zelf een bevinding, geen fout om glad te strijken.
- Markeert wat niet bevestigd kon worden, en waarom.
- Draait de pseudonimisering terug in de eindoutput, en alleen daar.
- Tekent. Eén persoon met naam, aanspreekbaar op het document dat u ontvangt.

7 faalklassen beëindigen de geautomatiseerde lus voortijdig en sturen het concept naar die persoon, ongeacht de score.

→ Hoe documenten worden behandeld

### Waar de methode ophoudt

Alles hierboven is werk waarop een machine aanspreekbaar is. Een flink deel van due diligence is dat niet, en doen alsof van wel is hoe dit soort systemen de zaal verliest.

→ Wat AI niet kan in due diligence

### Zie de methode draaien op een echte dataroom

We openen de pipeline, draaien een module en volgen één bevinding terug naar de bronpassage.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **Hoe AI-due-diligence echt werkt** — De volgorde waarin de modules draaien, het contract waar elke bevinding aan moet voldoen, en wat een reviewer controleert voordat er iets wordt geleverd.

---

## Limits of AI  (/limits-of-ai)

### Wat AI niet kan in due diligence

Wij verkopen een AI-pipeline. Deze pagina gaat over het deel van het werk dat hij niet doet, en wie het dan wel doet.

→ Plan een demo

### Vijf dingen die geen model doet in een dataroom

Dit zijn geen afstelproblemen. Het zijn categorieën werk die buiten liggen wat een taalmodel is.

*Wie het doet*

#### Bepalen wat ertoe doet

Een model vindt elke change-of-control-clausule in de dataroom. Het kan u niet zeggen welke de deal sloopt. Materialiteit is een oordeel over uw structuur, uw prijs en uw risicobereidheid, en geen van die drie staat in de dataroom.

De reviewer rangschikt de bevindingen tegen de deal die u werkelijk doet.

#### Citeren uit het document dat er niet is

Retrieval leest wat is geüpload. Het duurste in due diligence is vaak een afwezigheid — het contract dat niemand heeft opgeborgen, het jaar dat ontbreekt in de loonexport. Een afwezigheid heeft geen passage om te citeren, dus geen enkel gefundeerd systeem kan haar als bevinding opvoeren.

De datagap-tracker is de lopende lijst van een mens: wat is opgevraagd en nooit gekomen. Die wordt naast de bevindingen geleverd.

#### Lezen wat niemand heeft opgeschreven

Managementsessies, het bedrijfsbezoek, een referentiegesprek met een klant, een integriteitscheck op een aandeelhouder. Dit levert de bevindingen op die biedingen het vaakst verschuiven, en geen ervan begint als document.

Uw eigen team, of uw adviseurs. Dit platform doet het niet en suggereert niet van wel.

#### Zwak onderscheiden van verborgen

Een cijfer kan zwak zijn omdat het bedrijf zwak is, of omdat de verkoper het proces heeft gestuurd. Op papier zien die twee er identiek uit. Ze uit elkaar houden vraagt kennis van hoe verkopers zich gedragen, niet van wat er in het dossier staat.

Iemand die de andere kant van de tafel heeft gedraaid. Bij ons is dat een leveraged-finance-bankier.

#### Aanspreekbaar zijn

Een model kan geen Representative zijn onder uw NDA, kan zich niet verantwoorden tegenover uw investeringscommissie en kan niets tekenen. Aanspreekbaarheid is geen functie die u aan een systeem toevoegt. Ze hangt aan een persoon, of ze bestaat niet.

Eén persoon met naam keurt elke output goed en staat ervoor in.

Zegt een leverancier dat zijn systeem een van deze vijf doet, vraag dan welke pagina het citeerde.

### Daarom is de menselijke controle verplicht

De menselijke stap is geen veiligheidsdeken over een af product. Het is de plek waar vier van de vijf punten hierboven daadwerkelijk gebeuren.

- Een naam en een datum op elke output, geen betrouwbaarheidsscore.
- Materialiteit bepaald tegen uw deal, niet tegen een benchmark.
- Onbevestigde claims gemarkeerd als onbevestigd in plaats van stilletjes geschrapt.
- Eén persoon om mee van mening te verschillen.

→ Hoe documenten worden behandeld

### En waar de machine wél beter in is

De eerlijke versie van dit argument gaat twee kanten op.

#### Hij leest alles

Een team onder tijdsdruk leest een steekproef en noemt dat dekking. Pagina 900 krijgt dezelfde aandacht als pagina 9.

#### Hij wordt niet moe

Hetzelfde schema, dezelfde controles en dezelfde bewijsstandaard aan het eind van de run als aan het begin. Consistentie is waar mensen het slechtst in zijn en machines gratis.

#### Hij draait parallel

8 modules die tegelijk openen in plaats van op elkaar te wachten: daar komen de dagen vandaan — niet doordat één antwoord sneller binnenkomt.

### Drie vragen voor elke AI-duediligenceleverancier

Wij inbegrepen. De antwoorden zeggen meer dan de demo.

#### Wie tekent?

Is het antwoord een dashboard, dan tekent niemand. Vraag om een naam, en vraag wat er gebeurt als die naam het mis heeft.

#### Wat gebeurt er met een claim die niet te citeren is?

Er zijn drie eerlijke antwoorden: hij wordt geschrapt, gemarkeerd, of getoond met het bewijsgat zichtbaar. Een systeem zonder antwoord laat u ongemarkeerde gokken zien.

#### Wat doet het als een document ontbreekt?

Stilte is het verkeerde antwoord. Een ontbrekend document hoort een regel op een lijst op te leveren, niet de afwezigheid van een bevinding.

→ De methode, van begin tot eind

### Stel ons de drie vragen

Dertig minuten met de persoon wiens naam onder de output staat. Neem de lastige mee.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **Wat AI niet kan in due diligence** — Vijf dingen die geen enkel model doet in een dataroom, waarom de menselijke controle verplicht is, en drie vragen voor elke AI-leverancier.

---

## Governance  (/governance)

### Hoe uw documenten worden behandeld, en wat we niet claimen

Gegevensverwerking is ingebouwd in hoe de pipeline draait. Het is ook smaller dan de meeste securitypagina’s suggereren, dus deze pagina benoemt de grens.

→ Plan een demo

### Vier dingen die voor elke opdracht gelden

Vier mechanismen. Geen daarvan is een certificering.

### De enige verplichte menselijke stap

Een met naam genoemd persoon keurt elke output goed. Dit zijn de condities die dat afdwingen.

- Bevindingen worden voor levering teruggecheckt tegen de brondocumenten.
- De poort draait elke keer, automatisch.
- 7 faalklassen gaan naar een persoon in plaats van automatisch goedgekeurd te worden.
- Een persoon met naam beoordeelt, verzoent en staat achter de output.
- Gepseudonimiseerde waarden worden alleen hier teruggedraaid, in de uiteindelijke output.

### Drie modules weigeren te draaien op een model dat data bewaart

Zero data retention is een routeringsregel in de code, geen belofte op een pagina. Fiscaal, juridisch en financieel zitten achter die poort.

- De poort is een harde eis, gecontroleerd vóór dispatch.
- Er is geen stille afwaardering naar een aanbieder die wel bewaart.
- Analyse draait op Google Vertex AI in een EU-regio, onder een verwerkersovereenkomst.
- De andere 19 modules draaien op dezelfde infrastructuur. Alleen deze drie weigeren te starten zonder de poort.

### Twee geheugens. Eén is gedeeld, één verlaat uw omgeving nooit.

Wat we over klanten heen leren, en wat bij u blijft.

#### Gedeeld tussen cliënten

Methodologische lessen — hoe een check hoort te lopen, waar een soort analyse vaak misgaat. Ontdaan van persoonsgegevens vóór opslag. De belangrijkste lessen gaan terug de latere runs in.

- Methode, geen inhoud
- Persoonsgegevens verwijderd vóór opslag
- Geen cliëntnamen, documenten of cijfers

#### Verlaat uw omgeving nooit

Regels afgeleid uit uw eigen opdrachten. Strikt gebonden aan uw account; de service weigert te draaien zonder cliënt-identificatie.

- Uw documenten en bevindingen
- Uw afgeleide regels en voorkeuren
- Afgebakend op cliënt-ID, afgedwongen in code

Is methodologisch leren tussen cliënten een probleem voor uw mandaat, zeg dat in de demo. Het kan voor uw account uit.

### Eén benchmark, gepubliceerd met de kanttekeningen eraan vast

Liever een getal met zijn grenzen dan helemaal geen getal.

*Claims die gefundeerd zijn in een geciteerde passage of expliciet als onbevestigd zijn gemarkeerd*

Eén interne dataset, gemeten 15 July 2026. Niet geauditeerd. Geen garantie voor uw deal, en niet vergelijkbaar met het cijfer van iemand anders.

- Eén dataset, één run. Geen derde partij heeft het gecontroleerd.
- De rest is niet “3.3% fout”. Het is het deel dat de checks niet sluitend konden funderen of markeren.
- Een andere dataroom levert een ander getal op.
- Dit is waarom de menselijke poort verplicht is en niet optioneel.

### Waarom dit geen chatvenster is

Eén uit de rechtszaal. Eén uit uw eigen NDA. Eén uit het wetboek.

#### Een publieke AI-tool is geen private

In United States v. Heppner oordeelde een federale rechter dat de uitwisselingen van een verdachte met een publieke AI-assistent geen verschoningsrecht en geen work product genoten, en gaf ze aan het openbaar ministerie. Waar het werk draait, bepaalt wie het later mag lezen.

#### Uw NDA dekt de tool mogelijk niet

De meeste M&A-NDA’s staan verstrekking alleen toe aan benoemde Representatives: medewerkers, adviseurs, financiers. Een AI-platform hoort daar zelden bij. De dataroom in een consumententool zetten kan de schending zelf zijn.

#### De EU AI Act loopt op een klok

Verplichtingen voor general-purpose AI gelden sinds 2 augustus 2025. De transparantieplichten uit artikel 50 volgen op 2 augustus 2026. Een gedocumenteerde menselijke poort is makkelijker in dat regime te plaatsen dan een chatsessie die niemand heeft gelogd.

Niets hiervan is juridisch advies. Alle drie zijn redenen dat de pipeline is zoals hij is.

### De voorwaarden

Wat er in de opdrachtovereenkomst staat, voordat u ernaar hoeft te vragen.

#### Eerst een NDA

Getekend voordat er één document beweegt. Niet na de scoping, niet naast de opdrachtbevestiging. Eerst.

#### Met wie u contracteert

Factum Capital is nog geen zelfstandige rechtspersoon. Opdrachten worden gecontracteerd door Agentic Mindshift Consultancy, Nederland, KvK 99495945. De oprichting ligt bij de notaris.

#### Aansprakelijkheid, gemaximeerd

Onze aansprakelijkheid is gemaximeerd op de prijs van de opdracht. Gevolgschade, gederfde winst en gemiste IRR zijn uitgesloten.

#### Beroepsaansprakelijkheid

De dekking loopt via Agentic Mindshift Consultancy, de contracterende partij. Factums eigen polis volgt op de oprichting.

#### Wat we bewaren, en waarom

Uw documenten en bevindingen blijven in uw eigen tenant, zodat een volgend mandaat kan teruglezen op een eerder mandaat. Op verzoek verwijderd, op elk moment. De termijn staat in de opdrachtovereenkomst.

#### Sub-processors

Analyse draait op Google Vertex AI in een EU-regio, onder een verwerkersovereenkomst. Inplannen loopt via Cal.com. De volledige lijst per module ligt op tafel voordat u iets uploadt.

Vraag het op schrift. Onder DORA moet een fonds boven de drempel elke ICT-derde partij benoemen in een register dat bij de toezichthouder wordt ingediend — ons inbegrepen.

### Wat de machine doet, en wat de persoon doet

U moet voor elke bevinding kunnen zien wat die heeft geproduceerd en wat die heeft gecontroleerd.

- Elke module haalt zelfstandig bewijs uit uw geüploade documenten.
- Een tweede reviewer-agent bekritiseert elk concept.
- Een aparte slag controleert beweringen tegen de brontekst.
- Een persoon beoordeelt het resultaat.
- Beweringen die niet aan een passage te koppelen zijn, worden gemarkeerd als onbevestigd.

*Machine*

*Mens*

### Wat we niet claimen

Het meeste van wat een koper op zo’n pagina wil zien, hebben we nog niet. Het opsommen is beter dan het suggereren.

- Geen ISO 27001, SOC 2 of andere certificering. Geen audit van de pipeline door derden.
- Geen pentest, single sign-on of toezegging over audit logs.
- Geen gepubliceerde EU-regio. Analyse draait op Google Vertex AI in een EU-regio; we noemen niet welke.
- Geen beweerde AVG-compliancestatus. Verwerkingsvoorwaarden horen in een opdrachtovereenkomst.
- Geen meldplicht- of uitwijktoezegging op deze pagina.
- Geen geauditeerd accuratessepercentage. De ene benchmark op deze pagina is intern en één dataset.

Vereist uw proces een van deze punten op schrift, breng het dan op in de demo. Er is hoe dan ook een echt antwoord.

### Neem de lastige vragen mee naar de demo

De lijst hierboven is bewust weinig flatteus. Blokkeert iets daarvan u, dan ontdekt u dat liever in dertig minuten.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **AI-governance en gegevensverwerking** — Hoe documenten worden verwerkt, wat de menselijke toets doet, en wat Factum niet claimt.

---

## Partnerships  (/partnerships)

### Meer mandaten dan uw team kan lezen

U behoudt de relatie en het oordeel. Wij draaien de analyse over alle disciplines erachter, onder uw naam.

→ Plan een demo

### Voor wie dit doorgaans werkt

Beschreven naar het type kantoor, nooit bij naam.

#### Corporate-finance-boutiques

Buy- en sell-side processen waar de analytische belasting de beperking is.

#### Exit- en waardecreatieadviseurs

Eigenaren die twee tot vijf jaar voor hun exit staan en eerst een verdedigbare nulmeting nodig hebben.

#### Herstructurerings- en turnaroundpraktijken

Waar een onafhankelijke doorlichting snel moet komen en de toetsing van financiers moet doorstaan.

#### PE- en buy-side-adviseurs

Concurrerende processen op een strakke klok, waar de analyse alsnog een investeringscomité moet doorstaan.

### U houdt de relatie. Wij leveren de slag.

Hetzelfde platform, alle disciplines, dezelfde toetsing. Geleverd onder uw naam.

U houdt

- De klantrelatie en het mandaat
- Het adviesoordeel en de aanbeveling
- De commerciële voorwaarden met uw klant
- De regie over wat er onder uw naam wordt opgeleverd

Wij leveren

- De volledige slag over de dataroom, elke discipline
- Disciplineoverstijgende afstemming als vaste stap
- Bevindingen gekoppeld aan een document en een passage, elke keer
- Een beoordelaar met naam die achter de output staat

Grens

### Hoe een partnership echt begint

Met één echte opdracht, goed uitgevoerd, voordat iemand zich ergens aan bindt.

#### Een demo, en een blik op je pijplijn

We laten het platform zien en brengen daarna in kaart hoe uw opdrachten eruitzien en waar de analytische last zit. Dertig minuten.

#### Eén mandaat, van begin tot eind gedraaid

Eén lopende opdracht, dezelfde beoordelingstoets. U ziet de output voordat u iets tekent.

#### Voorwaarden gevormd naar wat er gebeurd is

Scope, prijs en werkritme bepaald aan de hand van een echte oplevering. Een eerste opzet van een partnership.

### Wat een partnership niet omvat

Sommige hiervan zijn toezeggingen aan bestaande partners. De rest is de eerlijke stand van een pre-launch bedrijf.

- Geen white-label claim van certificering of audit. We kunnen niet achter een keurmerk staan dat we niet hebben.
- Geen onbeperkte capaciteit. Een partnership dat de beoordelingstoets voorbijloopt is erger dan geen partnership.
- Geen algemeen beleid voor verwijsvergoedingen. Waar assurance- of onafhankelijkheidsregels gelden, wordt dat per relatie getoetst.
- Geen aanspraak op uw klant. Niets wat wij voor u draaien wordt een casestudy zonder uw schriftelijke akkoord.
- Geen conflicterend mandaat waar we ons al exclusief hebben vastgelegd. Waar exclusiviteit bestaat, zeggen we dat.

### Wat partners als eerste vragen

#### Werken jullie ook rechtstreeks met eigenaren?

Ja. Waar dat met uw markt kan overlappen, zeggen we dat voordat het een probleem wordt.

#### Wiens naam staat op het rapport?

Dat wordt bij het eerste mandaat bepaald. Beide modellen bestaan: opgeleverd onder uw naam met Factum als engine, of samen opgeleverd.

#### Kunnen jullie ook maar een deel van de scope draaien?

De volledige slag ligt vast, omdat de waarde in de afstemming tussen disciplines zit. Wat varieert, is de diepgang van de uitwerking.

#### Hoe exclusief is dit?

Exclusiviteit is mogelijk in een afgebakend segment, en het is een echte toezegging als we die doen.

### Begin met één mandaat

Richt het op een lopende opdracht en lees de output.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **Diligencecapaciteit voor adviseurs** — Analytische capaciteit op diligence-niveau achter uw eigen klantrelaties.

---

## Team  (/team)

### De mensen achter de output

Wouter structureerde acquisitie- en leveraged finance bij ING. Daniel bouwt gereguleerde datapijplijnen. Een van beiden keurt elke output goed.

→ Plan een demo

#### Wouter Dijkman

Oprichter, Factum

Meer dan vijf jaar binnen de instellingen die deze deals financieren. Bij ING: Acquisition & Leveraged Finance, waar hij het krediet achter precies dit soort transacties structureerde en toetste. Daarvoor financiële herstructurering bij Rabobank. Daarnaast leidt hij Agentic Mindshift, zijn eigen AI-consultancy.

- Factum Capital — Oprichter, 2026 —
- Agentic Mindshift — Oprichter, AI-consultancy, 2025 —
- ING — Acquisition & Leveraged Finance, 2023 – 2025
- Rabobank — Specialist Financial Restructuring, 2020 – 2023
- Alter Domus — Legal Officer, 2019 – 2020

#### Daniel Dropuljic

Technical Lead, Factum

Daniel bouwt de systemen achter de diligence-engine van Factum. Als oprichter van Dandro Solutions ontwerpt hij datapipelines die meer dan 50.000 records per dag verwerken voor internationale zorgklanten, onder de AVG en FHIR.

- Dandro Solutions — Oprichter, software engineering, 2021 —
- Healex, Berlijn — HL7/FHIR-implementatie, leidde een team van drie, 2019 – 2021
- Uniklinik Köln — Onderzoeksdata-infrastructuur, 2019
- Furore, Amsterdam — Data engineering, 2018

Achtergrond

Dezelfde strengheid, gericht op de deal die voor u ligt.

### Wie tekent waarvoor

Twee mensen, en geen pool analisten erachter.

#### Wouter Dijkman

Bepaalt de scope met jou en keurt elke bevinding goed voordat die de deur uitgaat. Niets bereikt je ongelezen.

#### Daniel Dropuljic

Beheert de infrastructuur: EU-hosting, zero-retention-routering en de bewaarinstelling bij elke provider.

#### Verder niemand

Geen offshoreteam, geen wisselende juniors. Is een mandaat groter dan twee mensen en het platform, dan zeggen we dat voordat je tekent.

### U spreekt de persoon die de output beoordeelt

Zolang Factum pre-launch is, zijn de demo, de beoordelingstoets en de doorloop dezelfde persoon.

→ Plan een demo

Dertig minuten: eerst het platform, dan uw eigen situatie.

*Google-resultaat:* **Het team achter Factum** — Een leveraged-finance bankier en een data-engineer. Een van beiden keurt elke output goed.

---

## Contact  (/contact)

### Plan een demo met de persoon die de output beoordeelt

Geen formulier. Kies een vrij moment in de agenda en we laten het platform draaien zien.

→ Plan een demo

### Plan dertig minuten

Eerst een rondleiding door het platform, dan uw eigen situatie. Is dit niet het juiste instrument, dan is dat een sneller antwoord dan een voorstel.

→ Plan een demo

Kies een vrij moment.

### Stuur geen documenten om een demo te plannen

Voordat u iets stuurt

Voor de demo is niets nodig behalve het gesprek. Toegang tot documenten spreken we daarna schriftelijk af.

Wat we bespreken

- Waar u staat in de cyclus: kopen, financieren, houden of verkopen.
- Wat er vandaag in de dataroom zit, en wat ontbreekt.
- Welke disciplines het echte risico dragen in uw situatie.
- Of een sprint bij uw situatie past, of dat het te vroeg is.
- Wat het zou kosten, afgebakend tegen de werkelijke room.

### Wat mensen vragen voordat ze plannen

#### Moet ik iets voorbereiden?

Nee. Heb je een lopende deal, neem die mee. Zo niet, dan draaien we de demo op een geconstrueerde dataroom.

#### Met wie spreek ik?

Wouter Dijkman. Factum is pre-launch, dus wie de demo geeft is ook wie elke bevinding goedkeurt.

#### We zitten al midden in een traject met een adviseur. Te laat?

Meestal niet. Een sprint loopt mee als tweede lezing, of op de disciplines waarvoor niemand is ingehuurd.

#### Wat gebeurt er met wat ik in de demo vertel?

Dat blijft vertrouwelijk, vanaf het eerste bericht. Er gaan geen documenten heen en weer voordat een NDA is getekend.

### Met wie u te maken heeft

*Entiteit*

Agentic Mindshift Consultancy, Nederland. Factum Capital is de handelsnaam tot de oprichting rond is.

*Kamer van Koophandel*

*Werktalen*

Engels en Nederlands

*Google-resultaat:* **Plan een demo** — Plan een demo van dertig minuten met de persoon die elke output beoordeelt.

---

## Privacy  (/privacy)

### Wat deze site verzamelt, en wat een opdracht doet

Deze pagina gaat over de website. De gegevensverwerking binnen een opdracht is geregeld in de overeenkomst die we tekenen.

Voor het laatst beoordeeld op 5 augustus 2026.

#### Deze website

- Geen contactformulier, geen accountsysteem, geen login. Er is hier niets te versturen.
- Uw taal komt uit de URL waarop u zich bevindt. Geen cookie, geen detectie via IP.
- Bezoeken worden geteld met Plausible Analytics: geen cookie, geen fingerprint, geen profiel over websites heen, data binnen de EU. Geregistreerd worden pagina, verwijzende site, land en apparaattype.
- Voor die telling wordt niets op uw apparaat gezet. Daarom staat er geen cookiebanner op deze site.

#### Een demo plannen

- De boekingslink brengt u naar Cal.com, een externe planningsdienst. Wat u daar invult, wordt onder hun voorwaarden verwerkt en met ons gedeeld zodat we de afspraak kunnen houden.
- We gebruiken die informatie om de demo voor te bereiden en op te volgen. We voegen die niet toe aan een marketinglijst.

#### Documenten die u met ons deelt

- Er worden geen documenten via deze website gedeeld. Toegang wordt apart en schriftelijk afgesproken.
- Tijdens een opdracht worden vertrouwelijke gegevens gepseudonimiseerd vóór de analyse en pas in de uiteindelijke output teruggezet. De analyse draait op Google Vertex AI in een EU-regio onder een verwerkersovereenkomst. De modelaanbieder bewaart uw documenten niet en traint er niet op.
- Bewaar- en verwijdertermijnen aan onze eigen kant staan in de opdrachtovereenkomst.

#### Uw rechten

- Op grond van de AVG kunt u vragen welke persoonsgegevens we van u hebben, deze laten corrigeren of verwijderen, of bezwaar maken tegen het gebruik. Breng het op in de demo of reageer op een e-mail van ons.
- Bent u niet tevreden, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens, de Nederlandse toezichthouder voor gegevensbescherming.

#### Wijzigingen

- Deze pagina verandert naarmate Factum uit de pre-launchfase komt. De beoordelingsdatum bovenaan laat zien hoe actueel de pagina is.

De verwerkingsverantwoordelijke is Agentic Mindshift Consultancy, ingeschreven bij de Kamer van Koophandel onder nummer 99495945 en handelend onder de naam Factum Capital. Deze pagina is een samenvatting in gewone taal.

*Google-resultaat:* **Privacy** — Hoe deze website en onze opdrachten omgaan met persoonsgegevens.

---

## Blokken die op meer dan één pagina staan

Deze tekst staat op meerdere pagina's. Eén keer aanpassen verandert hem overal.

#### Financieel

De EBITDA in het informatiememorandum is genormaliseerd door de verkoper.

U ziet welke correcties standhouden, welke niet, en wat dat met de prijs doet.

#### Commercieel

Omzetconcentratie staat zelden in de samenvatting.

Welke klanten de omzet dragen, op welke voorwaarden, en wie er weg kan lopen.

#### Juridisch

Change-of-control-clausules zitten in de bijlagen die niemand uitleest.

Elke clausule die op de transactie zelf afgaat, met artikelnummer en pagina.

#### Fiscaal

Een fiscale positie die niet houdt, meldt zich pas jaren later.

Waar de structuur risico draagt, en wat daarvoor in de koopovereenkomst hoort.

#### HR

Sleutelpersoneel vertrekt na closing, en de earn-out hing eraan.

Wie contractueel vastzit, wie niet, en wat pensioen en cao werkelijk kosten.

#### Technologie (IT & AI)

Technische schuld staat op geen enkele balans, en “AI-gedreven” is meestal een licentie op het model van iemand anders.

Wat er echt draait, wat herstel kost, en wat onder de AI Act valt.

#### ESG

Rapportageverplichtingen verhuizen mee naar de koper.

Wat er straks gerapporteerd moet worden, en wat dat aan investering vraagt.

#### Operationeel

Marge lekt weg in processen die niemand in cijfers heeft gezet.

Waar de marge weglekt, en welke hefbomen na closing echt bestaan.

#### Waardering

Het bod komt uit een model dat de bevindingen nog niet kende.

Wat de bevindingen samen met de prijs doen, doorgerekend in plaats van aangenomen.

### Outputcontract — elke bevinding

Het schema waaraan elke bevinding moet voldoen. Achter elke bevinding een document, een passage en een benoemde reviewer — maanden later nog te openen.

- Module
- Bevinding
- Letterlijk citaat
- Brondocument en passage
- Menselijke beoordeling

- Vooraf afgebakend, één uit de bibliotheek
- Eén claim, in één zin
- Woordelijk geciteerd
- Bestandsnaam en pagina
- Vereist vóór vrijgave

→ +2 velden, op een breder scherm

#### Analyse gehost in de EU

Alle analyse draait op Google Vertex AI in een EU-regio, onder een verwerkersovereenkomst.

#### Zero retention bij de modelaanbieder

De modelaanbieder bewaart uw documenten niet en traint er niet op.

#### Gepseudonimiseerd vóór verwerking

Vertrouwelijke gegevens worden gepseudonimiseerd vóór de analyse. Pas in de uiteindelijke output teruggezet.

#### Eén aanspreekpunt dat verantwoordelijk is

Een persoon met naam beoordeelt elke output voordat die u bereikt.

- Financial DD
- Commercial DD
- HR DD
- Technologie DD
- ESG DD
- Operational DD
- IM-screener
- Vigil-monitoring
- Tax DD
- Legal DD
- Deal economics
- Waardering
- Portefeuillebeheer
- Post-merger integratie
- Vendor due diligence
- IC-memo
- Teaser / CIM
- Financieringsmemorandum
- Documentfabriek
- Exit readiness
- Portefeuillegezondheid
- IC-rapport

#### Onafhankelijke reads

Deze modules hebben niets bovenstrooms nodig. Ze starten allemaal tegelijk.

#### Afhankelijke reads

Fiscaal en juridisch kunnen pas redeneren met de eerste golf in handen.

#### Synthese

Waardering, deal economics en portefeuille lezen alles daarvoor.

#### Deliverables

De documenten die u krijgt, samengesteld uit de golven hierboven.

#### Na closing

Monitoring en rapportage. Loopt op een eigen klok, na de deal.

ZDR

Zero-retention routing afgedwongen. Zonder die route start de run niet.

*modules*

Bevinding

Document

Doorlopend

*Dataroom*

TargetCo — Raamovereenkomst, p. 14

Geciteerde passage

*De bevinding die eruit volgde*

Een geconstrueerd voorbeeld op een fictieve target. Hier staat geen cliëntdocument. Uw mandaat levert dezelfde vijf velden, op uw eigen dataroom.

Afnemer kan deze overeenkomst opzeggen met een schriftelijke termijn van dertig (30) dagen bij een wijziging van zeggenschap over Leverancier.

Illustratief

Contracten — change of control

De grootste klant van TargetCo kan weglopen op de transactie zelf, met dertig dagen opzegtermijn en zonder afkoopsom.

Artikel 14.2, links volledig geciteerd.

TargetCo — Raamovereenkomst met Klant A, pagina 14.

Vrijgegeven door W. Dijkman.

Drie materiële bevindingen die uw team nog niet had, of de opdracht is gratis — bij pilotmandaten.

### De bevindingengarantie

Drie materiële bevindingen die uw eigen team nog niet had geïdentificeerd, of de opdracht is gratis.

Voor pilotmandaten. Wij dragen het risico dat dit vroeg is, niet u.

- Hoe documenten worden behandeld
- Hoe het platform werkt
- Wat de sprint dekt
- De methode, van begin tot eind
- Wat AI niet kan
- Plan een demo

De read van de koper eerst op uw eigen dossier draaien: zo ziet een goed geleid proces eruit.

---

## Menu en footer

- Hoofdnavigatie
- Platform
- Diligence Sprint
- De methode
- Grenzen van AI
- Governance
- Team
- Partnerships
- Contact
- Plan een demo
- Menu openen
- Menu sluiten

AI due diligence voor M&A en private equity. Elke bevinding verwijst naar een document. Elke output beoordeeld door een met naam genoemd persoon.

Sitemap

Achtergrond

Bedrijf

Privacy

KvK 99495945

© 2026 Factum Capital. Pre-launch.
