/**
 * Domain model for the SkinJago storefront.
 *
 * These shapes intentionally mirror the eventual Laravel/MySQL schema so the
 * API layer can be swapped in later with no component changes: every screen
 * reads from these types, never from raw fixtures.
 */

export type Rarity = 'umum' | 'langka' | 'epik' | 'legendaris' | 'mythic'

export type ItemCategory =
  | 'skin'
  | 'item'
  | 'top-up'
  | 'voucher'
  | 'akun-premium'

export type DeliveryMethod = 'otomatis' | 'manual' | 'trade-url'

export type Availability = 'tersedia' | 'stok-menipis' | 'habis' | 'pre-order'

/** Field types the checkout form can render for a product. */
export type CheckoutFieldType = 'text' | 'number' | 'email' | 'tel' | 'select' | 'url'

/**
 * Per-product checkout requirements. The requirements doc calls for these to be
 * configurable per product from the admin panel, so products carry their own
 * field definitions rather than the checkout hard-coding them.
 */
export interface CheckoutField {
  id: string
  label: string
  type: CheckoutFieldType
  placeholder?: string
  helpText?: string
  required: boolean
  options?: { value: string; label: string }[]
  pattern?: string
}

export interface Game {
  id: string
  slug: string
  name: string
  publisher: string
  /** Short Indonesian tagline shown on the category card. */
  tagline: string
  logo: string
  /** Tailwind gradient classes used as the cover fallback. */
  cover: string
  /** Cover photo URL — must be licensed imagery, not publisher game art. */
  coverUrl?: string
  productCount: number
  featured: boolean
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  /** Optional strike-through reference price for this specific variant. */
  compareAtPrice?: number
  availability: Availability
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  gameId: string
  gameName: string
  category: ItemCategory
  rarity?: Rarity
  description: string
  highlights: string[]
  /** Short monogram shown while the image loads, or if it fails/is absent. */
  image: string
  /**
   * Product photo URL. Must be artwork the business is licensed to use —
   * publisher game art is copyrighted and must not be hotlinked here.
   */
  imageUrl?: string
  price: number
  compareAtPrice?: number
  availability: Availability
  stock: number
  deliveryMethod: DeliveryMethod
  /** Human-readable Indonesian estimate, e.g. "5 - 15 menit". */
  estimatedDelivery: string
  rating: number
  reviewCount: number
  soldCount: number
  featured: boolean
  popular: boolean
  variants?: ProductVariant[]
  checkoutFields: CheckoutField[]
  createdAt: string
}

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  /** Values captured for this product's configurable checkout fields. */
  fieldValues: Record<string, string>
}

export type OrderStatus =
  | 'menunggu-pembayaran'
  | 'dibayar'
  | 'diproses'
  | 'terkirim'
  | 'gagal'
  | 'dibatalkan'
  | 'dana-dikembalikan'

export type PaymentStatus = 'pending' | 'berhasil' | 'gagal' | 'kedaluwarsa'

export type PaymentMethodId = 'qris' | 'dana' | 'gopay' | 'ovo' | 'transfer-bank' | 'kartu'

export interface PaymentMethod {
  id: PaymentMethodId
  name: string
  description: string
  /** Methods not yet wired to a provider render as disabled "Segera hadir". */
  available: boolean
}

export interface OrderLine {
  productId: string
  productName: string
  gameName: string
  variantName?: string
  image: string
  unitPrice: number
  quantity: number
  fieldValues: Record<string, string>
}

export interface Order {
  id: string
  /** Public reference shown to the customer, e.g. "SJ-2K4F8L". */
  reference: string
  createdAt: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethodId
  customerEmail: string
  customerWhatsapp: string
  lines: OrderLine[]
  subtotal: number
  serviceFee: number
  total: number
  /** Populated once the order reaches "terkirim". */
  deliveryNote?: string
  timeline: OrderEvent[]
}

export interface OrderEvent {
  status: OrderStatus
  label: string
  description: string
  timestamp: string
  done: boolean
}

export type SortOption =
  | 'terpopuler'
  | 'terbaru'
  | 'harga-terendah'
  | 'harga-tertinggi'
  | 'rating'

export interface CatalogFilters {
  query: string
  games: string[]
  categories: ItemCategory[]
  rarities: Rarity[]
  minPrice: number | null
  maxPrice: number | null
  sort: SortOption
}
