import type { CatalogFilters, Product } from '@/types'
import { products } from '@/data/products'

export const defaultFilters: CatalogFilters = {
  query: '',
  games: [],
  categories: [],
  rarities: [],
  minPrice: null,
  maxPrice: null,
  sort: 'terpopuler',
}

const availabilityRank: Record<Product['availability'], number> = {
  tersedia: 0,
  'stok-menipis': 1,
  'pre-order': 2,
  habis: 3,
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query.trim()) return true
  const haystack = [
    product.name,
    product.gameName,
    product.description,
    product.category,
    product.rarity ?? '',
  ]
    .join(' ')
    .toLowerCase()
  // Every whitespace-separated term must appear, so "ml diamond" narrows.
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

export function filterProducts(
  filters: CatalogFilters,
  source: Product[] = products,
): Product[] {
  const result = source.filter((product) => {
    if (!matchesQuery(product, filters.query)) return false
    if (filters.games.length && !filters.games.includes(product.gameId)) return false
    if (filters.categories.length && !filters.categories.includes(product.category)) return false
    if (filters.rarities.length) {
      if (!product.rarity || !filters.rarities.includes(product.rarity)) return false
    }
    if (filters.minPrice !== null && product.price < filters.minPrice) return false
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false
    return true
  })

  const sorted = [...result]
  switch (filters.sort) {
    case 'harga-terendah':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'harga-tertinggi':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'terbaru':
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      break
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
      break
    case 'terpopuler':
    default:
      // Sold-out items always sink, however popular they were.
      sorted.sort(
        (a, b) =>
          availabilityRank[a.availability] - availabilityRank[b.availability] ||
          b.soldCount - a.soldCount,
      )
      break
  }
  return sorted
}

export function countActiveFilters(filters: CatalogFilters): number {
  return (
    filters.games.length +
    filters.categories.length +
    filters.rarities.length +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0)
  )
}

/** Related products: same game first, then same category, excluding self. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameGame = products.filter(
    (candidate) => candidate.id !== product.id && candidate.gameId === product.gameId,
  )
  const sameCategory = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.gameId !== product.gameId &&
      candidate.category === product.category,
  )
  return [...sameGame, ...sameCategory].slice(0, limit)
}

export const featuredProducts = products.filter((product) => product.featured)
export const popularProducts = products.filter((product) => product.popular)
