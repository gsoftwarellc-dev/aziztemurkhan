import { useState } from 'react'
import { identityForGame } from '@/data/product-images'
import { cn } from '@/lib/utils'

/**
 * Product visual.
 *
 * Renders licensed artwork when `imageUrl` resolves, and otherwise falls back
 * to the game's identity tile — a branded gradient carrying the product
 * monogram. The tile is also what shows while the image loads and if it 404s,
 * so a missing asset degrades into something designed rather than a grey box.
 *
 * Only artwork the business is licensed to use belongs in `imageUrl`; see
 * `src/data/product-images.ts` for how assets are registered.
 */
export function ProductThumb({
  monogram,
  imageUrl,
  gameId,
  alt,
  className,
  size = 'default',
}: {
  monogram: string
  imageUrl?: string
  /** Drives the fallback tile's colour identity. */
  gameId?: string
  alt?: string
  className?: string
  size?: 'default' | 'lg'
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(imageUrl) && !failed
  const identity = identityForGame(gameId)

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${identity.from}, ${identity.to})` }}
    >
      <span
        className={cn(
          'font-semibold tracking-tight tabular-nums',
          size === 'lg' ? 'text-6xl' : 'text-3xl',
        )}
        style={{ color: identity.ink }}
        aria-hidden
      >
        {monogram}
      </span>

      {showImage && (
        <img
          src={imageUrl}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  )
}
