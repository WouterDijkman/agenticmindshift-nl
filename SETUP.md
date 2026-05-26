# Setup op nieuwe machine

## 1. Repo ophalen

```bash
git clone https://github.com/JOUW-GEBRUIKERSNAAM/agenticmindshift-nl.git
cd agenticmindshift-nl
```

## 2. Dependencies installeren

Node.js vereist (v18 of hoger). Controleer: `node -v`

```bash
npm install
```

## 3. Environment variabelen instellen

```bash
cp .env.local.example .env.local
```

Open `.env.local` en vul in:

```
NEXT_PUBLIC_SUPABASE_URL=         # uit Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # uit Supabase project settings → API
SUPABASE_SERVICE_ROLE_KEY=        # uit Supabase project settings → API
RESEND_API_KEY=                   # uit resend.com → API Keys
NEXT_PUBLIC_SITE_URL=https://www.agenticmindshift.nl
```

## 4. Dev server starten

```bash
npm run dev
```

Site draait op http://localhost:3000

## 5. Cowork sessie koppelen

Open Cowork → selecteer de map `agenticmindshift-nl` → sessie wordt hervat.

---

## Handige commando's

```bash
npm run dev          # development server
npm run build        # productie build (test of alles werkt)
npx tsc --noEmit     # TypeScript check zonder build
git pull             # laatste wijzigingen ophalen
```

## Stack

- Next.js 15 (App Router)
- TypeScript
- Framer Motion
- Zustand (scorecard state)
- Supabase (leads/scorecard opslag)
- Resend (e-mail rapporten)
- Vercel (deployment)
