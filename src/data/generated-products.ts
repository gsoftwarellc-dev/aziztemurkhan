import type { Availability, Product, Rarity } from '@/types'
import {
  accountLoginFields,
  contactFields,
  freeFireFields,
  genshinFields,
  mobileLegendsFields,
  pubgFields,
  riotFields,
  steamTradeFields,
} from './checkout-fields'

/**
 * Generated catalogue depth.
 *
 * The hand-written catalogue in `products.ts` covers the flagship SKUs with
 * bespoke copy. This module expands it to full storefront scale by walking the
 * real denomination ladders each publisher actually sells, plus the skin lines
 * that trade on the CS2/Valorant markets.
 *
 * WHY GENERATED: the client asked for 500+ listings before a supplier feed
 * exists. Deriving them from real denominations and the per-unit rates in
 * `pricing-sources.ts` keeps the catalogue internally consistent — prices scale
 * correctly against each other and against the hand-written entries — rather
 * than inventing 500 arbitrary numbers.
 *
 * ⚠️ HANDOVER: these are structurally realistic, not a supplier inventory.
 * Product names, stock levels and sold counts are derived, not quoted. Replace
 * this module with a real import once the supplier list exists — see
 * `importProducts()` at the foot of this file for the intended shape. Nothing
 * else in the app needs to change: `products.ts` re-exports the merged list.
 */

/** Deterministic PRNG so the catalogue is stable across reloads and builds. */
function seeded(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0xffffffff
  }
}

const random = seeded(20260728)

const between = (min: number, max: number) => min + Math.floor(random() * (max - min + 1))

/** Round to a tidy IDR figure so generated prices look quoted, not computed. */
function tidyPrice(value: number): number {
  if (value >= 1_000_000) return Math.round(value / 5_000) * 5_000
  if (value >= 100_000) return Math.round(value / 1_000) * 1_000
  return Math.round(value / 500) * 500
}

function availabilityFor(stock: number): Availability {
  if (stock === 0) return 'habis'
  if (stock <= 5) return 'stok-menipis'
  return 'tersedia'
}

interface GeneratedInput {
  id: string
  slug: string
  name: string
  gameId: string
  gameName: string
  category: Product['category']
  rarity?: Rarity
  description: string
  highlights: string[]
  image: string
  price: number
  deliveryMethod: Product['deliveryMethod']
  estimatedDelivery: string
  checkoutFields: Product['checkoutFields']
}

/** Fill in the commercial fields every listing needs, with plausible spread. */
function build(input: GeneratedInput): Product {
  const stock = random() < 0.06 ? 0 : between(3, 400)
  const hasDiscount = random() < 0.35
  const rating = Number((4.3 + random() * 0.7).toFixed(1))

  return {
    ...input,
    compareAtPrice: hasDiscount ? tidyPrice(input.price * (1.1 + random() * 0.25)) : undefined,
    availability: availabilityFor(stock),
    stock,
    rating,
    reviewCount: between(8, 2400),
    soldCount: between(40, 18_000),
    featured: false,
    popular: random() < 0.2,
    createdAt: new Date(
      Date.UTC(2026, between(0, 6), between(1, 28), 1, 0, 0),
    ).toISOString(),
  }
}

// ---------------------------------------------------------------------------
// Top-up denomination ladders
// ---------------------------------------------------------------------------

interface Ladder {
  gameId: string
  gameName: string
  /** Unit label, e.g. "Diamond". */
  unit: string
  /** Denominations the publisher actually sells. */
  amounts: number[]
  /** IDR per unit, from the researched rates in `pricing-sources.ts`. */
  rate: number
  monogram: string
  fields: Product['checkoutFields']
  deliveryMethod: Product['deliveryMethod']
  estimatedDelivery: string
}

const ladders: Ladder[] = [
  {
    gameId: 'ml',
    gameName: 'Mobile Legends: Bang Bang',
    unit: 'Diamond',
    amounts: [
      5, 12, 19, 28, 44, 59, 85, 86, 110, 172, 257, 275, 344, 429, 514, 568, 706, 875,
      1050, 1167, 1412, 1755, 2195, 2901, 3688, 4394, 5532, 7290, 9288, 11_483,
    ],
    rate: 270,
    monogram: 'DM',
    fields: [...mobileLegendsFields, ...contactFields],
    deliveryMethod: 'otomatis',
    estimatedDelivery: '1 - 5 menit',
  },
  {
    gameId: 'ff',
    gameName: 'Free Fire',
    unit: 'Diamond',
    amounts: [
      5, 12, 20, 50, 70, 100, 140, 210, 250, 310, 355, 420, 520, 720, 850, 1000, 1060,
      1450, 2180, 2530, 3640, 4400, 5600, 7290, 9300, 12_000,
    ],
    rate: 152,
    monogram: 'DM',
    fields: [...freeFireFields, ...contactFields],
    deliveryMethod: 'otomatis',
    estimatedDelivery: '1 - 5 menit',
  },
  {
    gameId: 'pubgm',
    gameName: 'PUBG Mobile',
    unit: 'UC',
    amounts: [
      30, 60, 120, 180, 325, 385, 660, 720, 985, 1320, 1800, 1980, 2125, 3850, 4200,
      5650, 8100, 11_950, 16_200, 20_000, 32_400,
    ],
    rate: 233,
    monogram: 'UC',
    fields: [...pubgFields, ...contactFields],
    deliveryMethod: 'otomatis',
    estimatedDelivery: '1 - 10 menit',
  },
  {
    gameId: 'valorant',
    gameName: 'Valorant',
    unit: 'Valorant Point',
    amounts: [125, 275, 420, 700, 1000, 1375, 2050, 2400, 3650, 4650, 5350, 8100, 11_000],
    rate: 110,
    monogram: 'VP',
    fields: [...riotFields, ...contactFields],
    deliveryMethod: 'manual',
    estimatedDelivery: '10 - 45 menit',
  },
  {
    gameId: 'genshin',
    gameName: 'Genshin Impact',
    unit: 'Genesis Crystal',
    amounts: [60, 300, 330, 980, 1090, 1980, 2240, 3280, 3880, 6480, 8080, 12_960],
    rate: 254,
    monogram: 'GC',
    fields: [...genshinFields, ...contactFields],
    deliveryMethod: 'otomatis',
    estimatedDelivery: '5 - 20 menit',
  },
  {
    gameId: 'roblox',
    gameName: 'Roblox',
    unit: 'Robux',
    amounts: [80, 160, 240, 400, 800, 1000, 1700, 2000, 2400, 4500, 5000, 10_000, 22_500],
    rate: 188,
    monogram: 'RX',
    fields: [...accountLoginFields, ...contactFields],
    deliveryMethod: 'manual',
    estimatedDelivery: '30 - 120 menit',
  },
  {
    gameId: 'hok',
    gameName: 'Honor of Kings',
    unit: 'Token',
    amounts: [16, 80, 240, 400, 560, 840, 1680, 2400, 3360, 5600, 8400, 16_800],
    rate: 267,
    monogram: 'TK',
    fields: [...accountLoginFields, ...contactFields],
    deliveryMethod: 'otomatis',
    estimatedDelivery: '5 - 20 menit',
  },
]

const formatAmount = (value: number) => value.toLocaleString('id-ID')

function topUpProducts(): Product[] {
  return ladders.flatMap((ladder) =>
    ladder.amounts.map((amount) => {
      const label = `${formatAmount(amount)} ${ladder.unit}`
      return build({
        id: `g-${ladder.gameId}-${ladder.unit.toLowerCase().replace(/\s+/g, '')}-${amount}`,
        slug: `${ladder.gameId}-${amount}-${ladder.unit.toLowerCase().replace(/\s+/g, '-')}`,
        name: label,
        gameId: ladder.gameId,
        gameName: ladder.gameName,
        category: 'top-up',
        description: `Paket ${label} untuk ${ladder.gameName}. Pengisian dilakukan langsung ke akun Anda tanpa perlu memberikan kata sandi. Cukup masukkan data akun pada saat checkout.`,
        highlights: [
          `${label} masuk langsung ke akun`,
          'Tanpa perlu kata sandi akun Anda',
          'Diproses oleh distributor tepercaya',
        ],
        image: ladder.monogram,
        price: tidyPrice(amount * ladder.rate),
        deliveryMethod: ladder.deliveryMethod,
        estimatedDelivery: ladder.estimatedDelivery,
        checkoutFields: ladder.fields,
      })
    }),
  )
}

// ---------------------------------------------------------------------------
// CS2 / Valorant skin lines
// ---------------------------------------------------------------------------

/** Wear tiers multiply the base value, as they do on the real market. */
const wears = [
  { name: 'Factory New', factor: 1 },
  { name: 'Minimal Wear', factor: 0.72 },
  { name: 'Field-Tested', factor: 0.48 },
  { name: 'Well-Worn', factor: 0.36 },
  { name: 'Battle-Scarred', factor: 0.28 },
] as const

/** Base USD values, converted at the rate recorded in `pricing-sources.ts`. */
const USD_TO_IDR = 17_950

const cs2Lines: { weapon: string; skin: string; usd: number; rarity: Rarity }[] = [
  { weapon: 'AK-47', skin: 'Asiimov', usd: 62, rarity: 'epik' },
  { weapon: 'AK-47', skin: 'Vulcan', usd: 118, rarity: 'epik' },
  { weapon: 'AK-47', skin: 'Fire Serpent', usd: 640, rarity: 'legendaris' },
  { weapon: 'AK-47', skin: 'Bloodsport', usd: 74, rarity: 'epik' },
  { weapon: 'AK-47', skin: 'Neon Rider', usd: 41, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Dragon Lore', usd: 4200, rarity: 'mythic' },
  { weapon: 'AWP', skin: 'Asiimov', usd: 96, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Neo-Noir', usd: 58, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Wildfire', usd: 88, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Gungnir', usd: 2650, rarity: 'mythic' },
  { weapon: 'M4A4', skin: 'Howl', usd: 3900, rarity: 'mythic' },
  { weapon: 'M4A4', skin: 'Asiimov', usd: 44, rarity: 'epik' },
  { weapon: 'M4A1-S', skin: 'Printstream', usd: 128, rarity: 'epik' },
  { weapon: 'M4A1-S', skin: 'Hyper Beast', usd: 32, rarity: 'langka' },
  { weapon: 'Desert Eagle', skin: 'Blaze', usd: 410, rarity: 'legendaris' },
  { weapon: 'Desert Eagle', skin: 'Printstream', usd: 68, rarity: 'epik' },
  { weapon: 'USP-S', skin: 'Kill Confirmed', usd: 78, rarity: 'epik' },
  { weapon: 'Glock-18', skin: 'Fade', usd: 96, rarity: 'epik' },
  { weapon: 'Karambit', skin: 'Fade', usd: 1580, rarity: 'mythic' },
  { weapon: 'Karambit', skin: 'Slaughter', usd: 1120, rarity: 'mythic' },
  { weapon: 'Butterfly Knife', skin: 'Doppler', usd: 1340, rarity: 'mythic' },
  { weapon: 'Butterfly Knife', skin: 'Fade', usd: 1890, rarity: 'mythic' },
  { weapon: 'M9 Bayonet', skin: 'Doppler', usd: 940, rarity: 'mythic' },
  { weapon: 'M9 Bayonet', skin: 'Marble Fade', usd: 1080, rarity: 'mythic' },
  { weapon: 'Bayonet', skin: 'Tiger Tooth', usd: 720, rarity: 'mythic' },
  { weapon: 'Talon Knife', skin: 'Doppler', usd: 1260, rarity: 'mythic' },
  { weapon: 'Skeleton Knife', skin: 'Crimson Web', usd: 1420, rarity: 'mythic' },
  { weapon: 'Sport Gloves', skin: 'Pandora’s Box', usd: 1180, rarity: 'mythic' },
  { weapon: 'Specialist Gloves', skin: 'Crimson Kimono', usd: 1650, rarity: 'mythic' },
  { weapon: 'Driver Gloves', skin: 'King Snake', usd: 760, rarity: 'mythic' },
  { weapon: 'AK-47', skin: 'Case Hardened', usd: 210, rarity: 'legendaris' },
  { weapon: 'AK-47', skin: 'Slate', usd: 12, rarity: 'langka' },
  { weapon: 'AK-47', skin: 'Point Disarray', usd: 18, rarity: 'langka' },
  { weapon: 'AWP', skin: 'Lightning Strike', usd: 148, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Hyper Beast', usd: 46, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Containment Breach', usd: 62, rarity: 'epik' },
  { weapon: 'AWP', skin: 'Atheris', usd: 9, rarity: 'umum' },
  { weapon: 'M4A4', skin: 'Neo-Noir', usd: 38, rarity: 'epik' },
  { weapon: 'M4A4', skin: 'The Emperor', usd: 34, rarity: 'epik' },
  { weapon: 'M4A4', skin: 'Desolate Space', usd: 16, rarity: 'langka' },
  { weapon: 'M4A1-S', skin: 'Golden Coil', usd: 42, rarity: 'epik' },
  { weapon: 'M4A1-S', skin: 'Player Two', usd: 58, rarity: 'epik' },
  { weapon: 'M4A1-S', skin: 'Blue Phosphor', usd: 88, rarity: 'epik' },
  { weapon: 'Desert Eagle', skin: 'Code Red', usd: 36, rarity: 'epik' },
  { weapon: 'Desert Eagle', skin: 'Kumicho Dragon', usd: 22, rarity: 'langka' },
  { weapon: 'USP-S', skin: 'Neo-Noir', usd: 34, rarity: 'epik' },
  { weapon: 'USP-S', skin: 'Cortex', usd: 11, rarity: 'langka' },
  { weapon: 'Glock-18', skin: 'Water Elemental', usd: 14, rarity: 'langka' },
  { weapon: 'Glock-18', skin: 'Neo-Noir', usd: 17, rarity: 'langka' },
  { weapon: 'Five-SeveN', skin: 'Hyper Beast', usd: 13, rarity: 'langka' },
  { weapon: 'P250', skin: 'Asiimov', usd: 8, rarity: 'umum' },
  { weapon: 'Tec-9', skin: 'Fuel Injector', usd: 15, rarity: 'langka' },
  { weapon: 'MAC-10', skin: 'Neon Rider', usd: 12, rarity: 'langka' },
  { weapon: 'MP9', skin: 'Starlight Protector', usd: 19, rarity: 'langka' },
  { weapon: 'UMP-45', skin: 'Primal Saber', usd: 10, rarity: 'umum' },
  { weapon: 'P90', skin: 'Asiimov', usd: 21, rarity: 'langka' },
  { weapon: 'Galil AR', skin: 'Chatterbox', usd: 27, rarity: 'langka' },
  { weapon: 'FAMAS', skin: 'Roll Cage', usd: 9, rarity: 'umum' },
  { weapon: 'SSG 08', skin: 'Blood in the Water', usd: 44, rarity: 'epik' },
  { weapon: 'SG 553', skin: 'Integrale', usd: 13, rarity: 'langka' },
  { weapon: 'Nova', skin: 'Hyper Beast', usd: 7, rarity: 'umum' },
  { weapon: 'Flip Knife', skin: 'Marble Fade', usd: 640, rarity: 'mythic' },
  { weapon: 'Gut Knife', skin: 'Doppler', usd: 480, rarity: 'mythic' },
  { weapon: 'Huntsman Knife', skin: 'Fade', usd: 720, rarity: 'mythic' },
  { weapon: 'Falchion Knife', skin: 'Marble Fade', usd: 520, rarity: 'mythic' },
  { weapon: 'Stiletto Knife', skin: 'Doppler', usd: 880, rarity: 'mythic' },
  { weapon: 'Ursus Knife', skin: 'Fade', usd: 690, rarity: 'mythic' },
  { weapon: 'Navaja Knife', skin: 'Tiger Tooth', usd: 440, rarity: 'mythic' },
  { weapon: 'Nomad Knife', skin: 'Crimson Web', usd: 780, rarity: 'mythic' },
  { weapon: 'Hand Wraps', skin: 'Cobalt Skulls', usd: 620, rarity: 'mythic' },
  { weapon: 'Moto Gloves', skin: 'Spearmint', usd: 1340, rarity: 'mythic' },
  { weapon: 'Hydra Gloves', skin: 'Case Hardened', usd: 420, rarity: 'mythic' },
  { weapon: 'Bloodhound Gloves', skin: 'Charred', usd: 380, rarity: 'mythic' },
]

function cs2Products(): Product[] {
  return cs2Lines.flatMap((line) => {
    // Knives and gloves don't ship in every wear on the real market.
    const isSpecial = /Knife|Karambit|Bayonet|Gloves/.test(line.weapon)
    const applicable = isSpecial ? wears.slice(0, 3) : wears

    return applicable.map((wear) => {
      const slugBase = `${line.weapon}-${line.skin}-${wear.name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      return build({
        id: `g-cs2-${slugBase}`,
        slug: `cs2-${slugBase}`,
        name: `${line.weapon} | ${line.skin}`,
        gameId: 'csgo',
        gameName: 'Counter-Strike 2',
        category: 'skin',
        rarity: line.rarity,
        description: `${line.weapon} | ${line.skin} kondisi ${wear.name}. Item dikirim melalui penawaran trade Steam resmi dari inventaris terverifikasi kami setelah pembayaran dikonfirmasi.`,
        highlights: [
          `Kondisi ${wear.name}`,
          'Dikirim lewat Steam trade offer resmi',
          'Float diverifikasi sebelum pengiriman',
        ],
        image: line.weapon.slice(0, 2).toUpperCase(),
        price: tidyPrice(line.usd * wear.factor * USD_TO_IDR),
        deliveryMethod: 'trade-url',
        estimatedDelivery: '15 - 60 menit',
        checkoutFields: [...steamTradeFields, ...contactFields],
      })
    })
  })
}

const valorantSkins: { bundle: string; weapon: string; vp: number }[] = [
  { bundle: 'Reaver', weapon: 'Vandal', vp: 2175 },
  { bundle: 'Reaver', weapon: 'Operator', vp: 2175 },
  { bundle: 'Prime', weapon: 'Vandal', vp: 1775 },
  { bundle: 'Prime', weapon: 'Phantom', vp: 1775 },
  { bundle: 'Glitchpop', weapon: 'Vandal', vp: 2175 },
  { bundle: 'Glitchpop', weapon: 'Judge', vp: 2175 },
  { bundle: 'Elderflame', weapon: 'Vandal', vp: 2475 },
  { bundle: 'Elderflame', weapon: 'Operator', vp: 2475 },
  { bundle: 'Oni', weapon: 'Phantom', vp: 1775 },
  { bundle: 'Ion', weapon: 'Sheriff', vp: 1775 },
  { bundle: 'Singularity', weapon: 'Phantom', vp: 2175 },
  { bundle: 'RGX 11z Pro', weapon: 'Vandal', vp: 2175 },
  { bundle: 'Araxys', weapon: 'Vandal', vp: 2175 },
  { bundle: 'Recon', weapon: 'Phantom', vp: 1775 },
  { bundle: 'Sovereign', weapon: 'Ghost', vp: 1775 },
  { bundle: 'Spectrum', weapon: 'Phantom', vp: 2475 },
  { bundle: 'Spectrum', weapon: 'Vandal', vp: 2475 },
  { bundle: 'Champions', weapon: 'Vandal', vp: 2675 },
]

function valorantProducts(): Product[] {
  return valorantSkins.map((skin) =>
    build({
      id: `g-val-${skin.bundle}-${skin.weapon}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      slug: `valorant-${skin.bundle}-${skin.weapon}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      name: `${skin.bundle} ${skin.weapon}`,
      gameId: 'valorant',
      gameName: 'Valorant',
      category: 'skin',
      rarity: skin.vp >= 2475 ? 'legendaris' : 'epik',
      description: `Skin ${skin.bundle} untuk ${skin.weapon} di Valorant, lengkap dengan efek visual, animasi, dan audio khas koleksi ${skin.bundle}. Dikirim melalui proses gifting resmi ke akun Riot Anda.`,
      highlights: [
        `Efek visual dan audio khas ${skin.bundle}`,
        'Dikirim ke akun Riot region SEA',
        'Diproses oleh admin terverifikasi',
      ],
      image: 'VS',
      price: tidyPrice(skin.vp * 110),
      deliveryMethod: 'manual',
      estimatedDelivery: '30 - 90 menit',
      checkoutFields: [...riotFields, ...contactFields],
    }),
  )
}

// ---------------------------------------------------------------------------
// Mobile skins, passes and premium access
// ---------------------------------------------------------------------------

const mlSkins: { hero: string; line: string; rarity: Rarity; diamonds: number }[] = [
  { hero: 'Gusion', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Lancelot', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Fanny', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Ling', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Granger', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Kagura', line: 'Collector', rarity: 'mythic', diamonds: 2200 },
  { hero: 'Alucard', line: 'Collector', rarity: 'mythic', diamonds: 2200 },
  { hero: 'Miya', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Layla', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Chou', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Hayabusa', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Selena', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Lesley', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Harith', line: 'Collector', rarity: 'mythic', diamonds: 2200 },
  { hero: 'Yu Zhong', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Beatrix', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Claude', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Wanwan', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Benedetta', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Aldous', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Balmond', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Tigreal', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Gatotkaca', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Zilong', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Nana', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Odette', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Esmeralda', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Khufra', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Paquito', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Valentina', line: 'Collector', rarity: 'mythic', diamonds: 2200 },
  { hero: 'Lunox', line: 'Collector', rarity: 'mythic', diamonds: 2200 },
  { hero: 'Freya', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Argus', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Karrie', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Cyclops', line: 'Elite', rarity: 'langka', diamonds: 269 },
  { hero: 'Hanabi', line: 'Epic', rarity: 'epik', diamonds: 899 },
  { hero: 'Yi Sun-shin', line: 'Legend', rarity: 'legendaris', diamonds: 2749 },
  { hero: 'Alpha', line: 'Elite', rarity: 'langka', diamonds: 269 },
]

/** Honor of Kings hero skins — mirrors the ML skin ladder. */
const hokSkins: { hero: string; line: string; rarity: Rarity; tokens: number }[] = [
  { hero: 'Musashi', line: 'Legendaris', rarity: 'legendaris', tokens: 1688 },
  { hero: 'Diaochan', line: 'Legendaris', rarity: 'legendaris', tokens: 1688 },
  { hero: 'Luna', line: 'Epik', rarity: 'epik', tokens: 888 },
  { hero: 'Zhao Yun', line: 'Epik', rarity: 'epik', tokens: 888 },
  { hero: 'Li Bai', line: 'Legendaris', rarity: 'legendaris', tokens: 1688 },
  { hero: 'Sun Wukong', line: 'Legendaris', rarity: 'legendaris', tokens: 1688 },
  { hero: 'Angela', line: 'Elit', rarity: 'langka', tokens: 288 },
  { hero: 'Mulan', line: 'Epik', rarity: 'epik', tokens: 888 },
  { hero: 'Nezha', line: 'Epik', rarity: 'epik', tokens: 888 },
  { hero: 'Daji', line: 'Elit', rarity: 'langka', tokens: 288 },
  { hero: 'Guan Yu', line: 'Epik', rarity: 'epik', tokens: 888 },
  { hero: 'Kaizer', line: 'Elit', rarity: 'langka', tokens: 288 },
]

/** PUBG Mobile weapon and outfit skins. */
const pubgSkins: { name: string; kind: string; uc: number; rarity: Rarity }[] = [
  { name: 'Glacier M416', kind: 'Skin senjata', uc: 1800, rarity: 'legendaris' },
  { name: 'Blood Raven AKM', kind: 'Skin senjata', uc: 1200, rarity: 'epik' },
  { name: 'Godzilla AWM', kind: 'Skin senjata', uc: 2400, rarity: 'legendaris' },
  { name: 'Pharaoh X-Suit', kind: 'Kostum', uc: 3600, rarity: 'mythic' },
  { name: 'Avalanche X-Suit', kind: 'Kostum', uc: 3600, rarity: 'mythic' },
  { name: 'Golden Pharaoh Set', kind: 'Kostum', uc: 2800, rarity: 'legendaris' },
  { name: 'Silvanus Kar98K', kind: 'Skin senjata', uc: 1600, rarity: 'epik' },
  { name: 'Poseidon Groza', kind: 'Skin senjata', uc: 1400, rarity: 'epik' },
  { name: 'Mummy Set', kind: 'Kostum', uc: 1800, rarity: 'epik' },
  { name: 'Dragon Ball Bundle', kind: 'Kostum', uc: 2200, rarity: 'legendaris' },
]

/** Genshin Impact character and weapon bundles. */
const genshinBundles: { name: string; kind: string; price: number; rarity: Rarity }[] = [
  { name: 'Paket Wish Intertwined Fate x10', kind: 'Item', price: 265_000, rarity: 'epik' },
  { name: 'Paket Wish Acquaint Fate x10', kind: 'Item', price: 245_000, rarity: 'epik' },
  { name: 'Paket Starter Pendatang Baru', kind: 'Item', price: 79_000, rarity: 'langka' },
  { name: 'Paket Mora 600.000', kind: 'Item', price: 129_000, rarity: 'umum' },
  { name: 'Paket Hero’s Wit x50', kind: 'Item', price: 159_000, rarity: 'langka' },
  { name: 'Paket Mystic Enhancement Ore x100', kind: 'Item', price: 139_000, rarity: 'umum' },
]

/** Roblox in-experience items and gamepasses. */
const robloxItems: { name: string; kind: string; price: number; rarity: Rarity }[] = [
  { name: 'Gamepass VIP Premium', kind: 'Gamepass', price: 89_000, rarity: 'langka' },
  { name: 'Paket Aksesori Limited', kind: 'Item', price: 249_000, rarity: 'epik' },
  { name: 'Bundle Karakter Eksklusif', kind: 'Item', price: 189_000, rarity: 'epik' },
  { name: 'Paket Emote Animasi', kind: 'Item', price: 69_000, rarity: 'umum' },
  { name: 'Gamepass 2x Speed', kind: 'Gamepass', price: 49_000, rarity: 'umum' },
  { name: 'Paket Wajah Langka', kind: 'Item', price: 119_000, rarity: 'langka' },
]

const ffItems: { name: string; kind: string; price: number; rarity: Rarity }[] = [
  { name: 'Bundle Angelic', kind: 'Bundle kostum', price: 249_000, rarity: 'legendaris' },
  { name: 'Bundle Cobra', kind: 'Bundle kostum', price: 289_000, rarity: 'legendaris' },
  { name: 'Bundle Samurai', kind: 'Bundle kostum', price: 199_000, rarity: 'epik' },
  { name: 'Skin AK Blue Flame', kind: 'Skin senjata', price: 159_000, rarity: 'epik' },
  { name: 'Skin M1887 Ice Dragon', kind: 'Skin senjata', price: 189_000, rarity: 'epik' },
  { name: 'Skin MP40 Predatory', kind: 'Skin senjata', price: 129_000, rarity: 'langka' },
  { name: 'Emote Kocak', kind: 'Emote', price: 39_000, rarity: 'umum' },
  { name: 'Loot Crate Legendaris', kind: 'Item', price: 119_000, rarity: 'epik' },
]

function mobileSkinProducts(): Product[] {
  const ml = mlSkins.map((skin) =>
    build({
      id: `g-ml-skin-${skin.hero}`.toLowerCase(),
      slug: `mobile-legends-skin-${skin.line}-${skin.hero}`.toLowerCase(),
      name: `Skin ${skin.line} ${skin.hero}`,
      gameId: 'ml',
      gameName: 'Mobile Legends: Bang Bang',
      category: 'skin',
      rarity: skin.rarity,
      description: `Skin ${skin.line} untuk hero ${skin.hero} di Mobile Legends, lengkap dengan efek skill, animasi recall, dan voice line eksklusif. Dikirim melalui proses gifting resmi oleh tim kami.`,
      highlights: [
        `Tampilan dan efek skill khas ${skin.line}`,
        'Proses gifting aman oleh admin terverifikasi',
        'Tanpa perlu kata sandi akun Anda',
      ],
      image: skin.hero.slice(0, 2).toUpperCase(),
      price: tidyPrice(skin.diamonds * 270),
      deliveryMethod: 'manual',
      estimatedDelivery: '30 - 90 menit',
      checkoutFields: [...mobileLegendsFields, ...contactFields],
    }),
  )

  const ff = ffItems.map((item) =>
    build({
      id: `g-ff-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: `free-fire-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: item.name,
      gameId: 'ff',
      gameName: 'Free Fire',
      category: item.kind === 'Item' ? 'item' : 'skin',
      rarity: item.rarity,
      description: `${item.kind} ${item.name} untuk Free Fire. Item dikirim langsung ke inventaris akun Anda setelah pembayaran dikonfirmasi.`,
      highlights: [
        `${item.kind} eksklusif`,
        'Langsung masuk ke inventaris akun',
        'Cukup masukkan Player ID',
      ],
      image: 'FF',
      price: item.price,
      deliveryMethod: 'otomatis',
      estimatedDelivery: '1 - 10 menit',
      checkoutFields: [...freeFireFields, ...contactFields],
    }),
  )

  const hok = hokSkins.map((skin) =>
    build({
      id: `g-hok-skin-${skin.hero}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      slug: `honor-of-kings-skin-${skin.line}-${skin.hero}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      name: `Skin ${skin.line} ${skin.hero}`,
      gameId: 'hok',
      gameName: 'Honor of Kings',
      category: 'skin',
      rarity: skin.rarity,
      description: `Skin ${skin.line} untuk hero ${skin.hero} di Honor of Kings, lengkap dengan efek skill dan animasi eksklusif. Dikirim ke akun Anda setelah pembayaran dikonfirmasi.`,
      highlights: [
        `Efek skill dan animasi khas ${skin.line}`,
        'Mendukung server Asia Tenggara',
        'Tanpa perlu kata sandi akun Anda',
      ],
      image: skin.hero.slice(0, 2).toUpperCase(),
      price: tidyPrice(skin.tokens * 267),
      deliveryMethod: 'otomatis',
      estimatedDelivery: '5 - 20 menit',
      checkoutFields: [...accountLoginFields, ...contactFields],
    }),
  )

  const pubg = pubgSkins.map((item) =>
    build({
      id: `g-pubg-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: `pubg-mobile-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: item.name,
      gameId: 'pubgm',
      gameName: 'PUBG Mobile',
      category: 'skin',
      rarity: item.rarity,
      description: `${item.kind} ${item.name} untuk PUBG Mobile. Item dikirim langsung ke inventaris akun Anda menggunakan Character ID.`,
      highlights: [
        `${item.kind} eksklusif musim ini`,
        'Cukup gunakan Character ID',
        'Diproses oleh admin siaga',
      ],
      image: 'PM',
      price: tidyPrice(item.uc * 233),
      deliveryMethod: 'manual',
      estimatedDelivery: '30 - 90 menit',
      checkoutFields: [...pubgFields, ...contactFields],
    }),
  )

  const genshin = genshinBundles.map((item) =>
    build({
      id: `g-gi-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: `genshin-impact-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: item.name,
      gameId: 'genshin',
      gameName: 'Genshin Impact',
      category: 'item',
      rarity: item.rarity,
      description: `${item.name} untuk Genshin Impact. Dikirim ke akun Anda melalui UID dan pilihan server yang Anda masukkan saat checkout.`,
      highlights: [
        'Mendukung seluruh server global',
        'Cukup UID dan pilihan server',
        'Diproses cepat oleh admin siaga',
      ],
      image: 'GI',
      price: item.price,
      deliveryMethod: 'otomatis',
      estimatedDelivery: '5 - 20 menit',
      checkoutFields: [...genshinFields, ...contactFields],
    }),
  )

  const roblox = robloxItems.map((item) =>
    build({
      id: `g-rbx-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      slug: `roblox-${item.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: item.name,
      gameId: 'roblox',
      gameName: 'Roblox',
      category: item.kind === 'Gamepass' ? 'voucher' : 'item',
      rarity: item.rarity,
      description: `${item.kind} ${item.name} untuk Roblox. Dikirim ke akun Anda menggunakan username, tanpa perlu kata sandi.`,
      highlights: [
        `${item.kind} untuk akun Roblox Anda`,
        'Cukup username akun Roblox',
        'Tanpa perlu kata sandi akun',
      ],
      image: 'RB',
      price: item.price,
      deliveryMethod: 'manual',
      estimatedDelivery: '30 - 120 menit',
      checkoutFields: [...accountLoginFields, ...contactFields],
    }),
  )

  return [...ml, ...ff, ...hok, ...pubg, ...genshin, ...roblox]
}

/** Season passes and subscriptions across every game. */
const passes: {
  gameId: string
  gameName: string
  name: string
  price: number
  category: Product['category']
  fields: Product['checkoutFields']
}[] = [
  { gameId: 'ml', gameName: 'Mobile Legends: Bang Bang', name: 'Weekly Diamond Pass', price: 28_000, category: 'voucher', fields: [...mobileLegendsFields, ...contactFields] },
  { gameId: 'ml', gameName: 'Mobile Legends: Bang Bang', name: 'Twilight Pass', price: 150_000, category: 'voucher', fields: [...mobileLegendsFields, ...contactFields] },
  { gameId: 'ml', gameName: 'Mobile Legends: Bang Bang', name: 'Starlight Member Plus', price: 279_000, category: 'akun-premium', fields: [...mobileLegendsFields, ...contactFields] },
  { gameId: 'ff', gameName: 'Free Fire', name: 'Weekly Membership', price: 29_000, category: 'voucher', fields: [...freeFireFields, ...contactFields] },
  { gameId: 'ff', gameName: 'Free Fire', name: 'Monthly Membership', price: 89_000, category: 'akun-premium', fields: [...freeFireFields, ...contactFields] },
  { gameId: 'ff', gameName: 'Free Fire', name: 'Booyah Pass Premium', price: 79_000, category: 'voucher', fields: [...freeFireFields, ...contactFields] },
  { gameId: 'pubgm', gameName: 'PUBG Mobile', name: 'Royale Pass Elite Plus', price: 445_000, category: 'voucher', fields: [...pubgFields, ...contactFields] },
  { gameId: 'valorant', gameName: 'Valorant', name: 'Battle Pass Premium', price: 109_000, category: 'voucher', fields: [...riotFields, ...contactFields] },
  { gameId: 'genshin', gameName: 'Genshin Impact', name: 'Gnostic Hymn (Battle Pass)', price: 155_000, category: 'voucher', fields: [...genshinFields, ...contactFields] },
  { gameId: 'genshin', gameName: 'Genshin Impact', name: 'Blessing of the Welkin Moon 3 Bulan', price: 225_000, category: 'akun-premium', fields: [...genshinFields, ...contactFields] },
  { gameId: 'roblox', gameName: 'Roblox', name: 'Premium 450', price: 89_000, category: 'akun-premium', fields: [...accountLoginFields, ...contactFields] },
  { gameId: 'roblox', gameName: 'Roblox', name: 'Premium 1000', price: 175_000, category: 'akun-premium', fields: [...accountLoginFields, ...contactFields] },
  { gameId: 'roblox', gameName: 'Roblox', name: 'Premium 2200', price: 349_000, category: 'akun-premium', fields: [...accountLoginFields, ...contactFields] },
  { gameId: 'hok', gameName: 'Honor of Kings', name: 'Season Pass', price: 119_000, category: 'voucher', fields: [...accountLoginFields, ...contactFields] },
  { gameId: 'hok', gameName: 'Honor of Kings', name: 'Weekly Card', price: 32_000, category: 'voucher', fields: [...accountLoginFields, ...contactFields] },
]

function passProducts(): Product[] {
  return passes.map((pass) =>
    build({
      id: `g-pass-${pass.gameId}-${pass.name}`.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
      slug: `${pass.gameId}-${pass.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: pass.name,
      gameId: pass.gameId,
      gameName: pass.gameName,
      category: pass.category,
      description: `${pass.name} untuk ${pass.gameName}. Akses seluruh hadiah dan keuntungan yang termasuk dalam paket ini, aktif segera setelah pembayaran dikonfirmasi.`,
      highlights: [
        'Aktif segera setelah pembayaran',
        'Seluruh hadiah paket termasuk',
        'Tanpa perlu kata sandi akun Anda',
      ],
      image: 'PS',
      price: pass.price,
      deliveryMethod: 'otomatis',
      estimatedDelivery: '1 - 10 menit',
      checkoutFields: pass.fields,
    }),
  )
}

/**
 * The generated catalogue.
 *
 * Order matters only for stable ids; the catalogue page sorts on its own.
 */
export const generatedProducts: Product[] = [
  ...topUpProducts(),
  ...cs2Products(),
  ...valorantProducts(),
  ...mobileSkinProducts(),
  ...passProducts(),
]

/**
 * Intended replacement path for a real supplier feed.
 *
 * Swap `generatedProducts` for `importProducts(rows)` in `products.ts` once the
 * client supplies inventory. Keeping the shape here documents exactly what the
 * importer must produce.
 */
export function importProducts(rows: GeneratedInput[]): Product[] {
  return rows.map(build)
}
