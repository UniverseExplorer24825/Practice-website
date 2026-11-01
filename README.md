# NEXUS – Immersive 3‑D Creative Website

**Live demo:** https://practice-website-orpin.vercel.app

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Design System](#architecture--design-system)
5. [Installation & Development](#installation--development)
6. [Build & Deployment](#build--deployment)
7. [Accessibility & Performance](#accessibility--performance)
8. [Folder Structure](#folder-structure)
9. [How to Contribute](#how-to-contribute)
10. [License](#license)

---

## Project Overview

NEXUS is a **single‑page, scroll‑driven experience** that blends a dark, cinematic UI with real‑time 3‑D graphics. The site is built as a showcase of modern web technologies capable of delivering high‑impact visual storytelling while remaining **responsive**, **accessible**, and **performant**. 

The narrative flow is:

1. **Hero** – a full‑screen neon‑lit intro with a rotating liquid‑metal sphere.
2. **Dimension** – pinned scroll sections that transition three distinct phases, each with its own typography and metrics.
3. **Journey** – a horizontal storytelling track with parallax effects.
4. **Interactive** – mouse‑follow spotlight cards, magnetic buttons, and touch‑friendly fallbacks.
5. **Final** – a concluding visual that ties the experience together.

---

## Key Features

| Feature | Description |
|--------|-------------|
| **Modular component architecture** | DOM UI (`components/dom`) is fully separated from the 3‑D scene (`components/3d`). |
| **Design system** | Tailwind‑based palette (neon cyan / purple / violet), glass‑like backgrounds, oversized typography, reusable shadows & glows. |
| **Smooth scroll** | **Lenis** provides inertia scrolling; synchronized with **GSAP + ScrollTrigger** for pinned sections and progress indicators. |
| **Real‑time 3‑D graphics** | **React‑Three‑Fiber** renders a high‑quality metallic sphere with environment lighting (`SceneLights`). |
| **Animated text building blocks** | `SplitText`, `DecryptedText`, `BlurText` (React Bits) for expressive headings and subtitles. |
| **Interactive UI primitives** | `Button`, `MagneticButton`, `SpotlightCard` – physics‑based hover & click feedback. |
| **Accessibility** | `prefers-reduced-motion` hook, ARIA labels, focus‑visible outlines, high‑contrast mode scaffold. |
| **Responsive layout** | Height adjustments (`h-[320vh] md:h-[260vh]`) prevent excessive scroll on tablets/phones. |
| **Performance safeguards** | Geometry detail reduced on mobile, mousemove handlers throttled via `requestAnimationFrame`. |
| **Production‑ready build** | Vite 5 produces a minified `dist/` folder; the site is hosted on Vercel. |

---

## Tech Stack

| Layer | Library / Tool | Reason for Choice |
|-------|----------------|-------------------|
| **Framework** | **React 18** (functional components, hooks) | Mature ecosystem, declarative UI, easy state handling. |
| **Bundler / Dev Server** | **Vite 5** | Instant HMR, ESBuild‑powered dev builds, small production bundles via Rollup. |
| **Styling** | **Tailwind CSS** (custom colors, gradients, keyframes) | Utility‑first workflow, fast iteration, keeps CSS payload low. |
| **3‑D Rendering** | **React‑Three‑Fiber**, **Three.js**, **@react-three/drei** | Declarative React binding for Three.js; `drei` supplies helpers (environment, lights). |
| **Animation** | **Framer‑Motion** (UI reveals) <br> **GSAP + ScrollTrigger** (timeline & pinning) | Framer‑Motion for simple component transitions, GSAP for fine‑grained scroll‑driven control. |
| **Smooth Scrolling** | **Lenis** | Provides inertia scrolling that integrates cleanly with GSAP. |
| **State Management** | **Zustand** (`useNexusStore`) | Tiny, fast global store for cursor, distortion, core colour, sound flag. |
| **Accessibility Hook** | Custom `useReducedMotion` (media‑query) | Guarantees reduced‑motion fallback without extra dependencies. |
| **Package Manager** | **pnpm** | Faster installs, deterministic node_modules layout. |
| **Testing / Linting** | (future) **ESLint**, **Prettier**, **Playwright** | Recommended for the next iteration. |

---

## Architecture & Design System

### High‑Level Flow

```mermaid
flowchart TD
    A[App.jsx] --> B[ThreeDScene (Canvas)]
    A --> C[Navbar]
    A --> D[HeroSection]
    A --> E[DimensionSection]
    A --> F[JourneySection]
    A --> G[InteractiveSection]
    A --> H[FinalSection]
    A --> I[Footer]
    B --> J[HeroLiquidSphere] & K[SceneLights]
```

* `App.jsx` mounts the UI stack and the 3‑D canvas (behind the DOM). 
* Global state (`useNexusStore`) is consumed by UI components to change cursor style, distortion intensity, and core colour of the sphere. 
* `Lenis` updates GSAP’s `ScrollTrigger` on every virtual scroll tick, keeping pinned sections perfectly synced. 

### Design Tokens (Tailwind config)

```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f0ff',
        'neon-purple': '#b800ff',
        'neon-violet': '#7928ca',
        'chrome-dark': '#1a1a1a',
        'chrome-silver': '#c0c0c0',
        'charcoal-900': '#0d0d0d',
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0,240,255,0.3)',
        'neon-glow': '0 0 30px rgba(0,240,255,0.6)',
      },
    },
  },
};
```

These tokens drive every UI element, ensuring a cohesive visual language across the site. 

---

## Installation & Development

```bash
# 1️⃣ Clone the repo
git clone https://github.com/UniverseExplorer24825/Practice-website.git
cd Practice-website

# 2️⃣ Install dependencies (pnpm is recommended)
pnpm install

# 3️⃣ Run the development server
pnpm dev
# → http://localhost:5173 (Lenis‑GSAP sync active)
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts Vite dev server with hot‑module replacement. |
| `pnpm build` | Generates a production‑ready `dist/` folder (minified, tree‑shaken). |
| `pnpm preview` | Serves the built assets locally (`http://localhost:4173`). |
| `pnpm lint` *(future)* | Run ESLint/Prettier checks. |
| `pnpm test` *(future)* | Run Playwright end‑to‑end tests. |

---

## Build & Deployment

```bash
# Build for production
pnpm build

# Deploy (Vercel example)
vercel --prod
```

The official live URL is: https://practice-website-orpin.vercel.app 

Vercel automatically picks up the `dist/` folder from the `build` script. No environment variables are required for the current version. 

---

## Accessibility & Performance

| Concern | Implementation |
|---------|----------------|
| **Reduced‑motion** | `src/hooks/useReducedMotion.js` reads `prefers-reduced-motion` and disables continuous rotation, GSAP scrub, and long Framer‑Motion durations. |
| **Keyboard focus** | Buttons use `focus-visible:outline` utilities; cards have `tabIndex={0}` and clear `aria-label`s. |
| **ARIA** | All interactive elements expose descriptive `aria-label` attributes (e.g., “Enter the matrix”, “Toggle sound”). |
| **Contrast** | Neon text on dark background meets WCAG AA; a high‑contrast mode can be toggled via a data attribute (`[data-high-contrast]`). |
| **Mobile performance** | Geometry detail of the sphere drops (`detail = isMobile ? 12 : 26`). Mousemove handlers are throttled with `requestAnimationFrame`. |
| **Bundle size** | Production build≈ 1.4 MB (JS) with a warning about chunk size; code‑splitting can be added later via `manualChunks`. |

Run Chrome Lighthouse (Accessibility, Performance, Best Practices) to verify compliance – all scores are currently in the green zone. 

---

## Folder Structure

```
Practice-website/
├─ src/
│  ├─ App.jsx                       # Root component
│  ├─ store/                        # Zustand store (useNexusStore)
│  ├─ hooks/                        # useReducedMotion.js
│  ├─ components/
│  │  ├─ dom/                       # UI sections (Navbar, Hero, etc.)
│  │  ├─ 3d/                        # Three.js scene, lights, sphere
│  │  ├─ ui/                        # Button, Badge, MagneticButton
│  │  └─ reactbits/                 # SplitText, DecryptedText, BlurText, SpotlightCard
│  └─ utils/
│     └─ gsapConfig.js               # Lenis‑GSAP integration
├─ public/                           # Static assets (favicon, robots.txt)
├─ tailwind.config.js
├─ vite.config.ts
├─ postcss.config.js
├─ package.json
└─ README.md                         # ← this file
```

---

## How to Contribute

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feat/your-feature`).
3. **Make your changes** and run `pnpm lint` / `pnpm test` (if set up).
4. **Commit** with a clear message (`git commit -m "feat: add X"`).
5. **Push** to your fork and open a **Pull Request** against `main`.

Please keep the following conventions:

- Use **functional components** and **React hooks** only.
- Follow the existing **Tailwind utility** pattern; avoid custom CSS unless absolutely necessary.
- Write **ARIA labels** for any new interactive element.
- Update the **README** if you add new scripts or public pages.

---

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Prepared by the Antigravity development team. For any questions, raise an issue in the repository or contact the maintainers.*
