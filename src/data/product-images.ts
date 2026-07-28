/**
 * Product artwork registry.
 *
 * Resolution order for any product image:
 *   1. A licensed asset file dropped into `public/products/` (see below)
 *   2. The game's designed identity tile (colour + monogram) as the fallback
 *
 * The business has confirmed a reseller/licensing agreement covering official
 * game artwork, so real skin renders and item art belong here. Until those
 * files are supplied, products fall back to the per-game identity tile rather
 * than to unrelated stock photography — a neutral tile reads as deliberate
 * design, a photo of a random gaming keyboard reads as a broken listing.
 *
 * HOW TO ADD LICENSED ARTWORK
 * ---------------------------
 * 1. Drop the file into `public/products/` named after the product id,
 *    e.g. `public/products/p-cs2-knife.webp`
 * 2. Add the id to `licensedAssets` below with its file extension.
 * 3. Nothing else changes — cards, detail pages and cart lines pick it up.
 *
 * Prefer .webp at ~800px on the long edge, under ~120KB. Keep the source files
 * and their licence documentation outside the repo with the client's records.
 */

/**
 * Product ids that have a licensed artwork file present in `public/products/`.
 * Add entries here as the client supplies assets. An id listed here without a
 * matching file will fall back to the identity tile via ProductThumb's error
 * handler, so a typo degrades gracefully rather than showing a broken image.
 */
const licensedAssets: Record<string, string> = {
  // 'p-cs2-knife': 'webp',
  // 'p-ml-skin-legend': 'webp',
}

export const productImages: Record<string, string> = Object.fromEntries(
  Object.entries(licensedAssets).map(([id, ext]) => [id, `/products/${id}.${ext}`]),
)

/**
 * Per-game visual identity used for the fallback tile.
 *
 * These are brand-adjacent colours chosen to make each game recognisable at a
 * glance in a dense grid — they are not publisher logos and carry no licensing
 * exposure. `from`/`to` are raw CSS colours so the tile renders identically
 * regardless of the monochrome Tailwind theme.
 */
export interface GameIdentity {
  from: string
  to: string
  /** Text colour that meets contrast on the gradient above. */
  ink: string
}

export const gameIdentities: Record<string, GameIdentity> = {
  ml: { from: '#1e3a8a', to: '#3b82f6', ink: '#ffffff' },
  ff: { from: '#7c2d12', to: '#f97316', ink: '#ffffff' },
  pubgm: { from: '#78350f', to: '#f59e0b', ink: '#1c1917' },
  csgo: { from: '#292524', to: '#78716c', ink: '#ffffff' },
  valorant: { from: '#7f1d1d', to: '#ef4444', ink: '#ffffff' },
  genshin: { from: '#155e75', to: '#22d3ee', ink: '#0c2d33' },
  roblox: { from: '#1f2937', to: '#6b7280', ink: '#ffffff' },
  hok: { from: '#4c1d95', to: '#a78bfa', ink: '#ffffff' },
}

/** Neutral identity for anything not matched above. */
export const fallbackIdentity: GameIdentity = {
  from: '#1c1917',
  to: '#57534e',
  ink: '#ffffff',
}

export const identityForGame = (gameId?: string): GameIdentity =>
  (gameId && gameIdentities[gameId]) || fallbackIdentity
