# PflegeAI - KI-gestützte Pflegeassistenz

Intelligente Sprachassistenz für Pflegeheime. Anfragen priorisieren, Pflegekräfte entlasten, Bewohnerzufriedenheit steigern.

**Live Demo:** [https://pflegeai-app.vercel.app](https://pflegeai-app.vercel.app)

## Features

- **Bewohner-Interface** (`/resident`) - Einfache, barrierefreie Oberfläche für Bewohner
  - Große Touch-Targets
  - Spracheingabe für Anfragen
  - Schnellwahl für häufige Anfragen (Wasser, Toilette, Medikamente)
  
- **Pflegekräfte-Dashboard** (`/requests`) - Echtzeit-Übersicht aller Anfragen
  - KI-gestützte Priorisierung
  - Anfragen übernehmen und abschließen
  - Dokumentation für MDK-Prüfungen

- **KI-Chat API** (`/api/chat`) - Gemini AI Integration
  - Natürliche Sprachverarbeitung
  - Automatische Prioritätsklassifizierung
  - Empathische, deutschsprachige Antworten

## Tech Stack

- **Framework**: Next.js 15
- **Database**: Supabase (Postgres)
- **AI**: Google Gemini
- **Auth**: JWT-based sessions
- **UI**: Tailwind CSS + shadcn/ui
- **Payments**: Stripe (vorbereitet)

## Setup

```bash
# Clone repo
git clone git@github.com:ruslanadilgereev/speeq.git
cd pflegeai-app

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run locally
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
GOOGLE_API_KEY=your-gemini-api-key
POSTGRES_URL=your-postgres-url
```

## Deployment

The app auto-deploys to Vercel on push to `main`.

## Contact

Für Demos und Partnerschaften: kontakt@pflegeai.de
