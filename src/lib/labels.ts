import type {
  Availability,
  DeliveryMethod,
  ItemCategory,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Rarity,
  SortOption,
} from '@/types'

export const categoryLabels: Record<ItemCategory, string> = {
  skin: 'Skin',
  item: 'Item Dalam Game',
  'top-up': 'Top Up',
  voucher: 'Voucher',
  'akun-premium': 'Akses Premium',
}

export const rarityLabels: Record<Rarity, string> = {
  umum: 'Umum',
  langka: 'Langka',
  epik: 'Epik',
  legendaris: 'Legendaris',
  mythic: 'Mythic',
}

export const availabilityLabels: Record<Availability, string> = {
  tersedia: 'Tersedia',
  'stok-menipis': 'Stok menipis',
  habis: 'Stok habis',
  'pre-order': 'Pre-order',
}

export const deliveryLabels: Record<DeliveryMethod, string> = {
  otomatis: 'Pengiriman otomatis',
  manual: 'Diproses admin',
  'trade-url': 'Steam trade offer',
}

export const sortLabels: Record<SortOption, string> = {
  terpopuler: 'Terpopuler',
  terbaru: 'Terbaru',
  'harga-terendah': 'Harga terendah',
  'harga-tertinggi': 'Harga tertinggi',
  rating: 'Rating tertinggi',
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  'menunggu-pembayaran': 'Menunggu pembayaran',
  dibayar: 'Sudah dibayar',
  diproses: 'Sedang diproses',
  terkirim: 'Terkirim',
  gagal: 'Gagal',
  dibatalkan: 'Dibatalkan',
  'dana-dikembalikan': 'Dana dikembalikan',
}

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pending: 'Menunggu pembayaran',
  berhasil: 'Pembayaran berhasil',
  gagal: 'Pembayaran gagal',
  kedaluwarsa: 'Pembayaran kedaluwarsa',
}

/**
 * QRIS is the primary method per the brief. The rest are structured here so
 * they can be switched on once each provider is connected on the backend.
 */
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Bayar dengan aplikasi bank atau e-wallet apa pun',
    available: true,
  },
  { id: 'dana', name: 'DANA', description: 'Segera hadir', available: false },
  { id: 'gopay', name: 'GoPay', description: 'Segera hadir', available: false },
  { id: 'ovo', name: 'OVO', description: 'Segera hadir', available: false },
  {
    id: 'transfer-bank',
    name: 'Transfer Bank',
    description: 'Segera hadir',
    available: false,
  },
  { id: 'kartu', name: 'Kartu Debit / Kredit', description: 'Segera hadir', available: false },
]

export const paymentMethodLabels: Record<PaymentMethod['id'], string> = {
  qris: 'QRIS',
  dana: 'DANA',
  gopay: 'GoPay',
  ovo: 'OVO',
  'transfer-bank': 'Transfer Bank',
  kartu: 'Kartu Debit / Kredit',
}
