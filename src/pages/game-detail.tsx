import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/catalog/product-card'
import { Select } from '@/components/ui/input'
import { NotFoundPage } from './not-found'
import { gameBySlug } from '@/data/games'
import { products } from '@/data/products'
import { categoryLabels, sortLabels } from '@/lib/labels'
import { defaultFilters, filterProducts } from '@/lib/catalog'
import { usePageMeta } from '@/lib/use-page-meta'
import { cn } from '@/lib/utils'
import type { ItemCategory, SortOption } from '@/types'

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const game = slug ? gameBySlug.get(slug) : undefined
  if (!game) return <NotFoundPage />
  return <GameDetail key={game.id} slug={game.slug} />
}

function GameDetail({ slug }: { slug: string }) {
  const game = gameBySlug.get(slug)!
  const [category, setCategory] = useState<ItemCategory | 'semua'>('semua')
  const [sort, setSort] = useState<SortOption>('terpopuler')

  usePageMeta(
    `${game.name} — Skin, Item, dan Top Up | SkinJago`,
    `Beli skin, item, voucher, dan top-up ${game.name} dengan pembayaran QRIS di SkinJago.`,
  )

  const gameProducts = useMemo(
    () => products.filter((product) => product.gameId === game.id),
    [game.id],
  )

  const availableCategories = useMemo(() => {
    const set = new Set(gameProducts.map((product) => product.category))
    return Array.from(set)
  }, [gameProducts])

  const visible = useMemo(
    () =>
      filterProducts(
        {
          ...defaultFilters,
          categories: category === 'semua' ? [] : [category],
          sort,
        },
        gameProducts,
      ),
    [gameProducts, category, sort],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
        <Link to="/" className="text-mono-500 transition-colors hover:text-ink">
          Beranda
        </Link>
        <ChevronRight className="size-3.5 text-mono-300" />
        <Link to="/game" className="text-mono-500 transition-colors hover:text-ink">
          Game
        </Link>
        <ChevronRight className="size-3.5 text-mono-300" />
        <span className="font-medium text-ink">{game.name}</span>
      </nav>

      <header className="mt-8 flex flex-col gap-5 border-b border-mono-200 pb-8 sm:flex-row sm:items-center">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-lg font-bold tracking-tight text-surface">
          {game.logo}
        </span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {game.name}
          </h1>
          <p className="mt-2 text-[15px] text-mono-600">
            {game.tagline} &middot; oleh {game.publisher}
          </p>
        </div>
      </header>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={category === 'semua'}
            onClick={() => setCategory('semua')}
            label="Semua"
            count={gameProducts.length}
          />
          {availableCategories.map((item) => (
            <CategoryChip
              key={item}
              active={category === item}
              onClick={() => setCategory(item)}
              label={categoryLabels[item]}
              count={gameProducts.filter((product) => product.category === item).length}
            />
          ))}
        </div>

        <Select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          aria-label="Urutkan produk"
          className="h-10 w-full sm:w-48"
        >
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              {sortLabels[option]}
            </option>
          ))}
        </Select>
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-mono-500">
          Belum ada produk pada kategori ini.
        </p>
      )}
    </div>
  )
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-ink bg-ink text-surface'
          : 'border-mono-200 text-mono-600 hover:border-mono-400 hover:text-ink',
      )}
    >
      {label}
      <span className={cn('text-xs tabular-nums', active ? 'text-mono-400' : 'text-mono-400')}>
        {count}
      </span>
    </button>
  )
}
