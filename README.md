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

## Accounts

Registration, login, and per-account order history live in
`src/context/auth-context.tsx`, backed by `src/lib/auth-store.ts`.

**`auth-store.ts` is not authentication.** It is a localStorage stand-in so the
account flows can be built and reviewed before the API exists. The password
digest is non-cryptographic and trivially reversible; there is no session
expiry, CSRF protection, or rate limiting. Delete the file when the backend
lands and move registration/login server-side (Laravel Sanctum or equivalent,
bcrypt/argon2, httpOnly session cookie). The `AuthProvider` API is shaped so
that swap is a change of transport, not of components.

Signed-in customers get order history, saved game IDs that prefill checkout on
repeat purchases, and their orders listed on the tracking page without needing
a reference number. Guest orders carry no `userId` and stay reference-only.

### Checkout requires login

`REQUIRE_LOGIN_TO_CHECKOUT` in `src/lib/store-config.ts` gates checkout behind
an account.

> ⚠️ The client TOR specifies *"Checkout: guest checkout (no mandatory
> registration) + optional account"*. This flag is `true` on explicit client
> instruction, overriding that line. Flip it to `false` to restore the
> TOR-compliant guest flow — all account features keep working either way,
> because they are additive rather than gating.

## Current scope

This is the **frontend phase**. Cart, accounts, and orders persist to
`localStorage` behind the same shapes a real API would return, and
`src/types/index.ts` mirrors the planned Laravel/MySQL schema, so wiring the
backend is a transport change rather than a rewrite.

The payment page includes demo controls that stand in for the QRIS provider
webhook. The QR code is a visual placeholder and is **not** scannable.

### Not yet built

- Laravel + MySQL backend (including real authentication — see Accounts above)
- Real QRIS provider integration (Midtrans / Xendit / DOKU)
- Transactional email (Brevo)
- Admin panel

## Catalogue

`src/data/products.ts` merges two sources into one `products` array:

- **`curatedProducts`** — the flagship listings with bespoke Indonesian copy,
  surfaced as featured/popular on the homepage
- **`generatedProducts`** — catalogue depth from `src/data/generated-products.ts`

The generator walks the real denomination ladders each publisher sells (ML
diamonds, FF diamonds, PUBG UC, VP, Genesis Crystals, Robux, HoK tokens) and
the skin lines that trade on the CS2/Valorant markets, pricing everything off
the per-unit rates recorded in `pricing-sources.ts`. It uses a seeded PRNG, so
the catalogue is identical across reloads and builds.

⚠️ Generated listings are **structurally realistic, not a supplier inventory**.
Names, stock levels, and sold counts are derived rather than quoted. Replace
`generatedProducts` with a real feed via `importProducts()` (documented at the
foot of `generated-products.ts`) — nothing else in the app needs to change.

### Product counts are derived, never hardcoded

`productCount` on each game is computed from the real catalogue in
`src/data/games.ts`. It used to be a hand-written number, which is why the
sidebar once advertised 52 Counter-Strike items while search returned 3.
Counting the same array the results come from makes that class of bug
impossible — **do not reintroduce a literal count.**

## Pricing

Catalogue prices are **market reference values**, not selling prices. Every
figure traces to a source and check date in `src/data/pricing-sources.ts`.

The business must apply its own margin over supplier cost before launch. The
CS2 entries (`p-cs2-knife`, `p-cs2-ak`, `p-cs2-gloves`) track a live float
market, go stale within days, and should be wired to a market data feed rather
than edited by hand. `usdToIdr` in the same file records the conversion rate
used — recheck it when refreshing.

## Product imagery

`src/data/product-images.ts` resolves artwork in two steps: a licensed asset
file if one is registered, otherwise the game's identity tile (a branded
gradient carrying the product monogram). The tile is a designed fallback, not a
placeholder — a missing asset degrades gracefully instead of showing a broken
image or an unrelated stock photo.

To add licensed artwork:

1. Drop the file into `public/products/`, named after the product id
   (e.g. `public/products/p-cs2-knife.webp`)
2. Add the id and extension to `licensedAssets` in `src/data/product-images.ts`
3. Nothing else changes — cards, detail pages, cart and order history pick it up

Prefer `.webp` at ~800px on the long edge, under ~120KB. Game covers work the
same way via each game's `coverUrl` in `src/data/games.ts`.

Only ship artwork the business is licensed to use. Publisher game art is
copyrighted, and the footer disclaims any publisher affiliation — keep the
licence documentation for each asset with the client's records.

## Before launch — required replacements

| What | Where | Why |
| --- | --- | --- |
| NIB / NPWP / address | `src/data/company.ts` | Currently placeholder values |
| Customer reviews | `src/data/reviews.ts` | Written examples, not real testimonials |
| Product & game imagery | `public/products/`, `src/data/product-images.ts` | Identity tiles until licensed art is supplied |
| Selling prices | `src/data/products.ts` | Market reference values, no margin applied |
| Authentication | `src/lib/auth-store.ts` | localStorage demo, not real auth |
| Product catalogue | `src/data/generated-products.ts` | Generated depth, not supplier inventory |
| Legal policy blanks | `src/pages/legal.tsx` | 12 clauses marked `[PERLU KONFIRMASI]` |

### Legal pages need sign-off

`src/pages/legal.tsx` is written around how the storefront actually works — the
three delivery methods, the seven order statuses, the per-product checkout
fields, QRIS timeouts. Twelve clauses are marked `[PERLU KONFIRMASI]` and
render highlighted on the page: response windows, retention periods, the refund
window, the trade-offer deadline, third-party processors, and the dispute
venue. **The site must not launch with those markers visible.**

An Indonesian lawyer should review the final text against UU PDP (27/2022), UU
ITE, UU Perlindungan Konsumen (8/1999), and PP 80/2019.

## Deployment

Configured for Vercel. `vercel.json` rewrites all paths to `index.html` so
client-side routes survive a page refresh.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
