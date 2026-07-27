import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Product visual. Renders `imageUrl` when supplied, falling back to a clean
 * monogram tile while loading or if the image fails.
 *
 * IMPORTANT: only artwork the business is licensed to use belongs in
 * `imageUrl`. Publisher game art (skins, weapon models, character renders) is
 * copyrighted and must not be hotlinked into the storefront.
 */
export function ProductThumb({
  monogram,
  imageUrl,
  alt,
  className,
  size = 'default',
}: {
  monogram: string
  imageUrl?: string
  alt?: string
  className?: string
  size?: 'default' | 'lg'
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(imageUrl) && !failed

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-mono-50',
        className,
      )}
    >
      <span
        className={cn(
          'font-semibold tracking-tight text-mono-400 tabular-nums',
          size === 'lg' ? 'text-6xl' : 'text-3xl',
        )}
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
