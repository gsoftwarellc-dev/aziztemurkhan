import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Build the page list with ellipses, keeping the control a fixed width however
 * many pages exist: first, last, the current page and its neighbours.
 *
 * e.g. page 7 of 15 → [1, '…', 6, 7, 8, '…', 15]
 */
export function pageItems(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const items: (number | 'gap')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) items.push('gap')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < total - 1) items.push('gap')

  items.push(total)
  return items
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const items = pageItems(page, totalPages)

  return (
    <nav
      aria-label="Navigasi halaman katalog"
      className="mt-10 flex max-w-full flex-wrap items-center justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
        className="flex h-10 items-center gap-1 rounded-xl border border-mono-200 px-3 text-sm font-medium text-ink transition-colors hover:border-mono-300 hover:bg-mono-50 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Sebelumnya</span>
      </button>

      <ul className="flex flex-wrap items-center justify-center gap-1">
        {items.map((item, index) =>
          item === 'gap' ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="flex size-9 items-center justify-center text-sm text-mono-400 sm:size-10"
            >
              &hellip;
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Halaman ${item}`}
                aria-current={item === page ? 'page' : undefined}
                className={cn(
                  'flex size-9 items-center justify-center rounded-xl border text-sm font-medium tabular-nums transition-colors sm:size-10',
                  item === page
                    ? 'border-ink bg-ink text-surface'
                    : 'border-mono-200 text-ink hover:border-mono-300 hover:bg-mono-50',
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
        className="flex h-10 items-center gap-1 rounded-xl border border-mono-200 px-3 text-sm font-medium text-ink transition-colors hover:border-mono-300 hover:bg-mono-50 disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="hidden sm:inline">Berikutnya</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
