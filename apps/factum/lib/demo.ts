import { DEMO_EXPECTED, DEMO_FINDINGS, type DemoCopy } from './demoData';
import { DEMO_DE } from './demo.de';
import { DEMO_ES } from './demo.es';
import { DEMO_PT } from './demo.pt';

/**
 * Copy for the /platform demo. English and Dutch here; German, Spanish and
 * Portuguese in demo.de.ts, demo.es.ts and demo.pt.ts. Numbers, documents and
 * the German quotes live in demoData.ts and are the same in every locale.
 *
 * Why a typed module and not messages/*.json: the demo is nested data (eight
 * findings, each with reasoning, calculation labels and references) that has
 * to line up with demoData.ts line by line. getDemo() checks that alignment
 * at build, so a missing label fails static generation instead of rendering a
 * blank operand.
 *
 * Rules for whoever edits this:
 *  - Every amount in prose must match demoData.ts, which matches the
 *    generator scripts. Change the data there first.
 *  - No product claim beyond the site copy and GTM/config/product-facts.md.
 *    The demo shows the format, not a performance figure.
 *  - `[n]` is a source reference and must survive translation.
 */

const EN: DemoCopy = {
  chrome: {
    screenLabel: 'Factum review workspace, constructed example',
    badge: 'Constructed example',
    back: 'Portfolio',
    dealNote: 'Fictional company · {docs} documents in the data room',
    stations: ['Set up dossier', 'Review', 'Report to client'],
    waiting: '{n} findings await your decision',
    decidedAll: 'Every finding has a decision',
    railLabel: 'Disciplines',
    domains: { financial: 'Financial', legal: 'Legal', tax: 'Tax', commercial: 'Commercial' },
    railOpen: '{n} open',
    railDone: 'decided',
    missingTab: 'Missing documents',
    missingCount: '{n} missing',
    severity: { critical: 'Critical', high: 'High', medium: 'Medium' },
    counter: '{i} of {n}',
    prev: 'Previous finding',
    next: 'Next finding',
    fields: {
      module: 'Module',
      finding: 'Finding',
      why: 'Why a finding',
      observed: 'Observed',
      standard: 'Standard',
      application: 'Application',
      excerpt: 'Verbatim excerpt',
      severity: 'Severity',
      calc: 'Calculation',
      source: 'Source and location',
      review: 'Human review'
    },
    excerptMarked: 'Marked in the source, {loc}',
    excerptExact: 'Word for word from the document',
    calcNote: 'Every operand cites its source.',
    review: {
      pending: 'Awaiting your reviewer. Nothing reaches the client before sign-off.',
      approved: 'Approved by your reviewer.',
      adjusted: 'Adjusted and approved by your reviewer.',
      investigate: 'Sent for investigation: {route}.',
      rejected: 'Rejected: {reason}.'
    },
    decisions: { approve: 'Approve', adjust: 'Adjust', investigate: 'Have it investigated', reject: 'Reject' },
    demoNote: 'Demo only. Nothing is saved.',
    rejectTitle: 'Why reject it?',
    reasons: ['Not supported by the source', 'Not material', 'Duplicate', 'Outside the engagement'],
    investigateTitle: 'How should it be investigated?',
    routes: ['Factum searches further', 'Ask the seller', 'Trace it across all documents'],
    adjustTitle: 'Adjust the finding',
    adjustSave: 'Save adjustment',
    cancel: 'Cancel',
    undo: 'Undo',
    sourceLabel: 'Source',
    schematic: 'Schematic',
    original: 'Original',
    pageOf: 'p. {n} of {total}',
    page: 'p. {n}',
    sheet: 'sheet {s}',
    sourceHint: 'The finding rests on the marked passage. Check it against the original.',
    docLanguage: 'Document language: German',
    missingTitle: 'Missing documents',
    missingLead: 'What a buyer expects in this data room, checked against what arrived.',
    received: 'Received',
    missing: 'Missing',
    footnote:
      'Constructed example. Halvoria Antriebstechnik GmbH and every name, document and number here are fictional. Quotes stay in the document’s language. Decisions are not saved.'
  },
  findings: {
    'FIN-01': {
      title: 'EBITDA 2025 includes a one-off €640,000',
      area: 'Financial · Quality of earnings',
      finding:
        'Reported EBITDA 2025 of €3.22m includes a €640,000 release of a warranty provision. Adjusted EBITDA is €2.58m. The management accounts show no normalisations.',
      observed:
        'The notes call the €640,000 release non-period income [1]. It sits in other operating income of €720,000 [2]. The management accounts list zero normalisations [3]. The IM states there were no one-offs [4].',
      standard:
        'Quality of earnings removes one-off and non-period items from EBITDA. The draft SPA prices the business at 7.76 × EBITDA 2025 from the management accounts [5].',
      application:
        'Adjusted EBITDA is €2.58m, a 10.5% margin against 13.1% in the IM. At the SPA multiple, the release carries about €4.97m of enterprise value.',
      calc: [
        ['EBITDA 2025, reported', 'Release of warranty provision', 'Adjusted EBITDA'],
        ['Adjusted EBITDA', 'Revenue 2025', 'Adjusted EBITDA margin'],
        ['Release of warranty provision', 'SPA multiple', 'Enterprise value carried']
      ]
    },
    'FIN-02': {
      title: 'Covenant breached on adjusted EBITDA: 3.14x against 3.00x',
      area: 'Financial · Net debt and financing',
      finding:
        'On adjusted EBITDA, leverage at 31 December 2025 is 3.14x. §14 of the facility agreement caps it at 3.00x. The compliance certificate reported 2.52x.',
      observed:
        'The compliance certificate reports 2.52 : 1 on EBITDA of €3.22m [4]. That EBITDA includes the €640,000 non-period release [3]. Net debt is €8.1m: bank debt of €8.7m less cash of €0.6m [2].',
      standard:
        '§14.1 caps net debt to EBITDA at 3.00 : 1. §14.2 defines EBITDA net of one-off and non-period income [1]. A breach lets the bank terminate and call the loan [5].',
      application:
        'Adjusted, leverage is 3.14x, above the limit. No waiver is in the data room. §18.2(b) gives the bank a second termination right on the change of control itself [5].',
      calc: [
        ['Liabilities to banks', 'Cash', 'Net debt'],
        ['Net debt', 'Adjusted EBITDA', 'Leverage, adjusted', 'Limit under §14.1'],
        ['Net debt', 'EBITDA as certified', 'Leverage, as certified']
      ]
    },
    'LEG-01': {
      title: 'Largest customer can terminate on the change of control',
      area: 'Legal · Change of control',
      finding:
        'Velmora, 28% of 2025 revenue, may terminate its framework contract after the sale. The seller’s Q&A answer names only the bank.',
      observed:
        '§21 lets Velmora terminate within six months of the change-of-control notice, on three months’ notice, without compensation [1]. Velmora took €6.9m, 28% of 2025 revenue [2]. Asked about change-of-control clauses, the seller answered that only the bank has one [3].',
      standard:
        'A right the deal itself triggers belongs in the SPA: as a closing condition, a specific indemnity or a price adjustment.',
      application:
        'The draft SPA has none of these. Its only closing condition is merger clearance [4]. The contract contradicts the Q&A answer.',
      calc: [['Velmora revenue 2025', 'Revenue 2025', 'Share of revenue']]
    },
    'LEG-02': {
      title: 'Plant lease ends mid-2027; the landlord ties consent to a new lease',
      area: 'Legal · Real estate',
      finding:
        'The lease of the Bamberg plant ends on 30 June 2027, with no option to extend. The share sale needs the landlord’s prior written consent. He offers it only with a ten-year extension at €890,000 a year.',
      observed:
        'The lease ends on 30 June 2027 without an extension option [2]. A transfer of more than 50% of the shares needs prior written consent. Without it, the landlord may terminate without notice [1]. His letter of 2 September 2026 sets the terms for both [3].',
      standard: 'Consent must be in hand before closing. The IM says the lease will be extended [6].',
      application:
        'Rent rises from €684,000 to €890,000 a year [4], before indexation. The paint line’s permit is tied to this site. A move needs a new permit, typically 9 to 14 months [5].',
      calc: [
        ['Rent demanded', 'Current rent', 'Increase per year'],
        ['Increase per year', 'Term demanded (years)', 'Increase over the term']
      ]
    },
    'TAX-01': {
      title: 'Fiscal unity under audit, with no tax indemnity',
      area: 'Tax · Fiscal unity (Organschaft)',
      finding:
        'The 2024 profit transfer was paid only on 15 January 2026. A tax audit of 2022–2024 starts on 2 November 2026 and targets the fiscal unity. The draft SPA gives no indemnity if it fails.',
      observed:
        'The vendor tax fact book says the fiscal unity was carried out in every year. It then notes the 2024 transfer was paid on 15 January 2026 [1]. The tax office audits 2022–2024 from 2 November 2026, with actual performance of the fiscal unity as a focus [2].',
      standard:
        'A fiscal unity holds only if the profit transfer agreement is actually performed for its five-year minimum term [3][6]. The draft SPA terminates the agreement at closing and gives no indemnity for a retroactive failure [4].',
      application:
        'Closing is planned for 30 November 2026 [5], one month before the minimum term ends. If the audit rejects the fiscal unity, the target can be taxed on its own income for those years. Under this draft, the buyer carries that.'
    },
    'TAX-02': {
      title: 'Management fee up 75% with no transfer pricing support',
      area: 'Tax · Transfer pricing',
      finding:
        'The monthly fee to the seller rose from €20,000 to €35,000, with no service record or transfer pricing analysis. The tax audit targets it. The draft SPA lets it run until closing as permitted leakage.',
      observed:
        'The agreement sets €35,000 a month, up from €20,000 until 2024. It states that no service record or transfer pricing analysis exists [1]. The audit order names management fees as a focus [2].',
      standard:
        'Fees between related parties need an arm’s-length basis the company can document. The SPA allows management fees of up to €35,000 a month as permitted leakage [3].',
      application:
        'Without documentation, the tax office can treat part of the fee as a hidden profit distribution. From the locked-box date [4] to the planned closing [5], up to €385,000 leaves the target this way.',
      calc: [
        ['Fee per month, from 2025', 'Fee per month, until 2024', 'Increase per month', 'Months', 'Increase per year'],
        ['Fee per month', 'Months, locked box to closing', 'Permitted leakage until closing']
      ]
    },
    'COM-01': {
      title: 'Largest customer: a 3% price cut every year and falling orders',
      area: 'Commercial · Customers and pricing',
      finding:
        'Velmora, 28% of revenue, receives a 3% price reduction every year from 2026. Its orders were 4%, 8% and 12% below the prior year in Q1 to Q3 2026. The 2026 plan still grows revenue by 6.9%.',
      observed:
        '§9.3 grants Velmora a 3% annual reduction on all part prices from 1 January 2026 [1]. The quarterly reports show Velmora orders down 4% [5], 8% [6] and 12% [2]. The Q3 report cites the price cut and a shift to a second supplier [2].',
      standard:
        'A plan is credible when it reflects the contracted price terms and current orders of the largest customer.',
      application:
        'At 2025 volumes, the price cut alone costs about €207,000 a year [3]. The plan assumes revenue of €26.3m in 2026 [4], 6.9% above 2025 [7].',
      calc: [
        ['Velmora revenue 2025', 'Annual price reduction', 'Price effect per year'],
        ['Revenue plan 2026', 'Revenue 2025', 'Planned increase', 'Revenue 2025', 'Planned growth']
      ]
    },
    'COM-02': {
      title: 'Four of the top five customers can leave on six months’ notice',
      area: 'Commercial · Contract base',
      finding:
        'The IM says all top-five customers are on long-term framework contracts. Four of them can terminate on six months’ notice to year-end. Together they carry €8.1m, 32.9% of 2025 revenue.',
      observed:
        'The contracts with Ortelia [1], Brisgau [2], Selvan [3] and Tremonia [4] run indefinitely and end on six months’ notice to year-end. The IM describes long-term framework contracts with all top-five customers [5].',
      standard:
        'Revenue counts as contracted only for the term a customer is bound. The customer list gives the revenue per customer [6].',
      application:
        'Only Velmora is bound until 2028 [8], and it can terminate on the change of control. The other four carry €8.1m on six months’ notice.',
      calc: [
        ['Ortelia', 'Brisgau', 'Selvan', 'Tremonia', 'Revenue on six months’ notice'],
        ['Revenue on six months’ notice', 'Revenue 2025', 'Share of revenue']
      ]
    }
  },
  expected: [
    { label: 'Annual accounts 2024 and 2025 (HGB)' },
    { label: 'Management accounts and plan' },
    { label: 'Facility agreement, full version', note: 'Only an extract is in the room.' },
    { label: 'Covenant waiver or bank correspondence on 2025', note: 'Needed to close the covenant finding.' },
    { label: 'Customer contracts, top five' },
    { label: 'Lease and landlord correspondence' },
    { label: 'Licence agreement, patent EP 3 412 118', note: 'The managing director holds the patent personally.' },
    { label: 'Data processing agreement, IT hosting', note: 'Not attached to the outsourcing contract.' },
    { label: 'Draft SPA' },
    { label: 'Profit transfer agreement' },
    { label: 'Tax assessments 2022–2024' },
    { label: 'Transfer pricing documentation, management fee', note: 'The fee agreement says none exists.' }
  ]
};

const NL: DemoCopy = {
  chrome: {
    screenLabel: 'Factum-beoordelingswerkplek, geconstrueerd voorbeeld',
    badge: 'Geconstrueerd voorbeeld',
    back: 'Portfolio',
    dealNote: 'Fictief bedrijf · {docs} stukken in de data room',
    stations: ['Dossier inrichten', 'Beoordelen', 'Rapport aan de klant'],
    waiting: '{n} bevindingen wachten op uw besluit',
    decidedAll: 'Elke bevinding heeft een besluit',
    railLabel: 'Disciplines',
    domains: { financial: 'Financieel', legal: 'Juridisch', tax: 'Fiscaal', commercial: 'Commercieel' },
    railOpen: '{n} open',
    railDone: 'besloten',
    missingTab: 'Ontbrekende stukken',
    missingCount: '{n} ontbreken',
    severity: { critical: 'Kritiek', high: 'Hoog', medium: 'Middel' },
    counter: '{i} van {n}',
    prev: 'Vorige bevinding',
    next: 'Volgende bevinding',
    fields: {
      module: 'Module',
      finding: 'Bevinding',
      why: 'Waarom een bevinding',
      observed: 'Vastgesteld',
      standard: 'Maatstaf',
      application: 'Toepassing',
      excerpt: 'Letterlijk citaat',
      severity: 'Ernst',
      calc: 'Berekening',
      source: 'Bron en vindplaats',
      review: 'Menselijke beoordeling'
    },
    excerptMarked: 'Gemarkeerd in de bron, {loc}',
    excerptExact: 'Woordelijk uit het stuk',
    calcNote: 'Elke operand noemt zijn bron.',
    review: {
      pending: 'Wacht op uw reviewer. Niets gaat naar de klant vóór aftekening.',
      approved: 'Goedgekeurd door uw reviewer.',
      adjusted: 'Aangepast en goedgekeurd door uw reviewer.',
      investigate: 'Uitgezet voor onderzoek: {route}.',
      rejected: 'Afgewezen: {reason}.'
    },
    decisions: { approve: 'Goedkeuren', adjust: 'Aanpassen', investigate: 'Laten onderzoeken', reject: 'Afwijzen' },
    demoNote: 'Alleen een demo. Er wordt niets opgeslagen.',
    rejectTitle: 'Waarom afwijzen?',
    reasons: ['Niet onderbouwd door de bron', 'Niet materieel', 'Dubbel', 'Buiten de opdracht'],
    investigateTitle: 'Hoe laten onderzoeken?',
    routes: ['Factum zoekt verder', 'Vraag aan de verkoper', 'Natrekken in alle stukken'],
    adjustTitle: 'Bevinding aanpassen',
    adjustSave: 'Aanpassing opslaan',
    cancel: 'Annuleren',
    undo: 'Ongedaan maken',
    sourceLabel: 'Bron',
    schematic: 'Schema',
    original: 'Origineel',
    pageOf: 'blz. {n} van {total}',
    page: 'blz. {n}',
    sheet: 'blad {s}',
    sourceHint: 'De bevinding rust op de gemarkeerde passage. Leg hem naast het origineel.',
    docLanguage: 'Taal van het stuk: Duits',
    missingTitle: 'Ontbrekende stukken',
    missingLead: 'Wat een koper in deze data room verwacht, naast wat er binnenkwam.',
    received: 'Ontvangen',
    missing: 'Ontbreekt',
    footnote:
      'Geconstrueerd voorbeeld. Halvoria Antriebstechnik GmbH en alle namen, stukken en cijfers hier zijn verzonnen. Citaten blijven in de taal van het stuk. Besluiten worden niet opgeslagen.'
  },
  findings: {
    'FIN-01': {
      title: 'EBITDA 2025 bevat eenmalig €640.000',
      area: 'Financieel · Kwaliteit van de winst',
      finding:
        'De gerapporteerde EBITDA 2025 van €3,22 mln bevat een vrijval van een garantievoorziening van €640.000. De genormaliseerde EBITDA is €2,58 mln. De managementrapportage toont geen normalisaties.',
      observed:
        'De toelichting noemt de vrijval van €640.000 een niet-periodegebonden bate [1]. Hij zit in de overige bedrijfsopbrengsten van €720.000 [2]. De managementrapportage telt nul normalisaties [3]. Het IM meldt geen eenmalige posten [4].',
      standard:
        'Kwaliteit van de winst haalt eenmalige en niet-periodegebonden posten uit de EBITDA. Het concept-SPA prijst het bedrijf op 7,76 × EBITDA 2025 uit de managementrapportage [5].',
      application:
        'De genormaliseerde EBITDA is €2,58 mln, een marge van 10,5% tegen 13,1% in het IM. Tegen de SPA-multiple draagt de vrijval zo’n €4,97 mln ondernemingswaarde.',
      calc: [
        ['EBITDA 2025, gerapporteerd', 'Vrijval garantievoorziening', 'Genormaliseerde EBITDA'],
        ['Genormaliseerde EBITDA', 'Omzet 2025', 'Genormaliseerde EBITDA-marge'],
        ['Vrijval garantievoorziening', 'SPA-multiple', 'Gedragen ondernemingswaarde']
      ]
    },
    'FIN-02': {
      title: 'Convenant geschonden op genormaliseerde EBITDA: 3,14x tegen 3,00x',
      area: 'Financieel · Netto schuld en financiering',
      finding:
        'Op genormaliseerde EBITDA is de leverage per 31 december 2025 3,14x. §14 van de kredietovereenkomst legt de grens op 3,00x. De compliance-verklaring meldde 2,52x.',
      observed:
        'De compliance-verklaring meldt 2,52 : 1 op een EBITDA van €3,22 mln [4]. Die EBITDA bevat de niet-periodegebonden vrijval van €640.000 [3]. De netto schuld is €8,1 mln: €8,7 mln bankschuld min €0,6 mln kas [2].',
      standard:
        '§14.1 begrenst netto schuld/EBITDA op 3,00 : 1. §14.2 definieert EBITDA zonder eenmalige en niet-periodegebonden baten [1]. Bij schending mag de bank opzeggen en de lening opeisen [5].',
      application:
        'Genormaliseerd is de leverage 3,14x, boven de grens. Er zit geen waiver in de data room. §18.2(b) geeft de bank een tweede opzeggingsrecht bij de overname zelf [5].',
      calc: [
        ['Schulden aan kredietinstellingen', 'Liquide middelen', 'Netto schuld'],
        ['Netto schuld', 'Genormaliseerde EBITDA', 'Leverage, genormaliseerd', 'Grens volgens §14.1'],
        ['Netto schuld', 'EBITDA volgens verklaring', 'Leverage volgens verklaring']
      ]
    },
    'LEG-01': {
      title: 'Grootste klant kan opzeggen bij de overname',
      area: 'Juridisch · Change of control',
      finding:
        'Velmora, 28% van de omzet 2025, mag het raamcontract na de verkoop opzeggen. Het Q&A-antwoord van de verkoper noemt alleen de bank.',
      observed:
        '§21 laat Velmora binnen zes maanden na de melding opzeggen, met drie maanden opzegtermijn en zonder vergoeding [1]. Velmora was goed voor €6,9 mln, 28% van de omzet 2025 [2]. Gevraagd naar change-of-control-clausules antwoordde de verkoper dat alleen de bank er een heeft [3].',
      standard:
        'Een recht dat de deal zelf activeert, hoort in de SPA: als opschortende voorwaarde, specifieke vrijwaring of prijsaanpassing.',
      application:
        'Het concept-SPA heeft geen van drieën. De enige opschortende voorwaarde is goedkeuring door de mededingingsautoriteit [4]. Het contract weerspreekt het Q&A-antwoord.',
      calc: [['Omzet Velmora 2025', 'Omzet 2025', 'Aandeel in de omzet']]
    },
    'LEG-02': {
      title: 'Huur fabriek eindigt medio 2027; verhuurder koppelt toestemming aan nieuwe huur',
      area: 'Juridisch · Vastgoed',
      finding:
        'De huur van de fabriek in Bamberg eindigt op 30 juni 2027, zonder verlengingsoptie. De aandelenverkoop vraagt vooraf schriftelijke toestemming van de verhuurder. Die geeft hij alleen bij een verlenging van tien jaar tegen €890.000 per jaar.',
      observed:
        'De huur eindigt op 30 juni 2027 zonder optie tot verlenging [2]. Overdracht van meer dan 50% van de aandelen vraagt vooraf schriftelijke toestemming. Zonder die toestemming mag de verhuurder direct opzeggen [1]. Zijn brief van 2 september 2026 stelt de voorwaarden voor beide [3].',
      standard: 'De toestemming moet er vóór closing zijn. Het IM stelt dat de huur wordt verlengd [6].',
      application:
        'De huur stijgt van €684.000 naar €890.000 per jaar [4], vóór indexatie. De vergunning van de lakstraat is aan deze locatie gebonden. Verhuizen vraagt een nieuwe vergunning, doorgaans 9 tot 14 maanden [5].',
      calc: [
        ['Gevraagde huur', 'Huidige huur', 'Stijging per jaar'],
        ['Stijging per jaar', 'Gevraagde looptijd (jaren)', 'Stijging over de looptijd']
      ]
    },
    'TAX-01': {
      title: 'Fiscale eenheid onder onderzoek, zonder fiscale vrijwaring',
      area: 'Fiscaal · Fiscale eenheid (Organschaft)',
      finding:
        'De winstafdracht over 2024 is pas op 15 januari 2026 betaald. Een boekenonderzoek over 2022–2024 start op 2 november 2026 en richt zich op de fiscale eenheid. Het concept-SPA geeft geen vrijwaring als die sneuvelt.',
      observed:
        'Het vendor tax fact book stelt dat de fiscale eenheid elk jaar is uitgevoerd. Daarna meldt het dat de afdracht over 2024 op 15 januari 2026 is betaald [1]. Het Finanzamt onderzoekt 2022–2024 vanaf 2 november 2026, met de feitelijke uitvoering van de fiscale eenheid als speerpunt [2].',
      standard:
        'Een fiscale eenheid houdt alleen stand als de winstafdrachtovereenkomst gedurende de minimale looptijd van vijf jaar feitelijk wordt uitgevoerd [3][6]. Het concept-SPA beëindigt de overeenkomst bij closing, zonder vrijwaring voor verlies met terugwerkende kracht [4].',
      application:
        'Closing staat gepland op 30 november 2026 [5], een maand voor het einde van de minimale looptijd. Verwerpt het onderzoek de fiscale eenheid, dan kan de target over die jaren zelf belast worden. Onder dit concept draagt de koper dat.'
    },
    'TAX-02': {
      title: 'Managementfee 75% omhoog zonder verrekenprijsonderbouwing',
      area: 'Fiscaal · Verrekenprijzen',
      finding:
        'De maandelijkse fee aan de verkoper steeg van €20.000 naar €35.000, zonder urenverantwoording of verrekenprijsanalyse. Het boekenonderzoek richt zich erop. Het concept-SPA laat de fee tot closing doorlopen als toegestane leakage.',
      observed:
        'De overeenkomst noemt €35.000 per maand, tot en met 2024 €20.000. Ze stelt dat er geen urenverantwoording of verrekenprijsanalyse is [1]. De onderzoeksaankondiging noemt managementfees als speerpunt [2].',
      standard:
        'Fees tussen gelieerde partijen vragen een zakelijke basis die het bedrijf kan documenteren. De SPA staat managementfees tot €35.000 per maand toe als leakage [3].',
      application:
        'Zonder documentatie kan het Finanzamt een deel van de fee zien als verkapte winstuitdeling. Van de locked-box-datum [4] tot de geplande closing [5] verlaat zo tot €385.000 de target.',
      calc: [
        ['Fee per maand, vanaf 2025', 'Fee per maand, tot en met 2024', 'Stijging per maand', 'Maanden', 'Stijging per jaar'],
        ['Fee per maand', 'Maanden van locked box tot closing', 'Toegestane leakage tot closing']
      ]
    },
    'COM-01': {
      title: 'Grootste klant: elk jaar 3% korting en dalende orders',
      area: 'Commercieel · Klanten en prijzen',
      finding:
        'Velmora, 28% van de omzet, krijgt vanaf 2026 elk jaar 3% prijsverlaging. De orders lagen in Q1 tot Q3 2026 4%, 8% en 12% onder vorig jaar. Het plan 2026 laat de omzet toch 6,9% groeien.',
      observed:
        '§9.3 geeft Velmora vanaf 1 januari 2026 jaarlijks 3% korting op alle onderdeelprijzen [1]. De kwartaalrapporten tonen Velmora-orders 4% [5], 8% [6] en 12% [2] lager. Het Q3-rapport noemt de korting en een verschuiving naar een tweede leverancier [2].',
      standard:
        'Een plan is geloofwaardig als het de contractuele prijsafspraken en de actuele orders van de grootste klant weerspiegelt.',
      application:
        'Bij de volumes van 2025 kost de korting alleen al zo’n €207.000 per jaar [3]. Het plan gaat uit van €26,3 mln omzet in 2026 [4], 6,9% boven 2025 [7].',
      calc: [
        ['Omzet Velmora 2025', 'Jaarlijkse prijsverlaging', 'Prijseffect per jaar'],
        ['Omzetplan 2026', 'Omzet 2025', 'Geplande stijging', 'Omzet 2025', 'Geplande groei']
      ]
    },
    'COM-02': {
      title: 'Vier van de vijf grootste klanten kunnen met zes maanden opzeggen',
      area: 'Commercieel · Contractbasis',
      finding:
        'Het IM zegt dat alle vijf grootste klanten langlopende raamcontracten hebben. Vier van hen kunnen opzeggen met zes maanden tegen het jaareinde. Samen dragen ze €8,1 mln, 32,9% van de omzet 2025.',
      observed:
        'De contracten met Ortelia [1], Brisgau [2], Selvan [3] en Tremonia [4] lopen voor onbepaalde tijd en eindigen met zes maanden opzegging tegen het jaareinde. Het IM spreekt van langlopende raamcontracten met alle top-5-klanten [5].',
      standard:
        'Omzet telt als gecontracteerd voor de periode dat een klant gebonden is. De klantenlijst geeft de omzet per klant [6].',
      application:
        'Alleen Velmora is gebonden tot 2028 [8], en die kan opzeggen bij de overname. De andere vier dragen €8,1 mln op zes maanden opzegging.',
      calc: [
        ['Ortelia', 'Brisgau', 'Selvan', 'Tremonia', 'Omzet op zes maanden opzegging'],
        ['Omzet op zes maanden opzegging', 'Omzet 2025', 'Aandeel in de omzet']
      ]
    }
  },
  expected: [
    { label: 'Jaarrekeningen 2024 en 2025 (HGB)' },
    { label: 'Managementrapportage en plan' },
    { label: 'Kredietovereenkomst, volledige versie', note: 'Alleen een uittreksel zit in de data room.' },
    { label: 'Waiver of bankcorrespondentie over 2025', note: 'Nodig om de convenantbevinding te sluiten.' },
    { label: 'Klantcontracten, top vijf' },
    { label: 'Huurovereenkomst en correspondentie verhuurder' },
    { label: 'Licentieovereenkomst, octrooi EP 3 412 118', note: 'De directeur houdt het octrooi privé.' },
    { label: 'Verwerkersovereenkomst, IT-hosting', note: 'Niet bij het outsourcingcontract gevoegd.' },
    { label: 'Concept-SPA' },
    { label: 'Winstafdrachtovereenkomst' },
    { label: 'Belastingaanslagen 2022–2024' },
    { label: 'Verrekenprijsdocumentatie, managementfee', note: 'De feeovereenkomst zegt dat die er niet is.' }
  ]
};

const DEMO: Record<string, DemoCopy> = { en: EN, nl: NL, de: DEMO_DE, es: DEMO_ES, pt: DEMO_PT };

/**
 * The copy for one locale, checked against demoData.ts. Throws at build when
 * a finding, a calculation label or an expected-document row is missing, or
 * when a reference marker points past the finding's sources.
 */
export function getDemo(locale: string): DemoCopy {
  const copy = DEMO[locale] ?? EN;
  for (const f of DEMO_FINDINGS) {
    const c = copy.findings[f.id];
    if (!c) throw new Error(`demo ${locale}: no copy for ${f.id}`);
    const shape = (f.calc ?? []).map((b) => b.length).join(',');
    const labels = (c.calc ?? []).map((b) => b.length).join(',');
    if (shape !== labels) throw new Error(`demo ${locale}: ${f.id} calc labels ${labels} for lines ${shape}`);
    for (const text of [c.observed, c.standard, c.application]) {
      for (const m of text.matchAll(/\[(\d+)\]/g)) {
        if (Number(m[1]) > f.refs.length) throw new Error(`demo ${locale}: ${f.id} cites [${m[1]}]`);
      }
    }
  }
  if (copy.expected.length !== DEMO_EXPECTED.length) {
    throw new Error(`demo ${locale}: ${copy.expected.length} expected documents for ${DEMO_EXPECTED.length}`);
  }
  return copy;
}
