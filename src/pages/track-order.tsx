import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, PackageSearch, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductThumb } from '@/components/catalog/product-thumb'
import { findOrder, ordersForUser } from '@/lib/orders'
import { useAuth } from '@/lib/use-auth'
import { orderStatusLabels, paymentMethodLabels } from '@/lib/labels'
import { usePageMeta } from '@/lib/use-page-meta'
import { cn, formatDateID, formatIDR } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'

export function TrackOrderPage() {
  usePageMeta(
    'Lacak Pesanan — SkinJago',
    'Masukkan nomor referensi pesanan untuk memantau status pembayaran dan pengiriman.',
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [reference, setReference] = useState(searchParams.get('ref') ?? '')
  const [order, setOrder] = useState<Order | undefined>()
  const [searched, setSearched] = useState(false)
  const { user } = useAuth()
  const [myOrders, setMyOrders] = useState<Order[]>([])

  useEffect(() => {
    setMyOrders(user ? ordersForUser(user.id) : [])
  }, [user])

  useEffect(() => {
    const initial = searchParams.get('ref')
    if (!initial) return
    setOrder(findOrder(initial))
    setSearched(true)
  }, [searchParams])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = reference.trim()
    setSearchParams(trimmed ? { ref: trimmed } : {})
    setOrder(findOrder(trimmed))
    setSearched(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Lacak pesanan
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mono-600">
        Masukkan nomor referensi pesanan Anda untuk melihat status pembayaran dan
        pengiriman. Nomor referensi tercantum pada email konfirmasi pesanan.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="ref">Nomor referensi</Label>
          <Input
            id="ref"
            value={reference}
            onChange={(event) => setReference(event.target.value.toUpperCase())}
            placeholder="Contoh: SJ-2K4F8L"
            className="uppercase"
          />
        </div>
        <Button type="submit" size="lg" className="sm:mb-0">
          <Search className="size-4" />
          Lacak
        </Button>
      </form>

      {/* Signed-in customers shouldn't have to dig a reference out of their
          email — their own orders are one tap away. */}
      {myOrders.length > 0 && !order && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-ink">Pesanan Anda</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {myOrders.slice(0, 5).map((entry) => (
              <li key={entry.reference}>
                <button
                  type="button"
                  onClick={() => {
                    setReference(entry.reference)
                    setSearchParams({ ref: entry.reference })
                    setOrder(entry)
                    setSearched(true)
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-mono-200 px-4 py-3 text-left transition-colors hover:border-mono-300 hover:bg-mono-50"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-sm font-semibold text-ink">
                      {entry.reference}
                    </span>
                    <span className="block text-xs text-mono-500">
                      {formatDateID(entry.createdAt)} · {entry.lines.length} item
                    </span>
                  </span>
                  <Badge variant={statusVariant(entry.status)} size="sm">
                    {orderStatusLabels[entry.status]}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {searched && !order && (
        <div className="mt-8 rounded-card border border-dashed border-mono-300 px-6 py-16 text-center">
          <PackageSearch className="mx-auto size-10 text-mono-300" />
          <p className="mt-4 text-[15px] font-medium text-ink">Pesanan tidak ditemukan</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mono-600">
            Periksa kembali nomor referensi Anda. Jika Anda yakin nomornya benar, hubungi
            tim bantuan kami dengan menyertakan bukti pembayaran.
          </p>
          <Button variant="outline" asChild className="mt-6">
            <Link to="/bantuan">Hubungi bantuan</Link>
          </Button>
        </div>
      )}

      {order && (
        <div className="mt-8 flex flex-col gap-6">
          <div className="rounded-card border border-mono-200 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-mono-500">Nomor referensi</p>
                <p className="text-lg font-semibold text-ink tabular-nums">
                  {order.reference}
                </p>
                <p className="mt-1 text-xs text-mono-500">
                  Dibuat {formatDateID(order.createdAt)}
                </p>
              </div>
              <Badge variant={statusVariant(order.status)}>
                {orderStatusLabels[order.status]}
              </Badge>
            </div>
          </div>

          <div className="rounded-card border border-mono-200 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-ink">Status pesanan</h2>
            <ol className="mt-5">
              {order.timeline.map((event, index) => {
                const last = index === order.timeline.length - 1
                return (
                  <li key={event.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          'flex size-7 shrink-0 items-center justify-center rounded-full border',
                          event.done
                            ? 'border-ink bg-ink text-surface'
                            : 'border-mono-300 bg-surface text-mono-300',
                        )}
                      >
                        {event.done ? (
                          <Check className="size-3.5" />
                        ) : (
                          <span className="size-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      {!last && (
                        <span
                          className={cn(
                            'w-px flex-1',
                            event.done ? 'bg-ink' : 'bg-mono-200',
                          )}
                        />
                      )}
                    </div>
                    <div className={cn('pb-6', last && 'pb-0')}>
                      <p
                        className={cn(
                          'text-sm font-medium',
                          event.done ? 'text-ink' : 'text-mono-400',
                        )}
                      >
                        {event.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-mono-500">
                        {event.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="rounded-card border border-mono-200 p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-ink">Item pesanan</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {order.lines.map((line, index) => (
                <li key={`${line.productId}-${index}`} className="flex gap-3">
                  <ProductThumb monogram={line.image} className="size-14 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{line.productName}</p>
                    <p className="text-xs text-mono-500">
                      {line.gameName}
                      {line.variantName ? ` · ${line.variantName}` : ''} · {line.quantity}x
                    </p>
                    {Object.entries(line.fieldValues).length > 0 && (
                      <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {Object.entries(line.fieldValues).map(([label, value]) => (
                          <div key={label} className="flex gap-1.5 text-xs">
                            <dt className="text-mono-400">{label}:</dt>
                            <dd className="font-medium text-mono-600">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                  <span className="text-sm font-medium text-ink tabular-nums">
                    {formatIDR(line.unitPrice * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 flex flex-col gap-2.5 border-t border-mono-200 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Metode pembayaran</dt>
                <dd className="font-medium text-ink">
                  {paymentMethodLabels[order.paymentMethod]}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Subtotal</dt>
                <dd className="font-medium text-ink tabular-nums">
                  {formatIDR(order.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Biaya layanan</dt>
                <dd className="font-medium text-ink tabular-nums">
                  {formatIDR(order.serviceFee)}
                </dd>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-mono-200 pt-3">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-semibold text-ink tabular-nums">
                  {formatIDR(order.total)}
                </dd>
              </div>
            </dl>
          </div>

          {order.paymentStatus === 'pending' && (
            <Button asChild size="lg">
              <Link to={`/pembayaran/${order.reference}`}>Lanjutkan pembayaran</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function statusVariant(status: OrderStatus) {
  switch (status) {
    case 'terkirim':
      return 'success' as const
    case 'gagal':
    case 'dibatalkan':
      return 'danger' as const
    case 'dana-dikembalikan':
      return 'info' as const
    case 'dibayar':
    case 'diproses':
      return 'info' as const
    default:
      return 'warning' as const
  }
}
