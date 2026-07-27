import type { Game } from '@/types'

const cover = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`

/**
 * Launch catalogue of games. Ordered by popularity in the Indonesian market.
 * Logos are rendered as monogram tiles in the UI, so `logo` holds the monogram
 * text rather than an asset path — keeps the build free of licensed artwork
 * until the client supplies official brand assets.
 */
export const games: Game[] = [
  {
    id: 'ml',
    slug: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
    publisher: 'Moonton',
    tagline: 'Skin epik, diamond, dan starlight member',
    logo: 'ML',
    cover: 'from-mono-900 to-mono-700',
    coverUrl: cover('1542751371-adc38448a05e'),
    productCount: 48,
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
    coverUrl: cover('1493711662062-fa541adb3fc8'),
    productCount: 36,
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
    coverUrl: cover('1519669556878-63bdad8a1a49'),
    productCount: 29,
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
    coverUrl: cover('1584735174914-6b1eb0d0d8b2'),
    productCount: 52,
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
    coverUrl: cover('1542751110-97427bbecf20'),
    productCount: 24,
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
    coverUrl: cover('1518709268805-4e9042af9f23'),
    productCount: 18,
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
    coverUrl: cover('1633988354540-d3f4e97c67b5'),
    productCount: 15,
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
    coverUrl: cover('1560253023-3ec5d502959f'),
    productCount: 12,
    featured: false,
  },
]

export const gameById = new Map(games.map((game) => [game.id, game]))
export const gameBySlug = new Map(games.map((game) => [game.slug, game]))
