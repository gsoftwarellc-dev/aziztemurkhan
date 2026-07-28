/**
 * Price provenance for the launch catalogue.
 *
 * Every price in `products.ts` traces to an entry here: where the figure came
 * from, and when it was checked. Digital-goods pricing moves — publisher
 * top-up rates get repriced, and CS2 market items float daily — so a price
 * with no recorded source and date cannot be audited or refreshed safely.
 *
 * HANDOVER: prices below are *market reference* values, not selling prices.
 * The business must set its own margin over supplier cost before launch. The
 * CS2 entries in particular are live-market snapshots and will be stale within
 * days; wire them to a market data feed rather than editing them by hand.
 */

/** USD→IDR rate used to convert CS2 market values. Recheck when refreshing. */
export const usdToIdr = 17_950

export interface PriceSource {
  /** Where the reference figure came from. */
  source: string
  /** ISO date the figure was checked. */
  checkedAt: string
  /** Original figure before conversion, when the source quotes non-IDR. */
  originalValue?: string
  note?: string
}

export const priceSources: Record<string, PriceSource> = {
  'p-ml-starlight': {
    source: 'Codashop ID — Starlight Member',
    checkedAt: '2026-07-28',
    note: 'Monthly Starlight sits around Rp 149.000 across Indonesian resellers.',
  },
  'p-ml-diamond-568': {
    source: 'Codashop ID / ZenVan price table',
    checkedAt: '2026-07-28',
    note: 'ML diamonds average ~Rp 270/diamond (range Rp 236–285 by pack size).',
  },
  'p-ml-skin-legend': {
    source: 'Derived from ML diamond rate',
    checkedAt: '2026-07-28',
    note: 'Legend skins run ~2.000–3.000 diamonds; priced off the diamond rate.',
  },
  'p-ml-item-emote': {
    source: 'Derived from ML diamond rate',
    checkedAt: '2026-07-28',
  },
  'p-ff-diamond-1000': {
    source: 'Tripay / Lapakgaming FF price tables',
    checkedAt: '2026-07-28',
    note: '100 dm ≈ Rp 16.000, 310 ≈ Rp 49.000, 520 ≈ Rp 79.000, 1.060 ≈ Rp 159.000.',
  },
  'p-ff-bundle': {
    source: 'Garena Elite Pass standard rate',
    checkedAt: '2026-07-28',
  },
  'p-ff-item-crate': {
    source: 'Derived from FF diamond rate',
    checkedAt: '2026-07-28',
  },
  'p-pubg-uc-1800': {
    source: 'Midasbuy ID / VCGamers',
    checkedAt: '2026-07-28',
    note: 'PUBG UC ≈ Rp 300/UC for the Indonesia region.',
  },
  'p-pubg-rp': {
    source: 'Royale Pass Elite standard rate',
    checkedAt: '2026-07-28',
  },
  'p-cs2-knife': {
    source: 'CSMarketCap — Karambit | Doppler (Factory New)',
    checkedAt: '2026-07-28',
    originalValue: 'USD 1,222.55 lowest market price',
    note: 'LIVE MARKET ITEM — phase affects value heavily. Refresh before launch.',
  },
  'p-cs2-ak': {
    source: 'CSMarketCap — AK-47 | Redline (Field-Tested)',
    checkedAt: '2026-07-28',
    originalValue: 'USD 23.29 lowest market price',
    note: 'LIVE MARKET ITEM — trending down ~11.8% over the prior 30 days.',
  },
  'p-cs2-gloves': {
    source: 'SteamAnalyst / Skin.Land — Sport Gloves | Vice (Minimal Wear)',
    checkedAt: '2026-07-28',
    originalValue: 'USD 1,301–1,654 depending on marketplace',
    note: 'LIVE MARKET ITEM — wide spread across markets; mid-range used.',
  },
  'p-valorant-vp': {
    source: 'Codashop ID — 2.050 VP',
    checkedAt: '2026-07-28',
    originalValue: 'Rp 224.000',
    note: 'VP averages Rp 100–115 per point depending on denomination.',
  },
  'p-valorant-bundle': {
    source: 'Derived from VP rate',
    checkedAt: '2026-07-28',
    note: 'Premium bundles run ~7.100 VP.',
  },
  'p-genshin-crystal': {
    source: 'Lapakgaming / eXPay Genesis Crystal tables',
    checkedAt: '2026-07-28',
    note: '≈ Rp 254 per Genesis Crystal; 60 crystals from ~Rp 11.141.',
  },
  'p-genshin-blessing': {
    source: 'HoYoverse Welkin Moon standard rate',
    checkedAt: '2026-07-28',
  },
  'p-roblox-robux': {
    source: 'Roblox official / IDN Times price guide',
    checkedAt: '2026-07-28',
    originalValue: 'USD 19.99 for 1.700 Robux ≈ Rp 320.000',
  },
  'p-hok-token': {
    source: 'Level Infinite token rate',
    checkedAt: '2026-07-28',
    note: 'Token rate tracks the ML/HoK regional pricing band.',
  },
}
