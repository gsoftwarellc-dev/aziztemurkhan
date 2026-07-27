import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { ProductThumb } from './product-thumb'
import { Badge } from '@/components/ui/badge'
import { availabilityLabels, categoryLabels, rarityLabels } from '@/lib/labels'
import { cn, discountPercent, formatCompactID, formatIDR } from '@/lib/utils'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.availability === 'habis'
  const priceFrom = Boolean(product.variants && product.variants.length > 1)

  // For multi-variant products the card advertises the cheapest variant, so any
  // discount badge must be derived from that same variant — never from the base
  // price, or the percentage would describe a price the card never shows.
  const cheapest = priceFrom
    ? product.variants!.reduce((low, variant) => (variant.price < low.price ? variant : low))
    : undefined
  const displayPrice = cheapest?.price ?? product.price
  const compareAt = cheapest ? cheapest.compareAtPrice : product.compareAtPrice
  const discount = discountPercent(displayPrice, compareAt)

  return (
    <Link
      to={`/produk/${product.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card border border-mono-200 bg-surface transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-mono-300 hover:shadow-[var(--shadow-hover)]',
        soldOut && 'opacity-70',
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <ProductThumb
          monogram={product.image}
          imageUrl={product.imageUrl}
          alt={`${product.name} — ${product.gameName}`}
          className="size-full"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {discount && !soldOut && (
            <Badge size="sm" variant="default">
              Hemat {discount}%
            </Badge>
          )}
          {product.rarity && (
            <Badge size="sm" variant="outline" className="bg-surface/90 backdrop-blur">
              {rarityLabels[product.rarity]}
            </Badge>
          )}
        </div>

        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-[1px]">
            <Badge variant="subtle">Stok habis</Badge>
          </div>
        )}

        {product.availability === 'stok-menipis' && (
          <div className="absolute bottom-3 left-3">
            <Badge size="sm" variant="warning">
              Sisa {product.stock}
            </Badge>
          </div>
        )}
        {product.availability === 'pre-order' && (
          <div className="absolute bottom-3 left-3">
            <Badge size="sm" variant="info">
              Pre-order
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-ink">{product.gameName}</p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-ink">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-ink">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-ink text-ink" />
            <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          </span>
          <span aria-hidden>&middot;</span>
          <span>{formatCompactID(product.soldCount)} terjual</span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            {priceFrom && <span className="text-xs text-ink">mulai</span>}
            <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">
              {formatIDR(displayPrice)}
            </span>
          </div>
          {compareAt && (
            <span className="text-xs text-mono-400 line-through tabular-nums">
              {formatIDR(compareAt)}
            </span>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-mono-100 pt-3">
            <span className="text-[11px] font-medium text-ink">
              {categoryLabels[product.category]}
            </span>
            <span
              className={cn('text-[11px] font-medium', soldOut ? 'text-mono-500' : 'text-ink')}
            >
              {availabilityLabels[product.availability]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
