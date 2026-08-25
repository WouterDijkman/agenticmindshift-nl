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
