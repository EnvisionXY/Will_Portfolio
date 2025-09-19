# William Black Portfolio

Ein modernes, interaktives Portfolio mit neuronaler Netzwerk-Visualisierung, entwickelt mit Next.js und Sanity CMS.

## 🎨 Features

### Visuelle Highlights
- **Interaktiver Neural Network Hintergrund**: Dynamisches Partikelsystem, das auf Mausbewegungen reagiert und ein neuronales Netzwerk simuliert
- **Responsive Design**: Optimiert für alle Bildschirmgrößen (Mobile, Tablet, Desktop)
- **Smooth Scroll Navigation**: Sanfte Übergänge zwischen Sektionen
- **Animierte Übergänge**: Scroll-basierte Animationen für bessere Benutzererfahrung

### Funktionalität
- **Sanity CMS Integration**: Headless CMS für einfache Inhaltsverwaltung
- **EmailJS Kontaktformular**: Direkter E-Mail-Versand ohne Backend
- **PortableText Editor**: Rich-Text-Inhalte mit Formatierung
- **Project Showcase**: Dynamische Projektdarstellung mit Tags und Hover-Details
- **Social Media Integration**: Verknüpfung mit LinkedIn, GitHub, Instagram

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **TypeScript**: Vollständig typisiert
- **Icons**: Lucide React

### Backend & CMS
- **CMS**: Sanity.io
- **Bildoptimierung**: Sanity Image URL Builder
- **Content-Rendering**: Portable Text

### Services
- **Email**: EmailJS
- **Deployment**: Vercel (empfohlen)

## 📁 Projektstruktur

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (site)/                    # Main site routes
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SelectedWorks.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── StableParticleBackground.tsx
│   │   │   └── PortableText/
│   │   ├── cv/                        # CV route
│   │   ├── hooks/
│   │   │   └── useIntersectionObserver.ts
│   │   ├── imprint/                   # Impressum
│   │   ├── privacy/                   # Datenschutz
│   │   ├── project/                   # Project detail pages
│   │   ├── studio/                    # Sanity Studio
│   │   │   ├── [[...index]]/
│   │   │   └── layout.tsx
│   │   ├── styles/
│   │   │   └── animations.css
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts
│       │   ├── image.ts
│       │   └── queries.ts
│       └── schemas/
│           ├── objects/
│           │   └── illustration.ts
│           ├── index.ts
│           ├── project.ts
│           ├── settings.ts
│           └── tags.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── Logo_Entwurf.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env.local
├── .gitignore
├── deskStructure.ts
├── eslint.config.mjs
├── jira-test.txt
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── sanity.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js 18+
- npm oder yarn
- Sanity Studio Account
- EmailJS Account

### 1. Repository klonen
```bash
git clone <repository-url>
cd portfolio
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Umgebungsvariablen einrichten
Erstelle eine `.env.local` Datei:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Optional: Sanity Studio URL
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
```

### 4. Sanity CMS konfigurieren

1. Sanity Projekt erstellen:
```bash
npm create sanity@latest
```

2. Schemas deployen:
```bash
cd sanity
sanity deploy
```

3. Inhalte im Sanity Studio erstellen

### 5. EmailJS konfigurieren

1. Account erstellen auf [emailjs.com](https://emailjs.com)
2. Gmail-Service verbinden
3. Email-Template erstellen mit Variablen:
   - `{{name}}`
   - `{{from_email}}`
   - `{{message}}`
4. IDs in `Footer.tsx` eintragen:
   - Service ID
   - Template ID
   - Public Key

### 6. Development Server starten
```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

## 🎨 Konfiguration

### Farben anpassen
Hauptfarben sind in `tailwind.config.js` definiert:
- `crank-orange-1`: #f29a2e (Golden Orange)
- `crank-orange-3`: Hover-Variante

### Neural Network Hintergrund
Anpassungen in `StableParticleBackground.tsx`:
- `neuronCount`: Anzahl der Neuronen (Standard: 30)
- `mouseInfluence`: Interaktionsradius (Standard: 150)
- Farbschema: Hue-Werte für verschiedene Layer

### Kontaktformular
EmailJS-Konfiguration in `Footer.tsx`:
```typescript
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';
```

## 📝 Content Management

### Sanity Studio
Zugang zum CMS: `https://your-project.sanity.studio`

#### Verfügbare Schemas:

**Settings (Einstellungen)**
- Site Title
- Tagline
- Keywords
- Kontaktinformationen
- Über-mich-Inhalt (PortableText)
- Profilbild

**Project (Projekt)**
- Titel
- Slug
- Beschreibung
- Tags
- Bilder/Illustrationen
- Hover-Text

### Content Types

#### PortableText Features
- Überschriften (H3, H4)
- Fettdruck & Kursiv
- Links (intern/extern)
- Aufzählungen
- Hervorgehobene Text-Boxen

## 🚢 Deployment

### Vercel (Empfohlen)

1. Repository zu GitHub pushen
2. Projekt auf [vercel.com](https://vercel.com) importieren
3. Umgebungsvariablen eintragen
4. Deployen

### Manuelle Deployment

```bash
npm run build
npm start
```

## 🔧 Entwicklung

### Wichtige Befehle

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Sanity Studio
cd sanity && sanity dev

# TypeScript Check
npm run type-check

# Linting
npm run lint
```

### Branch-Strategie

- `main`: Produktions-Code
- `feature/*`: Neue Features
- `release/*`: Release-Branches
- `chore/*`: Wartungsarbeiten

## 🐛 Bekannte Besonderheiten

### Particle Background Re-Rendering
Der Neural Network Hintergrund rendert neu bei Hover-Events auf Projekt-Elementen. Dies ist ein bewusstes Design-Element, das dem Portfolio Dynamik verleiht.

### Content-Aware Zones
Partikel reagieren weniger stark über Hauptinhaltsbereichen, um Lesbarkeit zu gewährleisten.

## 📱 Browser-Kompatibilität

- Chrome/Edge: ✅ Vollständig unterstützt
- Firefox: ✅ Vollständig unterstützt
- Safari: ✅ Vollständig unterstützt
- Mobile Browser: ✅ Optimiert

## 🔐 Sicherheit

- Keine sensiblen Daten im Frontend
- EmailJS Public Keys sind sicher für Client-Side
- Sanity CORS-Konfiguration beachten
- Environment Variables für API-Keys nutzen

## 📄 Lizenz

[Deine Lizenz hier einfügen]

## 👤 Autor

**William Black**
- Email: william@willblack.de
- LinkedIn: [William Black](https://www.linkedin.com/in/willblackcoast/)
- GitHub: [EnvisionXY](https://github.com/EnvisionXY)
- Instagram: [@will.black_music](https://www.instagram.com/will.black_music/)

## 🙏 Danksagungen

- Next.js Team für das exzellente Framework
- Sanity.io für das flexible CMS
- EmailJS für die einfache Email-Integration
- Alle Open-Source-Contributors

## 📞 Support

Bei Fragen oder Problemen:
1. Issue auf GitHub erstellen
2. Kontaktformular auf der Website nutzen
3. Direkte Email an william@willblack.de

---

**Version**: 1.0.0  
**Last Updated**: Januar 2025  
**Status**: Production Ready 🚀

