import type { Game } from '@/types'
import { products } from './products'

/**
 * Launch catalogue of games. Ordered by popularity in the Indonesian market.
 *
 * `logo` holds the monogram rendered on the identity tile. `coverUrl` points at
 * a licensed cover asset in `public/games/` once the client supplies one — set
 * it per game as artwork arrives; games without it fall back to their identity
 * gradient from `product-images.ts`, which is a designed state rather than a
 * placeholder.
 */
const gameDefinitions: Omit<Game, 'productCount'>[] = [
  {
    id: 'ml',
    slug: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    tagline: 'Skin epik, diamond, dan starlight member',
    logo: 'ML',
    cover: 'from-mono-900 to-mono-700',
    featured: true,
  },
  {
    id: 'ff',
    slug: 'free-fire',
    name: 'Free Fire',
    publisher: 'Garena',
    tagline: 'Bundle, diamond, dan item eksklusif',
    logo: 'FF',
    cover: 'from-mono-800 to-mono-600',
    featured: true,
  },
  {
    id: 'pubgm',
    slug: 'pubg-mobile',
    name: 'PUBG Mobile',
    publisher: 'Tencent Games',
    tagline: 'UC, Royale Pass, dan skin senjata',
    logo: 'PM',
    cover: 'from-mono-950 to-mono-800',
    featured: true,
  },
  {
    id: 'csgo',
    slug: 'counter-strike-2',
    name: 'Counter-Strike 2',
    publisher: 'Valve',
    tagline: 'Skin senjata, knife, dan sarung tangan',
    logo: 'CS',
    cover: 'from-mono-900 to-mono-600',
    featured: true,
  },
  {
    id: 'valorant',
    slug: 'valorant',
    name: 'Valorant',
    publisher: 'Riot Games',
    tagline: 'Valorant Point dan bundle skin',
    logo: 'VL',
    cover: 'from-mono-800 to-mono-950',
    featured: true,
  },
  {
    id: 'genshin',
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    publisher: 'HoYoverse',
    tagline: 'Genesis Crystal dan Blessing bulanan',
    logo: 'GI',
    cover: 'from-mono-700 to-mono-900',
    featured: true,
  },
  {
    id: 'roblox',
    slug: 'roblox',
    name: 'Roblox',
    publisher: 'Roblox Corporation',
    tagline: 'Robux dan langganan Premium',
    logo: 'RB',
    cover: 'from-mono-600 to-mono-900',
    featured: false,
  },
  {
    id: 'hok',
    slug: 'honor-of-kings',
    name: 'Honor of Kings',
    publisher: 'Level Infinite',
    tagline: 'Token dan skin hero pilihan',
    logo: 'HK',
    cover: 'from-mono-900 to-mono-950',
    featured: false,
  },
]

/**
 * Product counts are derived from the actual catalogue, never hardcoded.
 *
 * These numbers appear in the sidebar filter and on game cards, so a hardcoded
 * value drifts the moment the catalogue changes — which is exactly what caused
 * the sidebar to advertise 52 Counter-Strike items while search returned 3.
 * Counting the real array means the figure cannot disagree with the results.
 */
const countsByGame = products.reduce<Record<string, number>>((counts, product) => {
  counts[product.gameId] = (counts[product.gameId] ?? 0) + 1
  return counts
}, {})

export const games: Game[] = gameDefinitions.map((game) => ({
  ...game,
  productCount: countsByGame[game.id] ?? 0,
}))

export const gameById = new Map(games.map((game) => [game.id, game]))
export const gameBySlug = new Map(games.map((game) => [game.slug, game]))
