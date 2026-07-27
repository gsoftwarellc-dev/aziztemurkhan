# SkinJago — Marketplace Skin & Item Game Indonesia

Frontend for an Indonesian digital storefront selling game skins, in-game items,
vouchers, and top-ups. Bahasa Indonesia first, IDR pricing, mobile-first, QRIS as
the primary payment method.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
- shadcn/ui patterns on Radix primitives
- react-i18next (Indonesian default, English optional)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  components/
    catalog/    product cards, game cards, filter panel
    home/       hero, trust, how-it-works, reviews
    layout/     header, footer, floating buttons
    ui/         button, input, badge, card, sheet, accordion
  context/      cart provider (localStorage-backed)
  data/         games, products, checkout fields, reviews, company info
  i18n/         locale setup and id/en translations
  lib/          catalog filtering, order store, formatting, labels
  pages/        one file per route
  types/        domain model
```

## Design system

Monochrome by design: `#ffffff` surface, `#000000` ink, Inter throughout. All
colour lives in CSS variables in `src/index.css`, so a dark theme is a variable
remap rather than a component rewrite. Colour appears in only three places, each
deliberate: order/stock status badges, the animated CTA ring, and the blue
verified check on reviews.

## Checkout fields are data-driven

Each product declares the fields its checkout needs (`src/data/checkout-fields.ts`),
so a Mobile Legends order asks for User ID + Zone ID, a Free Fire order asks only
for Player ID, and a Counter-Strike 2 order asks for a Steam Trade URL. This
mirrors the requirement that fields be configurable per product from the admin
panel later.

## Current scope

This is the **frontend phase**. Cart and orders persist to `localStorage` behind
the same shapes a real API would return, and `src/types/index.ts` mirrors the
planned Laravel/MySQL schema, so wiring the backend is a transport change rather
than a rewrite.

The payment page includes demo controls that stand in for the QRIS provider
webhook. The QR code is a visual placeholder and is **not** scannable.

### Not yet built

- Laravel + MySQL backend
- Real QRIS provider integration (Midtrans / Xendit / DOKU)
- Transactional email (Brevo)
- Admin panel

## Before launch — required replacements

| What | Where | Why |
| --- | --- | --- |
| NIB / NPWP / address | `src/data/company.ts` | Currently placeholder values |
| Customer reviews | `src/data/reviews.ts` | Written examples, not real testimonials |
| Product & game imagery | `src/data/product-images.ts`, `src/data/games.ts` | Currently licensed stock photos |

Product artwork must be imagery the business is licensed to use. Publisher game
art (official skin renders, weapon models, character art) is copyrighted and must
not be hotlinked — the footer already disclaims any publisher affiliation.

## Deployment

Configured for Vercel. `vercel.json` rewrites all paths to `index.html` so
client-side routes survive a page refresh.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
