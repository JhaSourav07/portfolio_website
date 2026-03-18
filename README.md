# ⬡ Sourav Jha — Interactive Portfolio

> A blockchain-node-inspired interactive portfolio built with **Next.js 16**, **React 19**, and **Force Graph** — where skills, projects, and experience are explored as a live node network.

---

## ✨ Features

- **Interactive Force Graph** — Nodes expand on click, revealing skills, projects, and contact info as a physics-driven network
- **Genesis Node System** — Start from a single origin node and progressively reveal the entire portfolio
- **Animated Info Panel** — Slides in with rich content for each selected node
- **Live Particle Background** — Canvas-drawn animated grid with floating particles
- **HUD Overlay** — Futuristic heads-up display showing network status and breadcrumb navigation
- **Fully Responsive** — Adapts zoom and layout for mobile and desktop
- **Smooth Animations** — Powered by Framer Motion throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Graph Engine | `react-force-graph-2d` + D3 force simulation |
| Animations | Framer Motion |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Language | TypeScript |
| Font | Space Grotesk + JetBrains Mono |
| Analytics | Vercel Analytics |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **>= 20.9.0**
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/JhaSourav07/portfolio_website.git
cd portfolio_website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with fonts & metadata
│   └── page.tsx           # Main page — composes all components
├── components/
│   ├── BackgroundGrid.tsx # Animated canvas particle background
│   ├── HUD.tsx            # Heads-up display overlay
│   ├── InfoPanel.tsx      # Slide-in detail panel for selected nodes
│   └── NodeNetwork.tsx    # Force graph renderer with custom node drawing
├── data/
│   └── portfolioData.ts   # All nodes, links, and content data
├── hooks/
│   └── useGraphState.ts   # State management for graph expansion & selection
└── types/
    └── graph.ts           # TypeScript interfaces for nodes and links
```

---

## 🗺 How It Works

The portfolio is modelled as a **graph data structure**:

```
Genesis (Sourav Jha)
├── Projects
│   ├── Anuvaad
│   ├── Stromin
│   ├── CryptoPulse
│   └── TicTakToe
├── Skills
│   ├── React, Next.js, TypeScript, Tailwind CSS
│   ├── Node.js, Express, Python
│   ├── Solidity, Hardhat, Ethers.js
│   └── Docker, Git, Linux
├── Experience
│   └── Journey Updates
└── Contact
    ├── GitHub
    ├── LinkedIn
    └── Email
```

1. The page loads showing only the **Genesis node**
2. Clicking it **expands** the four main category nodes
3. Clicking any main node **toggles** its child nodes into view
4. Clicking any child node **opens the Info Panel** with full details
5. D3 force simulation handles all physics-based positioning automatically

---

## ✏️ Customising Content

All portfolio content lives in a single file — **`src/data/portfolioData.ts`**.

### Adding a Project

```ts
{
  id: 'proj-my-app',
  label: 'My App',
  type: 'project',
  parentId: 'projects',
  category: 'fullstack',
  visible: false,
  emoji: '🚀',
  color: '#8b5cf6',
  size: 13,
  content: {
    project: {
      name: 'My App',
      description: 'A brief description of your project.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/you/my-app',
      demo: 'https://my-app.vercel.app',
      category: 'fullstack',
    },
  },
},
```

Then add the corresponding link:

```ts
{ source: 'projects', target: 'proj-my-app' },
```

### Adding a Skill

```ts
{
  id: 'skill-rust',
  label: 'Rust',
  type: 'skill',
  parentId: 'skills',
  category: 'backend',
  visible: false,
  emoji: '◆',
  color: '#34d399',
  size: 11,
  content: { skill: { name: 'Rust', category: 'backend', level: 'beginner' } },
},
```

---

## 🎨 Theming

CSS variables are defined in `src/app/globals.css`:

```css
:root {
  --color-bg: #050510;
  --color-violet: #7c3aed;
  --color-indigo: #6366f1;
  --color-cyan: #06b6d4;
  --color-emerald: #10b981;
  --color-amber: #f59e0b;
  --color-pink: #ec4899;
}
```

Node colors per type are set in `NodeNetwork.tsx` and individually on each node object in `portfolioData.ts`.

---

## 📦 Deployment

This project is optimised for **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 📜 License

MIT © [Sourav Jha](https://github.com/JhaSourav07)
