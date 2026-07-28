import type { Order, OrderEvent, OrderStatus, PaymentStatus } from '@/types'
import { orderStatusLabels } from './labels'

const STORAGE_KEY = 'skinjago.orders.v1'

/**
 * Client-side order store. This stands in for the Laravel API during the
 * frontend phase: same shapes, same status vocabulary, so swapping in real
 * endpoints later is a change of transport only.
 */

export function generateReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let index = 0; index < 6; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `SJ-${suffix}`
}

export function readOrders(): Order[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Order[]) : []
  } catch {
    return []
  }
}

export function saveOrder(order: Order): void {
  const orders = readOrders()
  const index = orders.findIndex((entry) => entry.reference === order.reference)
  if (index >= 0) orders[index] = order
  else orders.unshift(order)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 25)))
}

export function findOrder(reference: string): Order | undefined {
  const normalised = reference.trim().toUpperCase()
  return readOrders().find((order) => order.reference.toUpperCase() === normalised)
}

/**
 * Orders belonging to one account, newest first.
 *
 * Guest orders (no `userId`) are deliberately excluded: they're only reachable
 * via their reference number on the tracking page. Once the backend lands this
 * becomes a scoped API call rather than a client-side filter.
 */
export function ordersForUser(userId: string): Order[] {
  return readOrders()
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** Build the full status timeline, marking everything up to `status` as done. */
export function buildTimeline(status: OrderStatus, createdAt: string): OrderEvent[] {
  const happyPath: OrderStatus[] = [
    'menunggu-pembayaran',
    'dibayar',
    'diproses',
    'terkirim',
  ]

  const descriptions: Record<OrderStatus, string> = {
    'menunggu-pembayaran': 'Pesanan dibuat dan menunggu pembayaran Anda melalui QRIS.',
    dibayar: 'Pembayaran berhasil dikonfirmasi oleh penyedia pembayaran.',
    diproses: 'Tim kami sedang menyiapkan dan mengirim item ke akun game Anda.',
    terkirim: 'Item telah dikirim. Silakan periksa akun game Anda.',
    gagal: 'Pesanan tidak dapat diproses. Dana akan dikembalikan penuh.',
    dibatalkan: 'Pesanan dibatalkan sebelum diproses.',
    'dana-dikembalikan': 'Dana telah dikembalikan ke metode pembayaran Anda.',
  }

  // Terminal failure states replace the tail of the happy path.
  if (status === 'gagal' || status === 'dibatalkan' || status === 'dana-dikembalikan') {
    return [
      makeEvent('menunggu-pembayaran', descriptions, createdAt, true),
      makeEvent(status, descriptions, createdAt, true),
    ]
  }

  const reachedIndex = happyPath.indexOf(status)
  return happyPath.map((step, index) =>
    makeEvent(step, descriptions, createdAt, index <= reachedIndex),
  )
}

function makeEvent(
  status: OrderStatus,
  descriptions: Record<OrderStatus, string>,
  createdAt: string,
  done: boolean,
): OrderEvent {
  return {
    status,
    label: orderStatusLabels[status],
    description: descriptions[status],
    timestamp: createdAt,
    done,
  }
}

export function paymentStatusToOrderStatus(payment: PaymentStatus): OrderStatus {
  switch (payment) {
    case 'berhasil':
      return 'dibayar'
    case 'gagal':
      return 'gagal'
    case 'kedaluwarsa':
      return 'dibatalkan'
    case 'pending':
    default:
      return 'menunggu-pembayaran'
  }
}
