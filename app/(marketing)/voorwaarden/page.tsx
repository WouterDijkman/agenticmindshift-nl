import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description:
    'Algemene voorwaarden voor opdrachten en gebruik van de website van Agentic Mindshift.',
};

export default function VoorwaardenPage() {
  return (
    <section className="container-narrow py-20">
      <p
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
      >
        Juridisch
      </p>
      <h1 className="text-4xl sm:text-5xl mb-3">Algemene voorwaarden</h1>
      <p className="mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
        Laatste wijziging: 13 mei 2026
      </p>

      <div
        className="flex flex-col gap-6 text-base"
        style={{ color: 'var(--text-tertiary)', lineHeight: 1.7 }}
      >
        <h2 className="text-xl mt-4">1. Definities</h2>
        <p>
          In deze voorwaarden wordt verstaan onder &quot;Agentic Mindshift&quot;: de
          eenmanszaak van Wouter Dijkman, gevestigd in Nederland. Onder
          &quot;opdrachtgever&quot; wordt verstaan de natuurlijke of rechtspersoon die
          een opdracht verstrekt of gebruikmaakt van de website of scorecard.
        </p>

        <h2 className="text-xl mt-4">2. Toepasselijkheid</h2>
        <p>
          Deze voorwaarden zijn van toepassing op elk gebruik van de website
          agenticmindshift.nl, op de Portfolio Intelligence Scorecard, en op alle
          opdrachten waarbij Agentic Mindshift als opdrachtnemer optreedt. Afwijkingen
          gelden alleen indien schriftelijk overeengekomen.
        </p>

        <h2 className="text-xl mt-4">3. Aard van de opdracht</h2>
        <p>
          Opdrachten worden uitgevoerd als inspanningsverplichting, tenzij uitdrukkelijk
          anders overeengekomen. De scorecard biedt een diagnostisch hulpmiddel en geen
          investerings- of financieel advies. De inhoud van rapporten en sparring-
          sessies vormt geen advies in de zin van de Wet op het financieel toezicht.
        </p>

        <h2 className="text-xl mt-4">4. Tarieven en betaling</h2>
        <p>
          Tarieven zijn vermeld op de pagina &quot;Werkwijze&quot; en gelden exclusief
          btw, tenzij anders aangegeven. Facturatie geschiedt maandelijks vooraf voor
          retainer-trajecten en bij oplevering voor projecten. Betalingstermijn: dertig
          dagen netto.
        </p>

        <h2 className="text-xl mt-4">5. Annulering en opzegging</h2>
        <p>
          Retainer-trajecten kennen een minimumlooptijd van zes maanden en zijn daarna
          maandelijks opzegbaar met een opzegtermijn van eveneens een maand. AI Due
          Diligence-trajecten kunnen tot drie werkdagen na opdrachtbevestiging kosteloos
          worden geannuleerd. Workshops zijn niet annuleerbaar binnen tien werkdagen
          voor de afgesproken datum.
        </p>

        <h2 className="text-xl mt-4">6. Aansprakelijkheid</h2>
        <p>
          De aansprakelijkheid van Agentic Mindshift is beperkt tot het factuurbedrag
          van de betreffende opdracht over een periode van maximaal drie maanden, met
          een maximum van 25.000 euro. Aansprakelijkheid voor indirecte schade,
          gevolgschade, gederfde winst of gemiste IRR is uitgesloten.
        </p>

        <h2 className="text-xl mt-4">7. Vertrouwelijkheid</h2>
        <p>
          Alle informatie die in het kader van een opdracht of sparring-sessie wordt
          gedeeld wordt vertrouwelijk behandeld. Dit geldt zonder einddatum.
          Geaggregeerde, niet-herleidbare data kan worden gebruikt om peer-benchmarks
          te verbeteren.
        </p>

        <h2 className="text-xl mt-4">8. Intellectueel eigendom</h2>
        <p>
          Rapporten, frameworks en analyses blijven intellectueel eigendom van Agentic
          Mindshift, tenzij anders overeengekomen. De opdrachtgever verkrijgt een
          niet-overdraagbaar gebruiksrecht voor intern gebruik.
        </p>

        <h2 className="text-xl mt-4">9. Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden en op alle opdrachten is Nederlands recht van toepassing.
          Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement
          van vestiging.
        </p>
      </div>
    </section>
  );
}
