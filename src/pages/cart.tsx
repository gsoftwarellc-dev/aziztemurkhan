import { Link } from 'react-router-dom'
import { ArrowRight, LogIn, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { ProductThumb } from '@/components/catalog/product-thumb'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/use-cart'
import { useAuth } from '@/lib/use-auth'
import { REQUIRE_LOGIN_TO_CHECKOUT } from '@/lib/store-config'
import { usePageMeta } from '@/lib/use-page-meta'
import { formatIDR } from '@/lib/utils'
import { SERVICE_FEE } from '@/lib/pricing'

export function CartPage() {
  usePageMeta('Keranjang Belanja — SkinJago', 'Tinjau item di keranjang Anda sebelum checkout.')
  const { lines, subtotal, updateQuantity, removeItem } = useCart()
  const { isAuthenticated } = useAuth()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-mono-100">
          <ShoppingBag className="size-7 text-mono-400" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
          Keranjang Anda masih kosong
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-mono-600">
          Telusuri katalog kami dan temukan skin, item, atau top-up untuk game favorit Anda.
        </p>
        <Button size="lg" asChild className="mt-8">
          <Link to="/katalog">
            Mulai belanja
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  const total = subtotal + SERVICE_FEE

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Keranjang belanja
      </h1>
      <p className="mt-2 text-sm text-mono-500">
        {lines.length} produk di keranjang Anda
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y divide-mono-200 rounded-card border border-mono-200">
          {lines.map((line) => (
            <li
              key={`${line.productId}-${line.variantId ?? 'base'}`}
              className="flex gap-4 p-4 sm:p-5"
            >
              <Link
                to={`/produk/${line.product.slug}`}
                className="shrink-0 overflow-hidden rounded-xl border border-mono-200"
              >
                <ProductThumb monogram={line.product.image} imageUrl={line.product.imageUrl} gameId={line.product.gameId} alt={line.product.name} className="size-20 sm:size-24" />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs text-mono-500">{line.product.gameName}</p>
                <Link
                  to={`/produk/${line.product.slug}`}
                  className="mt-0.5 text-[15px] font-semibold leading-snug text-ink hover:underline"
                >
                  {line.product.name}
                </Link>
                {line.variant && (
                  <p className="mt-0.5 text-sm text-mono-500">{line.variant.name}</p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex h-9 items-center rounded-full border border-mono-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.productId, line.variantId, line.quantity - 1)
                      }
                      aria-label="Kurangi jumlah"
                      className="flex size-9 items-center justify-center rounded-l-full text-mono-600 transition-colors hover:bg-mono-50 hover:text-ink"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(line.productId, line.variantId, line.quantity + 1)
                      }
                      aria-label="Tambah jumlah"
                      className="flex size-9 items-center justify-center rounded-r-full text-mono-600 transition-colors hover:bg-mono-50 hover:text-ink"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-ink tabular-nums">
                      {formatIDR(line.lineTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId, line.variantId)}
                      aria-label={`Hapus ${line.product.name} dari keranjang`}
                      className="rounded-full p-2 text-mono-400 transition-colors hover:bg-mono-100 hover:text-danger"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-card border border-mono-200 p-6">
            <h2 className="text-base font-semibold text-ink">Ringkasan pesanan</h2>

            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Subtotal</dt>
                <dd className="font-medium text-ink tabular-nums">{formatIDR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Biaya layanan</dt>
                <dd className="font-medium text-ink tabular-nums">{formatIDR(SERVICE_FEE)}</dd>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-mono-200 pt-4">
                <dt className="text-base font-semibold text-ink">Total</dt>
                <dd className="text-lg font-semibold text-ink tabular-nums">
                  {formatIDR(total)}
                </dd>
              </div>
            </dl>

            {/* Surface the login requirement here rather than letting the
                customer hit an unexplained redirect at checkout. */}
            {REQUIRE_LOGIN_TO_CHECKOUT && !isAuthenticated && (
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-mono-50 p-3 text-xs leading-relaxed text-mono-600">
                <LogIn className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  Anda perlu{' '}
                  <Link
                    to="/masuk"
                    state={{ from: '/checkout' }}
                    className="font-medium text-ink underline underline-offset-2"
                  >
                    masuk
                  </Link>{' '}
                  atau{' '}
                  <Link
                    to="/daftar"
                    state={{ from: '/checkout' }}
                    className="font-medium text-ink underline underline-offset-2"
                  >
                    membuat akun
                  </Link>{' '}
                  untuk menyelesaikan pesanan. Isi keranjang Anda tetap tersimpan.
                </span>
              </p>
            )}

            <Button size="lg" asChild className="rainbow-ring mt-6 w-full">
              <Link to="/checkout">
                {REQUIRE_LOGIN_TO_CHECKOUT && !isAuthenticated
                  ? 'Masuk & lanjut checkout'
                  : 'Lanjut ke checkout'}
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Link
              to="/katalog"
              className="mt-3 block text-center text-sm text-mono-500 transition-colors hover:text-ink"
            >
              Lanjut belanja
            </Link>
          </div>

          <p className="mt-4 px-2 text-xs leading-relaxed text-mono-500">
            Data akun game akan diminta pada langkah berikutnya, sesuai produk yang Anda beli.
          </p>
        </aside>
      </div>
    </div>
  )
}
