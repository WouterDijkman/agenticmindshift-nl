# Audit productfeiten — factumcapital.eu

Datum: 18 oktober 2026. Werkbranch: `audit/site-feiten-20261018`.

De eenduidige tekstfouten zijn hersteld in alle vijf talen. De canonieke modulegegevens kloppen met de gelezen productcode; de positie van `MODULES` is behouden. TypeScript en een aanvullende offline webpack-productiebuild slagen. De gevraagde standaardbuild met Turbopack kan in deze worktree/sandbox niet worden voltooid; zie de bouwcontrole hieronder. De besluitpunten zijn nog geen goedgekeurde claims.

Er is niets gestaged, gecommit, gemerged, gepusht of uitgerold. Er zijn geen dependencies geïnstalleerd en geen externe netwerkcalls gedaan. De twee bij aanvang aanwezige, ongetrackte `node_modules`-symlinks zijn behouden.

## Reikwijdte en bronnen

Alle 668 berichtwaarden per taal in `apps/factum/messages/{en,nl,de,es,pt}.json` zijn inhoudelijk doorgenomen. Ook gecontroleerd: hun gebruik in pagina’s en componenten, metadata, JSON-LD, navigatie, sitemap, redirects en lokale media. De aanvullende build levert negen inhoudspagina’s per taal op: home, platform, diligence-sprint, pre-sale, governance, limits-of-ai, team, contact en privacy.

De consultancywebsite in `apps/web/` valt buiten deze audit. De historische exports `apps/factum/CONTENT.md` en `CONTENT-NL.md` worden niet door de site ingelezen en gelden niet als gepubliceerde tekst; zie B10. De ingebakken videoteksten zijn apart beoordeeld via lokale frames (steekproeven om de drie seconden) en hun vijf voice-overbronteksten, met de beperkingen bij B08.

Gelezen regels en productbronnen, allemaal lokaal en alleen-lezen buiten deze worktree:

- Repo: `CLAUDE.md` en `AGENTS.md`; projectregels: `/Users/wouter/Documents/Claude/Projects/CLAUDE.md`.
- `/Users/wouter/Documents/Claude/Projects/GTM/config/product-facts.md` en `voice.md`. Het eigen siteregister met em-dashes is gerespecteerd.
- `apps/factum/lib/site.ts`: canonieke aantallen, modulevolgorde en golven.
- Productrepo `/Users/wouter/Documents/Claude/Projects/factum/`: `src/lib/dispatch/module-registry.ts`, `src/lib/agents/graphs/agent-review-graph.ts`, `src/lib/findings/klantgoedkeuring.ts`, `src/lib/config/active-provider.ts`, `src/lib/services/rag/citation-entailment-check.ts`, `src/lib/services/rag/minicheck-client.ts` en relevante delen van `src/lib/services/learned-rules-service.ts`.
- `apps/factum/components/LanguageSwitcher.tsx`, `apps/factum/proxy.ts` en `packages/ui/src/locale.ts`: feitelijk cookiegedrag.
- Video-bronteksten in `/Users/wouter/Documents/Claude/Projects/factum-video/src/scenes/collage/{brand-strings.ts,BrandVersion.tsx,Collage.tsx}` en `public/collage/vo-timing-brian*.json`; alleen gelezen.
- Geïnstalleerde Next.js-documentatie onder `apps/factum/node_modules/next/dist/docs/`: internationalisering, fonts, redirects, Turbopack-root en CLI-buildopties.

Dit verifieert lokale broncode en configuratie, niet de productie-instellingen, leverancierscontracten of externe registraties.

## Canonieke productgegevens

| Gegeven | Gecontroleerde waarde | Bron |
| --- | --- | --- |
| Modules | 9 | `MODULES` / product `MODULE_WAVES` |
| Golven | 6 | `WAVE_COUNT` / product `MODULE_WAVES` |
| Modules per golf | 4, 1, 1, 1, 1, 1 | `WAVE_SIZES` / product `MODULE_WAVES` |
| Klantgerichte disciplines | 8 | `DISCIPLINES`; waardering en dealeconomie samen |
| Modules met verplichte ZDR-routing | 3 | `ZDR_MODULE_COUNT` / product `ZDR_REQUIRED_MODULES` |
| Harde blokkadegronden | 8 | `HARD_BLOCK_COUNT` / acht verschillende `throw new HardBlockError(...)`-redenen |

De dispatchvolgorde is commercieel, HR, operationeel en AI parallel; daarna juridisch, financieel, fiscaal, dealeconomie en waardering. De array blijft positioneel beginnen met `financial` in golf 3: dat is de bestaande labelvolgorde, geen uitvoeringsvolgorde. Alleen een fout commentaar waarin fiscaal nog golf 3 heette, is gecorrigeerd naar golf 4. Geen constantwaarde of modulepositie hoefde te veranderen.

IT en ESG staan niet als module of discipline in de actieve websitebibliotheek. Een IT-map in de fictieve data room van de film is een documentcategorie, geen aangeboden IT-module.

## Hersteld

Tenzij anders aangegeven geldt een wijziging voor en/nl/de/es/pt. De paden hieronder zijn berichtsleutels in de vijf JSON-bestanden.

| ID | Plaats | Correctie en reden |
| --- | --- | --- |
| A01 | `shared.modules`, `shared.waves.4.title`, `shared.waves.5.body` | Ontbrekende modulevertalingen aangevuld in nl/de/es/pt. Dezelfde negen posities behouden en dealeconomie in de golftekst consequent vertaald. |
| A02 | `governance.zdr.title`, `governance.zdr.items.3` en governancepagina | Uitgeschreven moduleaantallen gekoppeld aan `{zdr}` uit `ZDR_MODULE_COUNT`. Het bestaande `{other}` blijft uit dezelfde canonieke gegevens komen. |
| A03 | `lib/roster.manifest.ts` | De build controleert nu ook dat `platform.blocks.items.length` gelijk is aan `HARD_BLOCK_COUNT`, naast de bestaande module-, golf- en disciplinecontroles. |
| A04 | `governance.limits.items.5` | Verwijzing naar “de benchmark op deze pagina” verwijderd: die benchmark staat daar niet. De beperking tot interne, niet-geauditeerde metingen op één dataset blijft staan. Geen nauwkeurigheidspercentage toegevoegd. |
| A05 | `shared.specimen.values.finding` en `.severity` | Het getoonde citaat bewijst een opzeggingsrecht bij zeggenschapswijziging met dertig dagen schriftelijke opzegtermijn. Het bewijst geen grootste-klantstatus of afwezigheid van een afkoopsom. Die toevoegingen zijn verwijderd; High is expliciet een illustratieve, door de reviewer te beoordelen weging. |
| A06 | `platform.grounding`, `platform.contract.note`, FAQ 3 en 6, `governance.gate.items.0` | De absolute belofte dat elke claim alle vier controles doorstaat, vervangen door de feitelijke controlemechanismen en zichtbare bewijs-/reviewstatus. Second opinion betreft resterende twijfelgevallen; de lokale NLI-dienst is optioneel. Een ontbrekend tweede signaal heft een waarschuwing niet op. |
| A07 | `platform.grounding.layers.1.body` | “Teken voor teken identiek” gepreciseerd: de code normaliseert onder meer opmaak, leestekens en PDF-extractieverschillen. |
| A08 | `platform.grounding.repair`, `platform.contract.note` | Vaste belofte van precies één reparatiepoging verwijderd. De entailmentcode kan een tweede reparatie uitvoeren; dit verschilt van de afzonderlijke critic/author-retrylus. |
| A09 | `platform.coverage.note`, toelichting bij `zdr` in `lib/site.ts` | ZDR en EU-residency uit elkaar gehouden: de ZDR-poort is modulegebonden; EU-residency is een aparte, standaard ingeschakelde keuze per deal. “Hard-gated EU-endpoint” was daardoor te absoluut. |
| A10 | `shared.schema.values.review` | Het veld beschrijft nu reviewstatus plus de verplichte exportaftekening. De oude korte waarde suggereerde dat elk detail afzonderlijk moest zijn afgetekend; de productcode kent een begrensde verplichte exportreview. Zie B01 voor de bredere bronbotsing. |
| A11 | `platform.limits.items.3–4`, `shared.guarantee.note` | Technische/code-DD en integriteitsscreening expliciet uitgesloten voor Factum; “buiten de standaardronde” kon een aanvullende dienst suggereren. De Findings Guarantee geldt expliciet alleen voor pilotmandaten en niet voor demo’s. |
| A12 | `privacy.sections.0.body.1` en `.3` | “Geen cookie” bij de taalkeuze hersteld. De switcher bewaart `NEXT_LOCALE` één jaar na een expliciete keuze; de proxy leest die bij terugkeer op `/`. De URL blijft leidend bij een taalpad. Analytische cookies worden apart beschreven. |
| A13 | `structuredData.serviceDescription`, `lib/jsonld.ts`, locale-layout | De Service-beschrijving en het diensttype in JSON-LD volgen nu de paginataal. Het disciplineaantal blijft uit `DISCIPLINE_COUNT` komen; NL-rechtsgebondenheid, menselijke aftekening en pilotvoorwaarden staan in alle versies. De bestaande werktalen en eigennamen zijn behouden. |
| A14 | Diverse vertalingen | Duitse metadata omgedraaid van “de bevinding bewijst een document” naar “verwijst naar een document”; Duitse voorbeeldkop en retrievalkop verbeterd. De Duitse vertaling van tenant als “uw mandant” gecorrigeerd naar accountomgeving. PT “Jurista” bij Wouter vervangen door de oorspronkelijke functie “Legal Officer”. DE/PT-pilotschaarste gelijkgetrokken met “een handvol”, zonder extra numerieke bandbreedte. |
| A15 | `home.film.lead` | De begeleidende tekst volgt het getoonde opzeggingscitaat, zonder vertrek in de tekenweek te beloven. De exact klinkende speelduur vervangen door “een korte film”: de bestanden duren per taal ongeveer 41–44 seconden. De bestaande MP4’s zijn niet gewijzigd; zie B08. |

De actieve webteksten presenteren geen betalende Factum-klanten, publieke afgeronde cases of geauditeerd nauwkeurigheidspercentage. De getoonde bevinding blijft een fictief voorbeeld. De expliciete NL-beperking bij juridisch/fiscaal staat in alle talen op platform, sprint en pre-sale; ook de vertaalde JSON-LD draagt die beperking.

## Besluitpunten voor Wouter

Deze teksten en keuzes zijn niet stilzwijgend als bewezen goedgekeurd. “Niet geverifieerd” betekent dat de gelezen bronnen de claim niet afdoende dragen; het bewijst niet dat de claim onwaar is.

| ID | Prioriteit en vindplaats | Besluit / ontbrekend bewijs |
| --- | --- | --- |
| B01 | Hoog — `GTM/config/product-facts.md`, `platform.contract.items.5.body`, `platform.review.items.4`, `governance.gate.items.3` | De configuratie zegt dat het klantteam elke bevinding zelf reviewt en aftekent. `klantgoedkeuring.ts` vereist goedkeuring van modulemanagementsamenvattingen en hoofdstukken die toprisico’s of opschortende voorwaarden dragen; andere hoofdstukken mogen mee als niet afzonderlijk getoetst. Zonder managementsamenvatting zijn alle hoofdstukken van die module verplicht. Kies of dit het bedoelde exportcontract is, of dat het product strenger moet. Aanbeveling: de feitelijke verplichte omvang helder publiceren en de readonly productfeiten daarna door de eigenaar laten bijwerken. De menselijke poort blijft in beide varianten verplicht. |
| B02 | Hoog — `platform.alternatives` en `MATRIX` in platformpagina | Eigen vergelijkingsmatrix beweert categoriebreed dat andere tools functies en een gepubliceerde accuracy-audit missen. Lokale productcode kan alleen Factum onderbouwen. Geen leveranciers onderzocht wegens het netwerkverbod. Keuze: externe oordelen verwijderen/als ongeverifieerd markeren, of per leverancier gedateerd bewijs verzamelen. Vooral “niemand in deze tabel heeft een audit” is onbewezen. |
| B03 | Hoog — homehero, `home.plan.steps.2`, platform/sprint-FAQ snelheid, `sprint.faq.items.0.a`, `platform.faq.items.7.a` | “In dagen”, “de pass draait in uren”, QoE “vier tot tien weken” en opschalen naar elke dealgrootte hebben hier geen gecontroleerde prestatiemeting of marktonderbouwing. De FAQ nuanceert de opleverdatum wel, maar de eerste belofte blijft staan. Kies een gemeten bandbreedte met bron, of een procesbeschrijving zonder vaste snelheids-/schaalbelofte. |
| B04 | Hoog — `governance.terms.items.1–3`, contactentiteit en privacycontroller | Oprichting “bij de notaris”, actuele beroepsaansprakelijkheidsdekking, aansprakelijkheidslimiet en uitsluitingen vragen de echte juridische documenten. `KVK` is de websiteconstante, geen verificatie van registratie of polis. Bevestig contracterende partij, dekking en voorwaarden op schrift. Controleer ook of de privacycontroller voldoende concreet is geïdentificeerd. Geen KvK- of verzekeringscheck via netwerk uitgevoerd. |
| B05 | Hoog — `governance.legal`, `governance.terms.note`, privacy | De data van de AI Act, de DORA-“drempel”, algemene NDA-/verschoningsrechtclaims en uitspraken over Plausible zijn juridische/leveranciersclaims buiten de lokale productcode. De feitelijke taalcookie is gerepareerd; actuele wettelijke toepasselijkheid en externe verwerkingspraktijk blijven ongeverifieerd. Laat de genoemde passages tegen officiële bronnen en de werkelijke contracten toetsen voordat ze als juridisch feit gelden. |
| B06 | Middel — `governance.learning` | De code bevat PII-schoning en tenantgebonden regels. Dat bewijst nog niet de absolute volledige anonimisering van alle gedeelde methodiek, het complete opt-outpad per account of de operationele verwerking in productie. “Over klanten heen leren” kan bovendien als bestaande klantenervaring worden gelezen bij een product zonder betalende klanten. Bevestig implementatie en opt-out, of formuleer dit als ontworpen mechanisme met concrete grenzen. |
| B07 | Middel — `preSale.faq.items.0–1`, `preSale.gaps`, `preSale.mirror` | De precieze limiet van twintig rode vlaggen, documentchecklistdekking, interne klantverzoeken en Word-export vragen een aantoonbare actuele productroute. De gelezen bronset onderbouwt het sell-side-perspectief, maar geen complete werkende route voor elk genoemd resultaat. “Financieel, commercieel en operationeel werken in elke jurisdictie” is bovendien onbegrensd. Bevestig de route en jurisdicties of begrens deze beloftes tot de vooraf afgesproken scope. |
| B08 | Hoog — `public/video/what-is-due-diligence-for-{en,nl,de,es,pt}.mp4` | De filmbronnen tonen hetzelfde dertigdagencitaat, maar de voice-over en schermtekst spreken over de grootste klant die in de tekenweek vertrekt. Ook staat bij menselijke goedkeuring `W. Dijkman`, terwijl de huidige propositie de klantreviewer laat tekenen. Besluit over scenario en reviewerlabel; daarna de vijf exports opnieuw maken. De video's bevatten vaste module-/golfaantallen in hun eigen bron in plaats van een koppeling met `site.ts`; ze kloppen nu, maar kunnen later driften. De IT-map is geen IT-DD-module. De film is expliciet fictief gelabeld, geen klantcase. Lokale frames en de vijf voice-overteksten zijn gecontroleerd; er is geen volledige audiotranscriptie gemaakt. |
| B09 | Middel — `team.people.1.bio` en werkhistorie | Daniels “meer dan 50.000 records per dag”, zorgklanten en GDPR/FHIR-formulering zijn over Dandro, niet over Factum. Er is in de gelezen productfeiten geen onafhankelijke onderbouwing voor dat volume. Bevestig het bij Daniel met bron of schrap het getal. Geen Factum-resultaat of betaalde klant hiervan gemaakt. |
| B10 | Middel — `apps/factum/CONTENT.md`, `CONTENT-NL.md` | Oude contentexports bevatten afgeschafte proposities en claims over onafhankelijk geverifieerde/live-dealresultaten. Ze worden niet gerenderd en zijn daarom niet herschreven in deze audit. Archiveer of regenereer ze expliciet voordat iemand ze als kopieerbron gebruikt. |

Overige commerciële toezeggingen die bevestiging vragen: NDA dezelfde dag, vaste prijs voor de hele scope en beschikbare “handvol” pilotmandaten. Dit zijn uitvoerings-/aanbodkeuzes, geen uit de broncode bewezen productprestaties.

## Links en vertalingen

- Sleutel-, array- en ICU-placeholderpariteit: geslaagd voor alle vijf talen via `scripts/check_locales.py`. Geen lege of ontbrekende berichtwaarden gevonden.
- Alle vijf modulelijsten sluiten positioneel aan op de ongewijzigde `MODULES`-array; alle talen tellen dezelfde modules, golven, disciplines en blokkadebeschrijvingen.
- De gegenereerde HTML van alle 45 inhoudspagina’s is lokaal geparseerd. Geen ontbrekende interne routes, ankers, statische assets, videobestanden of posters gevonden. `/_next/image` is tegen het lokale bronbestand gecontroleerd; de optimizer is niet via HTTP aangeroepen.
- De 40 sitemap-URL’s bestaan in de gegenereerde pagina’s. De vijf privacyroutes zijn bewust niet opgenomen.
- De bestaande redirects voor `buyer-proof-sprint → diligence-sprint`, `method → platform` en `partnerships → pre-sale` verwijzen in alle talen naar bestaande pagina’s. Dit is een configuratiecontrole, geen HTTP-statusmeting.
- Externe doelen zijn **niet op bereikbaarheid getest**: Cal.com-intake, Plausible-script en de LinkedIn-/Agentic Mindshift-`sameAs`-links in JSON-LD. De lokale consultancyroute `/en/over` bestaat in de monorepo. Geen dode externe link geclaimd of op basis van een gok vervangen.

## Bouwcontrole en beperkingen

`node_modules` is aanwezig als symlink naar de bestaande hoofdcheckout. Niets geïnstalleerd.

1. Vanuit `apps/factum/` het gevraagde commando uitgevoerd: `./node_modules/.bin/tsc --noEmit -p tsconfig.json && ./node_modules/.bin/next build`. TypeScript slaagt. Turbopack stopt op een dependency-symlink buiten zijn gedetecteerde projectroot.
2. Eén aanvullende poging met tijdelijk een ruimere `turbopack.root`, conform de geïnstalleerde Next.js-gids. Dan stopt Turbopack omdat de sandbox het binden van zijn compilerpoort weigert (`Operation not permitted`). De tijdelijke configuratie is teruggezet; `next.config.ts` is niet gewijzigd in het eindresultaat.
3. Aanvullend offline gecontroleerd met `./node_modules/.bin/tsc --noEmit -p tsconfig.json && ./node_modules/.bin/next build --webpack`. Geslaagd: compilatie, TypeScript en alle 56 statische outputs, waaronder de 45 inhoudspagina’s in vijf talen. Dit is geen geslaagde standaard-Turbopack-build.

Voor beide bundlers stond telemetry uit. De Google Fonts-loader kreeg lokale CSS-antwoorden via `NEXT_FONT_GOOGLE_MOCKED_RESPONSES`, opgebouwd uit de al aanwezige fontbestanden van de hoofdcheckout. Er is niets van Google gedownload. Een tijdelijke Node-preload blokkeerde externe HTTP/fetch/DNS-verbindingen; lokale `data:`-resources blijven toegestaan. De laatste webpack-run registreerde geen geblokkeerde externe verbinding. De reguliere Google Fonts-downloadroute is dus niet getest. Er zijn geen font-, dependency- of bouwconfiguratiewijzigingen in de patch.

Lokale hulpmiddelen en bewijs, buiten git:

- `/private/tmp/verify-factum-audit.sh`: offline TypeScript- en webpack-controle.
- `/private/tmp/factum-audit-webpack.log`: geslaagde aanvullende build.
- `/private/tmp/factum-audit-build.log`: mislukte Turbopack-poging met tijdelijke root.
- `/private/tmp/check-factum-audit-html.py` en `/private/tmp/factum-audit-html.json`: HTML-/linkcontrole.
- `/private/tmp/factum-audit-fonts.cjs`, `/private/tmp/factum-audit-no-network.cjs`: uitsluitend controlehulpmiddelen.
- `/private/tmp/commit-site-feiten-2026-10-18.sh`: nog niet uitgevoerd commitscript met expliciete bestandsnamen; het weigert een andere branch of een reeds gevulde staging area en bevat geen push-/merge-opdracht.

De lokale HTML-controle telt 1.910 interne verwijzingen en 55 ankerverwijzingen zonder fouten. Het commitscript is alleen op shellsyntaxis gecontroleerd.

De standaardbuild moet nog buiten deze sandboxbeperkingen worden herhaald. Externe bereikbaarheid, productieconfiguratie en de besluiten hierboven blijven afzonderlijke open controles.
