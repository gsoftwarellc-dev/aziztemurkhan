import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, PackageSearch, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProductThumb } from '@/components/catalog/product-thumb'
import { useAuth } from '@/lib/use-auth'
import { ordersForUser } from '@/lib/orders'
import { orderStatusLabels } from '@/lib/labels'
import { usePageMeta } from '@/lib/use-page-meta'
import { formatDateID, formatIDR } from '@/lib/utils'
import { productById } from '@/data/products'
import type { Order, OrderStatus } from '@/types'

/** Status → badge tone, matching the tracking page's vocabulary. */
const statusTone: Record<OrderStatus, 'default' | 'success' | 'warning' | 'danger'> = {
  'menunggu-pembayaran': 'warning',
  dibayar: 'default',
  diproses: 'default',
  terkirim: 'success',
  gagal: 'danger',
  dibatalkan: 'danger',
  'dana-dikembalikan': 'danger',
}

export function AccountPage() {
  usePageMeta('Akun Saya — SkinJago', 'Kelola profil dan lihat riwayat pesanan Anda.')

  const { user, logout, updateProfile } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: '', whatsapp: '' })

  useEffect(() => {
    if (user) setOrders(ordersForUser(user.id))
  }, [user])

  useEffect(() => {
    if (user) setDraft({ name: user.name, whatsapp: user.whatsapp })
  }, [user])

  const totalSpent = useMemo(
    () =>
      orders
        .filter((order) => order.status !== 'gagal' && order.status !== 'dibatalkan')
        .reduce((sum, order) => sum + order.total, 0),
    [orders],
  )

  // RequireAuth guarantees a user; this satisfies the type narrowing.
  if (!user) return null

  function handleSaveProfile(event: React.FormEvent) {
    event.preventDefault()
    updateProfile({ name: draft.name.trim(), whatsapp: draft.whatsapp.trim() })
    setEditing(false)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Akun saya
          </h1>
          <p className="mt-2 text-[15px] text-mono-600">
            Halo, {user.name}. Berikut ringkasan akun dan riwayat pesanan Anda.
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="size-4" />
          Keluar
        </Button>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-card border border-mono-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-mono-400">
            Total pesanan
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">{orders.length}</p>
        </div>
        <div className="rounded-card border border-mono-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-mono-400">
            Pesanan terkirim
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {orders.filter((order) => order.status === 'terkirim').length}
          </p>
        </div>
        <div className="rounded-card border border-mono-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-mono-400">
            Total belanja
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {formatIDR(totalSpent)}
          </p>
        </div>
      </div>

      {/* Profile */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Data profil</h2>
          {!editing && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="size-3.5" />
              Ubah
            </Button>
          )}
        </div>

        <div className="mt-4 rounded-card border border-mono-200 p-6">
          {editing ? (
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="acc-name">Nama lengkap</Label>
                <Input
                  id="acc-name"
                  value={draft.name}
                  onChange={(event) => setDraft((d) => ({ ...d, name: event.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="acc-whatsapp">Nomor WhatsApp</Label>
                <Input
                  id="acc-whatsapp"
                  type="tel"
                  value={draft.whatsapp}
                  onChange={(event) => setDraft((d) => ({ ...d, whatsapp: event.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Simpan</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDraft({ name: user.name, whatsapp: user.whatsapp })
                    setEditing(false)
                  }}
                >
                  Batal
                </Button>
              </div>
            </form>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-mono-400">
                  Nama
                </dt>
                <dd className="mt-1 text-sm text-ink">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-mono-400">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm text-ink">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-mono-400">
                  WhatsApp
                </dt>
                <dd className="mt-1 text-sm text-ink">{user.whatsapp}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      {/* Order history */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">Riwayat pesanan</h2>

        {orders.length === 0 ? (
          <div className="mt-4 rounded-card border border-dashed border-mono-300 p-10 text-center">
            <PackageSearch className="mx-auto size-8 text-mono-300" />
            <p className="mt-3 text-[15px] font-medium text-ink">Belum ada pesanan</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-mono-600">
              Pesanan yang Anda buat akan muncul di sini beserta status pengirimannya.
            </p>
            <Button asChild className="mt-6">
              <Link to="/katalog">Mulai belanja</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {orders.map((order) => (
              <li key={order.reference} className="rounded-card border border-mono-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">
                      {order.reference}
                    </p>
                    <p className="mt-0.5 text-xs text-mono-500">
                      {formatDateID(order.createdAt)}
                    </p>
                  </div>
                  <Badge variant={statusTone[order.status]} size="sm">
                    {orderStatusLabels[order.status]}
                  </Badge>
                </div>

                <ul className="mt-4 flex flex-col gap-3 border-t border-mono-100 pt-4">
                  {order.lines.map((line, index) => (
                    <li key={`${line.productId}-${index}`} className="flex items-center gap-3">
                      <ProductThumb
                        monogram={line.image}
                        gameId={productById.get(line.productId)?.gameId}
                        className="size-11 shrink-0 rounded-lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">
                          {line.productName}
                          {line.variantName ? ` — ${line.variantName}` : ''}
                        </p>
                        <p className="text-xs text-mono-500">
                          {line.gameName} · {line.quantity}×
                        </p>
                      </div>
                      <span className="text-sm tabular-nums text-ink">
                        {formatIDR(line.unitPrice * line.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-mono-100 pt-4">
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    Total {formatIDR(order.total)}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/lacak-pesanan?ref=${order.reference}`}>Lacak pesanan</Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
