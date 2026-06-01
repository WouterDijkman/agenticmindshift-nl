# Improvement Audit — agenticmindshift.nl
**Datum:** 2026-06-01
**Scope:** alle marketing-pagina's (`/`, `/werkwijze`, `/over`, `/factum-capital`, `/contact`, `/privacy`, `/voorwaarden`), de volledige scorecard-flow (`/scorecard` → `sectie-1..4` → `/resultaat` → `/rapport/[id]`), layout, globale CSS, SEO-config, robots/sitemap, JSON-LD, formulieren en analytics.
**Stack:** Next.js 16.2.6 (App Router, React 19), Tailwind v4 + custom CSS-tokens, Framer Motion, Zustand, react-hook-form + Zod, Supabase, Resend, Plausible.

---

## 1. Samenvatting — top 3 urgenties

1. **De rapport-pagina compileert niet meer.** `app/scorecard/rapport/[id]/page.tsx` heeft een blok dode JSX/code na de afsluitende `}` van de component (regels 388–395). `npx tsc --noEmit` geeft 11 errors. Dit is de eindbestemming van de hele scorecard-funnel — geen rapport = geen lead. **Fix nu**, niet morgen.
2. **De Open Graph-image bestaat niet.** `app/layout.tsx:42` verwijst naar `/og-image.jpg`, maar dat bestand staat niet in `/public/`. Elke deel-actie op LinkedIn, X, WhatsApp en e-mail laat een lege of generieke preview zien. Voor een product dat via LinkedIn warmgedraaid wordt is dit een eersterangs conversie-lek.
3. **Het logo is 830 KB.** `public/logo.png` wordt door `Header.tsx` op elke pagina ingeladen voor een element van 44 px hoog. Tegelijk staat er een `logo.svg` van 1,2 KB ongebruikt. Next/image schaalt op de server, maar dit is alsnog onnodige bundlegrootte en build-tijd. Switch naar SVG.

---

## 2. Bevindingen per dimensie

### A. Conversie & UX

| Ernst | Item | Aanbeveling |
|---|---|---|
| ❌ Kritiek | Rapportpagina is gebroken door syntax-error (zie §1). | Verwijder regels 388–395 in `app/scorecard/rapport/[id]/page.tsx` — de hele `<section>` is een dubbele afsluiting van de standard-variant. |
| 🔴 Hoog | OG-image ontbreekt — alle social shares missen preview. | Lever `/public/og-image.jpg` aan (1200×630, ≤200 KB) of point naar `/logo.svg`. |
| 🟡 Middel | Hero heeft één CTA. Een secundair pad ("Plan sparring-sessie") komt pas onderaan. | Voeg een tekst-link of subtiele secundaire knop onder de hero-CTA toe — niet alle bezoekers willen direct 12 minuten investeren. |
| 🟡 Middel | Contact-pagina linkt naar cal.com extern in plaats van een ingebedde widget. | Embed cal.com inline op `/contact` — externe redirect kost ±20–30% van de intenties. |
| 🟢 Laag | Hero subtekst bevat een licht gebroken zin: "U doet alles goed — en toch de vraag of u…" (`AnimatedHero.tsx:155`). | Maak er bv. "…en toch *blijft* de vraag of u…" of "…en toch *de twijfel* of u…" van. |
| 🟢 Laag | Geen "exit-intent" of "voorbeeldrapport"-download voor bezoekers die de 12 min niet willen besteden. | Voeg op homepage een tweede pad toe: "Liever eerst een voorbeeldrapport zien? → e-mail/LinkedIn" (FAQ-item `voorbeeld` belooft dit al, maar de CTA is verstopt). |
| 🟢 Laag | Mid-page CTA-blok op homepage en final CTA op `/werkwijze` zeggen vrijwel hetzelfde. | OK voor verschillende doelgroep-fases — laten staan. |

### B. Content & messaging

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🔴 Hoog | Naam-inconsistentie tussen homepage en scorecard. Homepage `HomepageDimensionsSection.tsx:7` noemt dimensie 02 **"Portfolio Intelligence"**; `lib/questions.ts:33` rendert hem in het rapport als **"Analytische Kwaliteit"**. | Kies één naam en sync over `HomepageDimensionsSection`, `dimensionLabels`, en alle copy. |
| 🟡 Middel | Geen case-pagina's / blog / insights. De propositie is sterk maar de vindbaarheid op long-tail keywords (entry-multiple correctie, AI-substitutie, MBR-discipline) is nul. | 3–5 korte insight-stukken (800–1500 woorden) op een `/inzichten` route. |
| 🟡 Middel | Social proof beperkt tot twee geanonimiseerde quotes op homepage; nergens anders. | Plaats minimaal één quote op `/werkwijze` (bij een traject) en `/factum-capital`. |
| 🟡 Middel | Footer-copyright "© 2026" en disclaimer "opgericht oktober 2025…lancering 1 juli 2026" loopt vooruit op de huidige datum (2026-06-01). | Footer staat goed — vandaag is 1 juni 2026 dus dit klopt. **Wel:** controleer of de `lastModified` op privacy/voorwaarden (`13 mei 2026`) nog actueel is. |
| 🟢 Laag | Toon is consistent (zakelijk, schaars met emoji's, gemeten taalgebruik). | Behouden. |
| 🟢 Laag | "Niet geschikt voor" op homepage (`HomepageVoorWieSection.tsx`) is een sterk segmentatie-instrument. | Behouden, eventueel uitbreiden naar `/werkwijze`. |

### C. SEO & techniek

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🔴 Hoog | `og-image.jpg` 404. Effect: alle Twitter cards en OG previews. | Image leveren. |
| 🔴 Hoog | `public/robots.txt` én `app/robots.ts` bestaan beide. Next gebruikt de statische → dynamische route is dood en kan onbedoelde drift veroorzaken. | Verwijder `public/robots.txt`. |
| 🟡 Middel | Geen `BreadcrumbList` JSON-LD per dieper-liggende pagina (Werkwijze, Over, Factum). | Voeg per pagina een `BreadcrumbList`-schema toe — verbetert rich results. |
| 🟡 Middel | `logo.png` van 830 KB wordt op elke pagina geserveerd via `next/image` (`width=2448 height=1632`). Bron-bestand is onnodig zwaar. | Switch naar `/logo.svg` (1,2 KB). Houdt `priority` op homepage-hero. |
| 🟡 Middel | Geen `apple-touch-icon`, geen `manifest.json`, geen PWA-grootformaat icons. | Lever `apple-touch-icon.png` (180×180) en een `site.webmanifest`. |
| 🟡 Middel | Drie Google Fonts (Playfair, Inter, Cormorant) met elk meerdere weights. Dit is een meetbare LCP-kost. | Drop ongebruikte weights — controleer welke `font-weight: 300/500/900` echt voorkomen; verwijder de rest uit `app/layout.tsx`. |
| 🟢 Laag | `metadata.alternates.canonical` is hard op de homepage URL. Andere pagina's krijgen geen expliciete canonical. | Voeg `alternates.canonical` per pagina toe (Next vult anders automatisch in via `metadataBase`, dat is meestal genoeg). |
| 🟢 Laag | `dev_log.txt`, `*.bat`-scripts en `_sync_test_*.txt` zijn checked-in. | `.gitignore` uitbreiden en files verwijderen. |
| ✅ Goed | Sitemap dynamisch met juiste prioriteiten. Robots allow all. JSON-LD (Organization, Person, Service, FAQPage) aanwezig. |  |

### D. Design & visuele consistentie

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🟡 Middel | Inline-style-heavy. ±90% van de styling staat in `style={{…}}` objecten. Maintainability/visual diff lijdt eronder. | Consolideer terugkerende patronen (eyebrow, blockquote, stat-cell, offering-card) naar utility classes in `globals.css` of een tokens-file. |
| 🟡 Middel | `* { border-radius: 0; }` (regel 136 `globals.css`) is sterk maar overschrijft ook alle Tailwind-radius. Intentioneel maar verraderlijk voor nieuwe componenten. | Documenteren in een `STYLEGUIDE.md` of CSS-comment. |
| 🟢 Laag | Footer-copyright "© 2026" is editorial OK, maar tweede zin "Agentic Mindshift, opgericht oktober 2025…" hoort op `/over`, niet in elke footer. | Verkort footer tot één rij. |
| 🟢 Laag | Hero-glyph "PE" en parallax decoratief — kost wat JS (Framer scroll). | Acceptabel; `pointer: fine` guard zou nog kunnen worden toegevoegd voor mobile-besparing. |
| ✅ Goed | Palet (cream + navy + coral) en typografie zijn afgemeten en herkenbaar. |  |
| ✅ Goed | Fluid type (`clamp()`) overal consistent toegepast. |  |

### E. Accessibility

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🔴 Hoog | Scorecard sticky-header heeft een contrast-bug. `ScorecardLayout.tsx:14–32` zet `background: rgba(8,25,48,0.92)` (donker navy) met tekst `var(--text-primary)` = `#0B1F3A` (ook donker navy). Logo en "Sluit scorecard"-link zijn nagenoeg onleesbaar. | Tekstkleur → `var(--text-inverse)` of `#F7F2EB`. |
| 🔴 Hoog | "De zes dimensies"-kaarten op homepage (`HomepageDimensionsSection.tsx:65–78`) hebben `onClick={() => window.location.href = '/scorecard'}` op een `motion.div`, zónder `role="button"`, `tabIndex={0}`, `aria-label` of `onKeyDown`. Niet toetsenbord- of screenreader-bereikbaar. | Wrap de kaarten in `<Link>` of voeg de drie ARIA-attributen plus een Enter/Space-handler toe. |
| 🟡 Middel | Hover-only tekst "Meet deze dimensie →" (`opacity: 0`) is voor toetsenbord-users onzichtbaar. | Toon ook bij `:focus-within` of altijd. |
| 🟡 Middel | `CustomCursor` overschrijft de native cursor op desktop. Werkt vriendelijk (reduced-motion + pointer:fine guard), maar bezoekers met een grote cursor-instelling verliezen die. | Acceptabel maar overweeg een sitewide toggle. |
| 🟢 Laag | Geen `<main>` landmark in scorecard-layout — wel `<main>`, ok. |  |
| ✅ Goed | `:focus-visible` outline globaal. 44×44 touch-targets. `prefers-reduced-motion` checks in Button en CustomCursor. `aria-expanded` op mobile menu. |  |

### F. Analytics & tracking

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🟡 Middel | Plausible meet alleen pageviews. Conversie-funnel (Scorecard Started → Sectie 2 → 3 → 4 → Rapport gegenereerd → Form Submitted → Cal.com geklikt) wordt niet gevolgd. | Voeg Plausible custom events toe in de scorecard-store (per sectie-completion) en op `submitScorecard`/`submitEarlyAccess` success. |
| 🟡 Middel | Geen `data-plausible-domain` of expliciete script-error handling — als Plausible offline is laden er geen events. | Acceptabel default-gedrag; geen actie nodig. |
| ✅ Goed | Plausible is cookieless — geen cookie-banner nodig onder AVG/ePrivacy. Privacy-statement vermeldt geen tracking-cookies. Consistent. |  |
| ✅ Goed | Resend voor mailing, Supabase EU-regio, expliciete privacy-grondslagen per verwerking. |  |

### Cross-cutting: copy & rendering bugs

| Ernst | Item | Aanbeveling |
|---|---|---|
| 🔴 Hoog | **Literal `\u`-escape sequences in JSX-text** worden niet door React geïnterpreteerd en renderen letterlijk: |  |
| | `app/scorecard/sectie-1/page.tsx:81` — `← Terug naar start` toont als `← Terug naar start`. | Vervang door `←`. |
| | `app/scorecard/sectie-4/page.tsx:52` — `deal-firma’s` toont als `deal-firma’s`. | Vervang door `deal-firma's` (curly apostrophe `'`). |
| | `app/scorecard/rapport/[id]/page.tsx:182,185,370,373,376` — `Alle trajecten →`, `Plan een gesprek →`, enz. | Vervang door `→`. |

---

## 3. Quick wins — 10 items, elk ≤ 1 uur

1. **Verwijder regels 388–395 in `app/scorecard/rapport/[id]/page.tsx`.** Het is doodgeplakte JSX na het correcte `return`-block. Daarna `npx tsc --noEmit` om te bevestigen. — *5 min, deblokkeert hele funnel.*
2. **Vervang 7× `\uXXXX`-sequenties** met de daadwerkelijke karakters (`←`, `→`, `'`) in `app/scorecard/sectie-1/page.tsx:81`, `sectie-4/page.tsx:52`, en `rapport/[id]/page.tsx:182,185,370,373,376`. — *5 min.*
3. **Fix scorecard sticky-header contrast** in `components/layout/ScorecardLayout.tsx:23,30`: zet `color: 'var(--text-inverse)'` op beide `<Link>`'s. — *2 min.*
4. **Switch logo van PNG → SVG** in `components/layout/Header.tsx:54` (en `Header.tsx:169` in de mobile drawer). Bespaart ~830 KB per pageview. — *5 min.*
5. **Lever `og-image.jpg` aan** in `/public/` (1200×630, ≤200 KB). Een editorial frame met logo + tagline volstaat. — *15–30 min.*
6. **Stel dimensie-naamgeving gelijk.** Kies "Portfolio Intelligence" óf "Analytische Kwaliteit" en update zowel `lib/questions.ts:33` als `app/(marketing)/HomepageDimensionsSection.tsx:7`. — *5 min.*
7. **Maak dimensie-kaarten echte links.** Vervang `motion.div` + `onClick` door `motion(Link)` of wrap met `<Link href="/scorecard">`. — *15 min.*
8. **Voeg secundaire hero-CTA toe** onder `AnimatedHero.tsx:168`: een tekst-link "Of plan eerst een sparring-sessie →" naar `https://cal.com/wwdijkman/intake-call`. — *10 min.*
9. **Voeg Plausible custom events toe** in `store/assessmentStore.ts` (per sectie-completion) en in `actions/submitScorecard.ts` / `submitEarlyAccess.ts` (success). Zes regels code per event. — *30 min.*
10. **Verwijder `public/robots.txt`** (duplicaat van dynamische `app/robots.ts`) en cleanup `dev_log.txt`, `_sync_test_*.txt`, `*.bat`-scripts uit de repo root. — *5 min.*

---

## 4. Sprint-plan

### Sprint 1 — Conversie-kritiek (1–2 dagen)
Doel: site werkt zoals beloofd, conversie-funnel meetbaar, social shares tonen preview.

- [ ] Fix syntax-error in `app/scorecard/rapport/[id]/page.tsx` (quick win #1).
- [ ] Vervang alle 7 `\u`-escapes (quick win #2).
- [ ] Repareer scorecard-header contrast (quick win #3).
- [ ] Lever OG-image + apple-touch-icon (quick wins #5 + nieuw).
- [ ] Switch logo PNG → SVG (quick win #4).
- [ ] Sync dimensie-naam Portfolio Intelligence / Analytische Kwaliteit (quick win #6).
- [ ] Voeg Plausible custom events toe op de funnel-stappen (quick win #9).
- [ ] Maak dimensie-kaarten toetsenbord-bereikbaar (quick win #7).

### Sprint 2 — SEO & tech (2–3 dagen)
Doel: zichtbaarheid in zoekresultaten + technische hygiëne.

- [ ] `BreadcrumbList` JSON-LD toevoegen aan `/werkwijze`, `/over`, `/factum-capital`, `/contact`.
- [ ] `Product`/`Offer`-schema toevoegen aan `/factum-capital` (lancering 1 juli 2026 — `availabilityStarts` field).
- [ ] Voor `/werkwijze`: vier `Offer`-entries onder de `Service` (Portfolio Intelligence €8.500/mo, AI Due Diligence €12.500/deal, Fractional AI Officer €6.500/mo, Masterclass €4.500).
- [ ] Verwijder `public/robots.txt` duplicaat (quick win #10).
- [ ] Audit Google Fonts gebruik: verwijder ongebruikte weights uit `app/layout.tsx:6–27` (Playfair 400/500/600/900 zijn waarschijnlijk niet allemaal nodig).
- [ ] `apple-touch-icon.png` (180×180) + `site.webmanifest`.
- [ ] Voeg expliciete `alternates.canonical` toe per pagina (niet alleen homepage).
- [ ] Update `README.md` van Next.js boilerplate naar projectspecifiek.
- [ ] `.gitignore` uitbreiden + cleanup van `.bat`/`_sync_test_*.txt`/`dev_log.txt`.

### Sprint 3 — Content & polish (3–5 dagen)
Doel: long-tail SEO + meer landingsoppervlak voor LinkedIn-traffic.

- [ ] Cal.com-widget inline embedden op `/contact` in plaats van externe redirect.
- [ ] Insights-route `/inzichten/` met 3–5 essays van 800–1500 woorden:
  - "Hoe AI-substitutie de entry-multiple verschuift in NL MKB"
  - "MBR-discipline: waarom maand-cyclus boven kwartaal-cyclus uitkomt"
  - "Bias-detectie in IC-besluiten — een checklist"
  - "Knowledge retention na associate-vertrek"
  - "Het verschil tussen analytisch fundament en formele DD"
- [ ] Voorbeeldrapport-download als publieke PDF achter een (optionele) e-mailgate — direct downloadable variant voor "ik wil zien wat eruit komt".
- [ ] Eén pagina `/inzichten/voorbeeldrapport` met sample-rapport screenshots — versterkt vertrouwen vóór de scorecard.
- [ ] CSS-tokens consolideren naar utility-classes voor terugkerende patronen (eyebrow, blockquote, stat-cell, offering-card).
- [ ] Footer copy: van twee zinnen naar één regel.
- [ ] Overweeg EN-locale toggle als internationale PE-investeerders relevant zijn.

---

## 5. Sterktes — wat al goed werkt

- **Heldere, scherpe waardepropositie.** "Hoeveel rendement verliest uw portefeuille zonder dat u het ziet?" is in 5 seconden begrijpelijk voor de doelgroep en geen platitude.
- **Transparante prijsstelling.** Vier diensten met expliciete tarieven (€4.500 – €12.500 per opdracht of €6.500 – €8.500 per maand). Zeer ongebruikelijk in advisory-segment — een sterk vertrouwenssignaal.
- **Eerlijke social proof.** Geanonimiseerde quotes mét context (AUM, deal-volume) + expliciete disclaimer "Resultaten zijn geanonimiseerd weergegeven". Geen quasi-anonieme stockfoto-testimonials.
- **Solide JSON-LD coverage.** Organization, Person, Service, FAQPage — meer dan veel concurrenten in segment.
- **Cookieless analytics.** Plausible + privacy-statement zonder tracking-cookies = geen cookie-banner nodig, AVG-compliant by default.
- **Volwassen privacy-statement.** Met expliciete verwerkers (Supabase EU, Resend, hosting), bewaartermijnen, grondslagen, en `unsubscribe`-API.
- **Doordachte scorecard-architectuur.** Score-variants (A/B/C/D/E + none), high-scorer differentiatie (`HIGH_SCORER_THRESHOLD`), offer-gating op zwakste dimensie (`OFFER_GATE_PERCENT`) — dit is geen gimmick maar een genuanceerd assessment.
- **Sterke editorial design.** Cream + navy + coral, drie typografische families goed gebalanceerd, fluid type, `:focus-visible` consistent, 44×44 touch-targets, mobile drawer met focus-trap.
- **`prefers-reduced-motion` & `pointer: fine` checks** in `CustomCursor` en `Button` (magnetic) — accessibility-aware motion.
- **Form-validatie volwassen.** React Hook Form + Zod (`emailCaptureSchema`, `earlyAccessSchema`) — type-safe, server-actions met expliciete `submitting`/`serverError` states.
- **Zustand-persist voor scorecard-state.** Bezoekers kunnen mid-flow pauzeren — een kleine maar materiële UX-winst.

---

*Audit uitgevoerd zonder code-wijzigingen. Bevindingen zijn handmatig geverifieerd door `npx tsc --noEmit`, `grep` op `←/→/’`, en visuele code-review van alle pagina-bestanden, layouts, header/footer, lib/jsonld, sitemap/robots en analytics-setup.*
