import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacystatement van Agentic Mindshift. AVG-conform, transparant en beperkt in dataverzameling.',
};

export default function PrivacyPage() {
  return (
    <section className="container-narrow py-20">
      <p
        className="text-xs uppercase mb-4"
        style={{ color: 'var(--accent-primary)', letterSpacing: '0.18em' }}
      >
        Juridisch
      </p>
      <h1 className="text-4xl sm:text-5xl mb-3">Privacystatement</h1>
      <p className="mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
        Laatste wijziging: 13 mei 2026
      </p>

      <div
        className="flex flex-col gap-6 text-base"
        style={{ color: 'var(--text-tertiary)', lineHeight: 1.7 }}
      >
        <p>
          Dit privacystatement legt uit welke persoonsgegevens Agentic Mindshift
          verzamelt, met welk doel, op welke grondslag, hoe lang ze worden bewaard en
          welke rechten u heeft. Het beleid sluit aan op de Algemene Verordening
          Gegevensbescherming (AVG).
        </p>

        <h2 className="text-xl mt-4">1. Verantwoordelijke</h2>
        <p>
          Verantwoordelijke voor de verwerking is Agentic Mindshift, gevestigd in
          Nederland. Contactpersoon: Wouter Dijkman, te bereiken via
          wouter@agenticmindshift.nl.
        </p>

        <h2 className="text-xl mt-4">2. Welke gegevens verzamelen wij</h2>
        <p>
          Wij verzamelen alleen de gegevens die u zelf actief invult: uw naam, zakelijk
          e-mailadres, bedrijfsnaam, functietitel, optioneel telefoonnummer, en uw
          antwoorden op de scorecard. Daarnaast verwerken we technische gegevens als
          IP-adres en user-agent in standaard hostinglogs.
        </p>

        <h2 className="text-xl mt-4">3. Doelen en grondslag</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            Het genereren en versturen van uw persoonlijke scorecard-rapport &mdash;
            uitvoering van overeenkomst.
          </li>
          <li>
            Twee opvolg-e-mails (na drie en zeven dagen) met inhoudelijke reflectie en
            een uitnodiging voor een sparring-sessie &mdash; gerechtvaardigd belang.
          </li>
          <li>
            Het beheren van een wachtlijst voor Factum Capital &mdash; uitvoering van
            overeenkomst dan wel uw uitdrukkelijke toestemming.
          </li>
          <li>
            Het analyseren van geaggregeerde, niet-herleidbare scorecard-uitkomsten ter
            verbetering van peer-benchmarks &mdash; gerechtvaardigd belang.
          </li>
        </ul>

        <h2 className="text-xl mt-4">4. Bewaartermijnen</h2>
        <p>
          Uw scorecard-antwoorden en rapportgegevens bewaren wij maximaal 36 maanden,
          tenzij u verzoekt deze eerder te verwijderen. Wachtlijstgegevens voor Factum
          Capital worden bewaard tot zes maanden na lancering, daarna geanonimiseerd.
        </p>

        <h2 className="text-xl mt-4">5. Verwerkers</h2>
        <p>
          Wij maken gebruik van een beperkt aantal verwerkers: Supabase (Europese
          regio) voor datapersistentie, Resend voor het verzenden van e-mails en een
          Europese hostingpartij voor de website. Met elke verwerker is een
          verwerkersovereenkomst gesloten.
        </p>

        <h2 className="text-xl mt-4">6. Doorgifte buiten de EU</h2>
        <p>
          Standaard worden uw gegevens binnen de Europese Unie opgeslagen en verwerkt.
          Mocht doorgifte buiten de EU plaatsvinden, dan gebeurt dat uitsluitend op
          basis van de standaardcontractbepalingen van de Europese Commissie.
        </p>

        <h2 className="text-xl mt-4">7. Uw rechten</h2>
        <p>
          U heeft het recht op inzage, rectificatie, verwijdering, beperking van
          verwerking, dataportabiliteit en bezwaar. Een verzoek kunt u richten aan
          wouter@agenticmindshift.nl. Daarnaast kunt u een klacht indienen bij de
          Autoriteit Persoonsgegevens.
        </p>

        <h2 className="text-xl mt-4">8. Cookies</h2>
        <p>
          De website maakt uitsluitend gebruik van functionele cookies en lokale opslag
          (localStorage) voor het tussentijds opslaan van uw scorecard-antwoorden. Er
          worden geen trackingcookies of advertentiecookies gebruikt.
        </p>

        <h2 className="text-xl mt-4">9. Wijzigingen</h2>
        <p>
          Wij behouden ons het recht voor dit statement aan te passen. De meest actuele
          versie staat altijd op deze pagina.
        </p>
      </div>
    </section>
  );
}
