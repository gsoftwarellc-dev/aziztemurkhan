import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { identityForGame } from '@/data/product-images'
import { cn } from '@/lib/utils'
import type { Game } from '@/types'

/**
 * Game tile. `featured` renders a taller cover for the hero row on the games
 * index; the default size is used in the denser grids.
 */
export function GameCard({
  game,
  featured = false,
}: {
  game: Game
  featured?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const identity = identityForGame(game.id)

  return (
    <Link
      to={`/game/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-card border border-mono-200 bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-mono-300 hover:shadow-[var(--shadow-hover)]"
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          featured ? 'aspect-[16/10]' : 'aspect-[16/11]',
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${identity.from}, ${identity.to})`,
        }}
      >
        {game.coverUrl && !failed && (
          <img
            src={game.coverUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}

        {/* Ink scrim keeps the white title legible over art or gradient alike. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <span
              className={cn(
                'flex items-center justify-center rounded-xl bg-surface font-bold tracking-tight text-ink',
                featured ? 'size-12 text-base' : 'size-10 text-sm',
              )}
            >
              {game.logo}
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-surface/15 backdrop-blur-sm transition-colors group-hover:bg-surface">
              <ArrowUpRight className="size-4 text-surface transition-colors group-hover:text-ink" />
            </span>
          </div>

          <div>
            <h3
              className={cn(
                'font-semibold leading-snug text-surface',
                featured ? 'text-lg' : 'text-[15px]',
              )}
            >
              {game.name}
            </h3>
            <p className="mt-0.5 text-xs text-surface/75">{game.publisher}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-ink">{game.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-mono-100 pt-3">
          <span className="text-xs font-medium text-ink tabular-nums">
            {game.productCount} produk
          </span>
          <span className="text-xs font-medium text-mono-500 transition-colors group-hover:text-ink">
            Lihat semua
          </span>
        </div>
      </div>
    </Link>
  )
}
