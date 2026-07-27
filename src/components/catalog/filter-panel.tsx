import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { games } from '@/data/games'
import { categoryLabels, rarityLabels } from '@/lib/labels'
import { cn } from '@/lib/utils'
import type { CatalogFilters, ItemCategory, Rarity } from '@/types'

const categories = Object.keys(categoryLabels) as ItemCategory[]
const rarities = Object.keys(rarityLabels) as Rarity[]

/** Budget tiers in IDR — mirrors the "tiers" pattern from the reference site. */
const priceTiers = [
  { label: 'Di bawah Rp50.000', min: null, max: 50_000 },
  { label: 'Rp50.000 - Rp150.000', min: 50_000, max: 150_000 },
  { label: 'Rp150.000 - Rp500.000', min: 150_000, max: 500_000 },
  { label: 'Rp500.000 - Rp2.000.000', min: 500_000, max: 2_000_000 },
  { label: 'Di atas Rp2.000.000', min: 2_000_000, max: null },
]

export function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: CatalogFilters
  onChange: (patch: Partial<CatalogFilters>) => void
  onReset: () => void
}) {
  function toggle<T extends string>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]
  }

  return (
    <div className="flex flex-col gap-7">
      <FilterGroup title="Game">
        <div className="flex flex-col gap-1">
          {games.map((game) => (
            <CheckRow
              key={game.id}
              label={game.name}
              count={game.productCount}
              checked={filters.games.includes(game.id)}
              onChange={() => onChange({ games: toggle(filters.games, game.id) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Jenis item">
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <CheckRow
              key={category}
              label={categoryLabels[category]}
              checked={filters.categories.includes(category)}
              onChange={() => onChange({ categories: toggle(filters.categories, category) })}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rarity">
        <div className="flex flex-wrap gap-2">
          {rarities.map((rarity) => {
            const active = filters.rarities.includes(rarity)
            return (
              <button
                key={rarity}
                type="button"
                onClick={() => onChange({ rarities: toggle(filters.rarities, rarity) })}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  active
                    ? 'border-ink bg-ink text-surface'
                    : 'border-mono-300 text-ink hover:border-mono-400',
                )}
              >
                {rarityLabels[rarity]}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Rentang harga">
        <div className="flex flex-col gap-1">
          {priceTiers.map((tier) => {
            const active = filters.minPrice === tier.min && filters.maxPrice === tier.max
            return (
              <button
                key={tier.label}
                type="button"
                onClick={() =>
                  onChange(
                    active
                      ? { minPrice: null, maxPrice: null }
                      : { minPrice: tier.min, maxPrice: tier.max },
                  )
                }
                aria-pressed={active}
                className={cn(
                  'rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                  active
                    ? 'bg-mono-100 font-medium text-ink'
                    : 'text-ink hover:bg-mono-50',
                )}
              >
                {tier.label}
              </button>
            )
          })}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="harga-min" className="text-xs text-mono-500">
              Harga minimum
            </Label>
            <Input
              id="harga-min"
              inputMode="numeric"
              placeholder="0"
              value={filters.minPrice ?? ''}
              onChange={(event) =>
                onChange({
                  minPrice: event.target.value ? Number(event.target.value) : null,
                })
              }
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="harga-maks" className="text-xs text-mono-500">
              Harga maksimum
            </Label>
            <Input
              id="harga-maks"
              inputMode="numeric"
              placeholder="Bebas"
              value={filters.maxPrice ?? ''}
              onChange={(event) =>
                onChange({
                  maxPrice: event.target.value ? Number(event.target.value) : null,
                })
              }
              className="h-10"
            />
          </div>
        </div>
      </FilterGroup>

      <Button variant="outline" onClick={onReset} className="w-full">
        Atur ulang filter
      </Button>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
        {title}
      </h3>
      {children}
    </div>
  )
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count?: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-mono-50">
      <span
        className={cn(
          'flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
          checked ? 'border-ink bg-ink' : 'border-mono-300 group-hover:border-mono-400',
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3 text-surface" fill="none" aria-hidden>
            <path
              d="M2.5 6.2 4.8 8.5 9.5 3.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex-1 text-sm text-ink">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-mono-600 tabular-nums">{count}</span>
      )}
    </label>
  )
}
