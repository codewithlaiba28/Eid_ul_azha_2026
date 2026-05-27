# 🌙 Eid-ul-Adha 2026 — Celebration Web App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)

**A premium, celestial-themed Next.js web application to celebrate Eid-ul-Adha 2026.**  
*Featuring prayers, wishes, recipes, Qurbani packages, and an immersive dark-mode Islamic aesthetic.*

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌟 **Celestial Hero Section** | Animated countdown timer, floating stars, glowing moon, and a live Eid date display |
| 📖 **About Eid-ul-Adha** | Educational section on the significance and history of the blessed occasion |
| 🐑 **Qurbani Packages** | Interactive flip-card packages with booking integration |
| 🍖 **Eid Recipes** | Curated traditional & modern recipes with horizontal scroll and cook mode |
| 🖼️ **Gallery** | Masonry-style gallery with a lightbox viewer |
| 💌 **Wishes & Greetings** | Design, preview, and download/share custom Eid greeting cards |
| 🤲 **Duas & Prayers** | Essential Islamic duas and Namaz guide with Arabic text |
| 📅 **Booking Dashboard** | Full booking management interface for Qurbani orders |
| 🎉 **Confetti & Animations** | Canvas-confetti celebrations and framer-motion micro-animations throughout |

---

## 🗂️ Project Structure

```
eid_ul_azha/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page (all sections assembled)
│   │   ├── layout.tsx            # Root layout with metadata & fonts
│   │   ├── globals.css           # Global styles & CSS variables
│   │   ├── duas/                 # Dedicated Duas & Prayers page
│   │   ├── recipes/              # Dedicated Recipes page
│   │   └── wishes/               # Dedicated Wishes & Card Designer page
│   └── components/
│       ├── Header.tsx            # Responsive navbar with mobile drawer
│       ├── Footer.tsx            # Responsive footer with newsletter
│       ├── FloatingParticles.tsx # Ambient star/particle animation
│       └── home/
│           ├── HeroSection.tsx       # Hero banner with countdown
│           ├── AboutSection.tsx      # About Eid-ul-Adha
│           ├── DuasSection.tsx       # Quick duas on home page
│           ├── GallerySection.tsx    # Photo gallery with lightbox
│           ├── RecipesSection.tsx    # Recipe cards with horizontal scroll
│           └── WishesSection.tsx     # Greeting card generator
├── public/                       # Static assets
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.6 | App Router framework |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5 | Type safety |
| **TailwindCSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Smooth animations |
| **Lucide React** | 1.16 | Icon library |
| **Canvas Confetti** | 1.9 | Celebration effects |
| **html-to-image / html2canvas** | latest | Greeting card download |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/codewithlaiba28/Eid_ul_azha_2026.git
cd Eid_ul_azha_2026

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

### Available Scripts

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📱 Responsive Design

This app is fully optimized for all screen sizes using a **Mobile-First** approach:

| Breakpoint | Size | Target |
|---|---|---|
| Base | `< 640px` | Mobile phones |
| `sm` | `640px` | Large mobile |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops / Desktops |
| `xl` | `1280px` | Large desktops |

Key responsive highlights:
- ✅ Touch-friendly buttons (min 44×44px targets)
- ✅ Mobile drawer navigation
- ✅ Adaptive grid layouts across all sections
- ✅ Optimized glassmorphism blur for mobile performance
- ✅ Horizontal scroll recipe cards with touch support

---

## 🎨 Design Philosophy

> *"Design that wows at first glance."*

- **Dark Celestial Aesthetic** — Deep purples, golds, and glowing greens inspired by Islamic geometric art and the night sky
- **Glassmorphism** — Frosted-glass cards with subtle borders and backdrop blur
- **Micro-animations** — Floating stars, hover glows, smooth page transitions via Framer Motion
- **Premium Typography** — Google Fonts (Inter + serif Arabic-friendly fallbacks)
- **Ambient Particles** — Canvas-based floating particle system for an immersive feel

---

## 🌐 Pages Overview

| Route | Page |
|---|---|
| `/` | Home — Hero, About, Packages, Recipes, Gallery, Wishes, Duas, Booking |
| `/duas` | Full Duas & Prayers guide with Arabic text and Sunnah checklist |
| `/recipes` | Complete recipe browser with cook mode & ingredient calculator |
| `/wishes` | Interactive greeting card designer with download & share |

---

## 🤖 AI-Assisted Development

This project was built with the assistance of **Antigravity**, an advanced agentic coding AI by the **Google DeepMind** team — handling everything from component architecture to responsive design and animation polish.

---

## 🙏 Acknowledgements

- All Eid duas and Islamic content sourced from authentic references
- Inspired by the spirit of **Eid-ul-Adha** — sacrifice, generosity, and gratitude

---

## 📄 License

This project is open-source and available for **educational and personal use**.

---

<div align="center">

**تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ**  
*Taqabbalallahu Minna wa Minkum*  
*May Allah accept from us and from you* 🌙

</div>
