import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Check,
  ChevronRight,
  Clock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import { ProductThumb } from '@/components/catalog/product-thumb'
import { ProductCard } from '@/components/catalog/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/home/section'
import { NotFoundPage } from './not-found'
import { productBySlug } from '@/data/products'
import { gameById } from '@/data/games'
import { getRelatedProducts } from '@/lib/catalog'
import {
  availabilityLabels,
  categoryLabels,
  deliveryLabels,
  rarityLabels,
} from '@/lib/labels'
import { useCart } from '@/lib/use-cart'
import { usePageMeta } from '@/lib/use-page-meta'
import { cn, discountPercent, formatCompactID, formatIDR } from '@/lib/utils'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? productBySlug.get(slug) : undefined
  if (!product) return <NotFoundPage />
  return <ProductDetail key={product.id} slug={product.slug} />
}

function ProductDetail({ slug }: { slug: string }) {
  const product = productBySlug.get(slug)!
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [variantId, setVariantId] = useState(
    () => product.variants?.find((v) => v.availability !== 'habis')?.id ?? product.variants?.[0]?.id,
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const variant = useMemo(
    () => product.variants?.find((v) => v.id === variantId),
    [product.variants, variantId],
  )

  const price = variant?.price ?? product.price
  const availability = variant?.availability ?? product.availability
  const stock = variant?.stock ?? product.stock
  // A variant's own compare-at wins; the product-level one only applies when
  // no variant is selected, so the badge always describes the price on screen.
  const compareAt = variant ? variant.compareAtPrice : product.compareAtPrice
  const discount = discountPercent(price, compareAt)
  const soldOut = availability === 'habis'

  usePageMeta(
    `${product.name} — ${product.gameName} | SkinJago`,
    product.description.slice(0, 155),
  )

  const related = useMemo(() => getRelatedProducts(product), [product])

  function handleAddToCart(goToCheckout: boolean) {
    addItem({
      productId: product.id,
      variantId,
      quantity,
      fieldValues: {},
    })
    if (goToCheckout) {
      navigate('/checkout')
      return
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
        <Link to="/" className="text-mono-500 transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="size-3.5 text-mono-300" />
        <Link to="/katalog" className="text-mono-500 transition-colors hover:text-ink">
          Katalog
        </Link>
        <ChevronRight className="size-3.5 text-mono-300" />
        <span className="truncate font-medium text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-card border border-mono-200">
            <ProductThumb
              monogram={product.image}
              imageUrl={product.imageUrl}
              gameId={product.gameId}
              alt={`${product.name} — ${product.gameName}`}
              size="lg"
              className="aspect-square w-full"
            />
          </div>
          <p className="mt-3 text-xs text-mono-400">
            Gambar bersifat ilustrasi. Item dikirim dalam bentuk digital ke akun game Anda.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="subtle" size="sm">
              {categoryLabels[product.category]}
            </Badge>
            {product.rarity && (
              <Badge variant="outline" size="sm">
                {rarityLabels[product.rarity]}
              </Badge>
            )}
            <Badge
              size="sm"
              variant={
                availability === 'tersedia'
                  ? 'success'
                  : availability === 'habis'
                    ? 'subtle'
                    : availability === 'pre-order'
                      ? 'info'
                      : 'warning'
              }
            >
              {availabilityLabels[availability]}
            </Badge>
          </div>

          <Link
            to={`/game/${gameById.get(product.gameId)?.slug ?? ''}`}
            className="mt-4 text-sm font-medium text-mono-500 transition-colors hover:text-ink"
          >
            {product.gameName}
          </Link>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-mono-500">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-ink text-ink" />
              <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
              <span>({formatCompactID(product.reviewCount)} ulasan)</span>
            </span>
            <span aria-hidden>&middot;</span>
            <span>{formatCompactID(product.soldCount)} terjual</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
              {formatIDR(price)}
            </span>
            {compareAt && (
              <>
                <span className="text-base text-mono-400 line-through tabular-nums">
                  {formatIDR(compareAt)}
                </span>
                {discount && <Badge size="sm">Hemat {discount}%</Badge>}
              </>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-ink">Pilih nominal</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {product.variants.map((option) => {
                  const disabled = option.availability === 'habis'
                  const active = option.id === variantId
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => setVariantId(option.id)}
                      aria-pressed={active}
                      className={cn(
                        'rounded-xl border px-3 py-3 text-left transition-all',
                        active
                          ? 'border-ink bg-ink text-surface'
                          : 'border-mono-200 text-ink hover:border-mono-400',
                        disabled && 'cursor-not-allowed opacity-40 hover:border-mono-200',
                      )}
                    >
                      <span className="block text-[13px] font-medium">{option.name}</span>
                      <span
                        className={cn(
                          'mt-0.5 block text-xs tabular-nums',
                          active ? 'text-mono-300' : 'text-mono-500',
                        )}
                      >
                        {formatIDR(option.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full border border-mono-200">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                aria-label="Kurangi jumlah"
                className="flex size-12 items-center justify-center rounded-l-full text-mono-600 transition-colors hover:bg-mono-50 hover:text-ink disabled:opacity-30"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(stock || 99, value + 1))}
                disabled={soldOut || quantity >= (stock || 99)}
                aria-label="Tambah jumlah"
                className="flex size-12 items-center justify-center rounded-r-full text-mono-600 transition-colors hover:bg-mono-50 hover:text-ink disabled:opacity-30"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={() => handleAddToCart(true)}
              disabled={soldOut}
              className={cn('flex-1 sm:flex-none', !soldOut && 'rainbow-ring')}
            >
              {soldOut ? 'Stok habis' : 'Beli sekarang'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAddToCart(false)}
              disabled={soldOut}
              className="flex-1 sm:flex-none"
            >
              {added ? (
                <>
                  <Check className="size-4" />
                  Ditambahkan
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" />
                  Keranjang
                </>
              )}
            </Button>
          </div>

          {availability === 'stok-menipis' && (
            <p className="mt-3 text-sm font-medium text-warning">
              Tersisa {stock} unit untuk produk ini.
            </p>
          )}

          <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-mono-200 bg-mono-200 sm:grid-cols-2">
            <InfoCell
              icon={Truck}
              label="Metode pengiriman"
              value={deliveryLabels[product.deliveryMethod]}
            />
            <InfoCell
              icon={Clock}
              label="Estimasi pengiriman"
              value={product.estimatedDelivery}
            />
          </dl>

          <div className="mt-4 flex items-start gap-2.5 rounded-card border border-mono-200 bg-mono-50 px-4 py-3.5">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-mono-500" />
            <p className="text-xs leading-relaxed text-mono-600">
              Kami tidak pernah meminta kata sandi akun Anda. Data yang diperlukan hanya
              pengenal publik seperti User ID atau Trade URL sesuai jenis produk.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section>
          <h2 className="text-lg font-semibold text-ink">Deskripsi produk</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mono-600">
            {product.description}
          </p>

          <h3 className="mt-7 text-sm font-semibold text-ink">Yang Anda dapatkan</h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-sm text-mono-600">
                <Check className="mt-0.5 size-4 shrink-0 text-ink" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Data yang perlu Anda siapkan</h2>
          <p className="mt-3 text-sm leading-relaxed text-mono-600">
            Saat checkout, Anda akan diminta mengisi data berikut agar pesanan dapat kami
            kirim ke akun yang tepat.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {product.checkoutFields
              .filter((field) => !['email', 'whatsapp'].includes(field.id))
              .map((field) => (
                <li
                  key={field.id}
                  className="rounded-xl border border-mono-200 px-4 py-3.5"
                >
                  <p className="text-sm font-medium text-ink">{field.label}</p>
                  {field.helpText && (
                    <p className="mt-1 text-xs leading-relaxed text-mono-500">
                      {field.helpText}
                    </p>
                  )}
                </li>
              ))}
          </ul>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            title="Produk terkait"
            description="Pilihan lain yang sering dibeli bersama produk ini."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function InfoCell({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="bg-surface px-4 py-4">
      <dt className="flex items-center gap-2 text-xs text-mono-500">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-ink">{value}</dd>
    </div>
  )
}
