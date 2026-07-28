import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/catalog/product-card'
import { FilterPanel } from '@/components/catalog/filter-panel'
import { Pagination } from '@/components/catalog/pagination'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { countActiveFilters, filterProducts } from '@/lib/catalog'
import { categoryLabels, rarityLabels, sortLabels } from '@/lib/labels'
import { gameById } from '@/data/games'
import { usePageMeta } from '@/lib/use-page-meta'
import type { CatalogFilters, ItemCategory, Rarity, SortOption } from '@/types'

/**
 * Products per page. The grid is four columns at `xl`, so 40 fills ten rows
 * there and stays a whole number of rows at the narrower breakpoints too.
 */
const PAGE_SIZE = 40

/** Read filters out of the query string so catalogue links are shareable. */
function filtersFromParams(params: URLSearchParams): CatalogFilters {
  const list = (key: string) => params.get(key)?.split(',').filter(Boolean) ?? []
  const num = (key: string) => {
    const raw = params.get(key)
    return raw && !Number.isNaN(Number(raw)) ? Number(raw) : null
  }
  const sort = params.get('urutkan')
  return {
    query: params.get('q') ?? '',
    games: list('game'),
    categories: list('kategori') as ItemCategory[],
    rarities: list('rarity') as Rarity[],
    minPrice: num('harga_min'),
    maxPrice: num('harga_maks'),
    sort: sort && sort in sortLabels ? (sort as SortOption) : 'terpopuler',
  }
}

function paramsFromFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.query) params.set('q', filters.query)
  if (filters.games.length) params.set('game', filters.games.join(','))
  if (filters.categories.length) params.set('kategori', filters.categories.join(','))
  if (filters.rarities.length) params.set('rarity', filters.rarities.join(','))
  if (filters.minPrice !== null) params.set('harga_min', String(filters.minPrice))
  if (filters.maxPrice !== null) params.set('harga_maks', String(filters.maxPrice))
  if (filters.sort !== 'terpopuler') params.set('urutkan', filters.sort)
  return params
}

export function CatalogPage() {
  usePageMeta(
    'Katalog Produk — SkinJago',
    'Telusuri skin, item dalam game, voucher, dan top-up dengan filter game, harga, dan rarity.',
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams])
  const results = useMemo(() => filterProducts(filters), [filters])
  const activeCount = countActiveFilters(filters)

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))

  // Clamp the requested page into range: a stale link or a narrowed filter set
  // must never leave the customer staring at an empty grid.
  const requestedPage = Number(searchParams.get('halaman') ?? '1')
  const page = Math.min(
    Math.max(Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1, 1),
    totalPages,
  )

  const pageResults = useMemo(
    () => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [results, page],
  )

  /** Filter changes reset to page one — page 7 of the old result set is meaningless. */
  const applyPatch = useCallback(
    (patch: Partial<CatalogFilters>) => {
      setSearchParams(paramsFromFilters({ ...filters, ...patch }), { replace: true })
    },
    [filters, setSearchParams],
  )

  const goToPage = useCallback(
    (next: number) => {
      const params = paramsFromFilters(filters)
      if (next > 1) params.set('halaman', String(next))
      setSearchParams(params)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [filters, setSearchParams],
  )

  const reset = useCallback(() => setSearchParams(new URLSearchParams()), [setSearchParams])

  // Local input so typing feels instant; the URL updates on a short debounce.
  const [queryInput, setQueryInput] = useState(filters.query)
  useEffect(() => setQueryInput(filters.query), [filters.query])
  useEffect(() => {
    if (queryInput === filters.query) return
    const timer = setTimeout(() => applyPatch({ query: queryInput }), 250)
    return () => clearTimeout(timer)
  }, [queryInput, filters.query, applyPatch])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="border-b border-mono-200 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Katalog produk
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">
          Semua skin, item dalam game, voucher, dan top-up yang tersedia di SkinJago. Gunakan
          filter untuk mempersempit pilihan sesuai game dan anggaran Anda.
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={applyPatch} onReset={reset} />
          </div>
        </aside>

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="size-4" />
                    Filter
                    {activeCount > 0 && (
                      <span className="ml-0.5 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-surface">
                        {activeCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto p-6">
                  <SheetTitle className="mb-6 text-lg font-semibold">Filter produk</SheetTitle>
                  <FilterPanel filters={filters} onChange={applyPatch} onReset={reset} />
                </SheetContent>
              </Sheet>

              <p className="text-sm text-ink tabular-nums">
                <span className="font-medium text-ink">{results.length}</span> produk
                ditemukan
                {totalPages > 1 && (
                  <span className="text-mono-500">
                    {' '}
                    &middot; menampilkan {(page - 1) * PAGE_SIZE + 1}&ndash;
                    {Math.min(page * PAGE_SIZE, results.length)}
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="urutkan" className="shrink-0 text-sm text-ink">
                Urutkan
              </label>
              <Select
                id="urutkan"
                value={filters.sort}
                onChange={(event) => applyPatch({ sort: event.target.value as SortOption })}
                className="h-10 w-48"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {sortLabels[option]}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <input
              type="search"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="Cari nama produk atau game..."
              aria-label="Cari di katalog"
              className="h-11 w-full rounded-xl border border-mono-200 bg-surface px-4 text-sm text-ink transition-colors placeholder:text-mono-400 hover:border-mono-300 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
            />
          </div>

          {activeCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {filters.games.map((gameId) => (
                <FilterChip
                  key={gameId}
                  label={gameById.get(gameId)?.name ?? gameId}
                  onRemove={() =>
                    applyPatch({ games: filters.games.filter((id) => id !== gameId) })
                  }
                />
              ))}
              {filters.categories.map((category) => (
                <FilterChip
                  key={category}
                  label={categoryLabels[category]}
                  onRemove={() =>
                    applyPatch({
                      categories: filters.categories.filter((item) => item !== category),
                    })
                  }
                />
              ))}
              {filters.rarities.map((rarity) => (
                <FilterChip
                  key={rarity}
                  label={rarityLabels[rarity]}
                  onRemove={() =>
                    applyPatch({ rarities: filters.rarities.filter((item) => item !== rarity) })
                  }
                />
              ))}
              {(filters.minPrice !== null || filters.maxPrice !== null) && (
                <FilterChip
                  label="Rentang harga"
                  onRemove={() => applyPatch({ minPrice: null, maxPrice: null })}
                />
              )}
              <button
                type="button"
                onClick={reset}
                className="text-xs font-medium text-mono-500 underline underline-offset-4 transition-colors hover:text-ink"
              >
                Hapus semua
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {pageResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
            </>
          ) : (
            <div className="mt-6 rounded-card border border-dashed border-mono-300 px-6 py-20 text-center">
              <p className="text-[15px] font-medium text-ink">Produk tidak ditemukan</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink">
                Coba ubah kata kunci pencarian atau kurangi filter yang aktif untuk melihat
                lebih banyak pilihan.
              </p>
              <Button variant="outline" onClick={reset} className="mt-6">
                Atur ulang filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="outline" className="gap-1.5 py-1.5 pl-3 pr-1.5">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Hapus filter ${label}`}
        className="rounded-full p-0.5 text-mono-400 transition-colors hover:bg-mono-100 hover:text-ink"
      >
        <X className="size-3" />
      </button>
    </Badge>
  )
}
