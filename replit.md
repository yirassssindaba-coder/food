# Planetono – 3D Food Universe

## Project Overview
A premium cinematic 3D food website inspired by the Planetono experience. Built as an interactive scroll-driven food atlas featuring 40+ world foods organized in four thematic groups. The design closely follows the Planetono blueprint with a dark cosmic aesthetic, food as 3D heroes, and scroll-driven animations.

## Architecture
- **Framework**: React 18 + Vite 5 + TypeScript
- **3D Engine**: React Three Fiber + Drei (Three.js)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v3
- **Port**: 5000 (frontend only, no backend)

## Site Structure
1. **Loading Screen** – Animated food emoji cycler with star field, progress bar
2. **Entry Gate** – Cinematic "Start" gate with headphone prompt, floating food emojis
3. **Header** – Thin fixed navbar with center logo, sound toggle
4. **Hero Scene** – 3D burger hero rendered in Three.js canvas, orbiting particles, stars
5. **Marquee Strip** – Scrolling food names ticker
6. **Food Worlds** – 4 alternating scene panels: Galaxy Burger, Stellar Sausage, Pizza Cosmos, Breakfast Cosmos
7. **Featured Foods** – 12-item food card grid with hover effects
8. **How It Works** – 4-step process panel
9. **Food Atlas** – Interactive world map with region pins, 4 category cards
10. **Footer** – Closing concept section with CTA

## Food Content (from Compendium)
- **Group 1**: Grains, Legumes & Proteins (Adzuki Bean, Almond, Anchovy, Bacon, Barley, Cornmeal, Couscous, Crab, Duck, Edamame)
- **Group 2**: Fruits, Vegetables & Fresh Produce (Apple, Apricot, Arugula, Avocado, Banana, Mango, Rambutan, Raspberry, Asparagus, Radish)
- **Group 3**: Breads, Flatbreads & Baked Goods (Brioche, Challah, Scone, Simit, Khachapuri, Shokupan, Lavash, Burek, Kaak, Bread Roll)
- **Group 4**: Breakfast & Porridges (Appam, Hard-boiled Egg, Paper Dosa, Arroz Caldo, Hash Browns, Poached Egg, Porridge, Cereal, Huevos Rancheros, Biscuits & Gravy)

## Design Tokens
- **Colors**: `#E63329` (red), `#F47B20` (orange), `#F9C11A` (yellow), `#FDF3E3` (cream), `#0D0500` (dark)
- **Typography**: DM Sans (Google Fonts)
- **Motion**: 4-lane system – hero drop, ambient float, orbit/parallax, microreaction

## Books Section (3 books side by side)
A unified `BooksSection` shows 3 book covers horizontally, with a shared reader panel:
- **Component**: `src/components/BooksSection.tsx`
- **Book 1 — Makanan Dunia** (gold `#F9C11A`): 80+ foods, 4 groups, data from `src/data/compendium.ts`
- **Book 2 — Resep & Minuman Dunia** (green `#95D5B2`): 48+ recipes from 8 world regions, data from `src/data/culinarax.ts`
- **Book 3 — Minuman Dunia** (blue `#74B9FF`): 42+ drinks in 6 categories, data from `src/data/drinks.ts`
- Layout: 3 covers in horizontal row, clicking a cover opens its reader panel below
- Each reader has: category/region tabs, search, food/drink filter, animated page navigation

## Backend
- **Express server**: `server.mjs` on port 3001 (contact form email via Nodemailer)
- Run via `concurrently` alongside Vite frontend

## Commands
- `npm run dev` – Start development server on port 5000 (frontend + backend concurrently)
- `npm run build` – Build for production (outputs to /dist)
