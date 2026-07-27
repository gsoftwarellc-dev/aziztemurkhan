/**
 * Placeholder product imagery.
 *
 * These are neutral gaming/tech photographs from Unsplash, which are free for
 * commercial use. They stand in for real product shots so the catalogue reads
 * as a finished storefront.
 *
 * HANDOVER: replace each entry with the client's own licensed product artwork.
 * Do NOT substitute publisher game art (official skin renders, weapon models,
 * character art) — that material is copyrighted and hotlinking it would expose
 * the business to takedowns and infringement claims.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`

export const productImages: Record<string, string> = {
  'p-ml-starlight': unsplash('1542751371-adc38448a05e'),
  'p-ml-diamond-568': unsplash('1614680376593-902f74cf0d41'),
  'p-ml-skin-legend': unsplash('1550745165-9bc0b252726f'),
  'p-ml-item-emote': unsplash('1511512578047-dfb367046420'),
  'p-ff-diamond-1000': unsplash('1493711662062-fa541adb3fc8'),
  'p-ff-bundle': unsplash('1552820728-8b83bb6b773f'),
  'p-ff-item-crate': unsplash('1607853202273-797f1c22a38e'),
  'p-pubg-uc-1800': unsplash('1519669556878-63bdad8a1a49'),
  'p-pubg-rp': unsplash('1538481199705-c710c4e965fc'),
  'p-cs2-knife': unsplash('1595590424283-b8f17842773f'),
  'p-cs2-ak': unsplash('1584735174914-6b1eb0d0d8b2'),
  'p-cs2-gloves': unsplash('1531297484001-80022131f5a1'),
  'p-valorant-vp': unsplash('1542751110-97427bbecf20'),
  'p-valorant-bundle': unsplash('1587202372775-e229f172b9d7'),
  'p-genshin-crystal': unsplash('1518709268805-4e9042af9f23'),
  'p-genshin-blessing': unsplash('1506318137071-a8e063b4bec0'),
  'p-roblox-robux': unsplash('1633988354540-d3f4e97c67b5'),
  'p-hok-token': unsplash('1560253023-3ec5d502959f'),
}
