import { Star } from 'lucide-react'
import {
  initialsOf,
  reviewsRowOne,
  reviewsRowThree,
  reviewsRowTwo,
  type Review,
} from '@/data/reviews'
import { cn } from '@/lib/utils'

/**
 * Scalloped verified seal. This is the one place the monochrome system yields
 * to colour, because the blue check is what makes the mark read as "verified"
 * at a glance — rendered grey it just looks like another icon.
 */
function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 22 22"
      className="shrink-0"
      role="img"
      aria-label="Pembeli terverifikasi"
    >
      <path
        fill="#1D9BF0"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.607.22 1.265.268 1.897.136.633-.132 1.218-.436 1.688-.878.443-.47.847-1.054.877-1.687.032-.634-.016-1.29-.14-1.897.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
      />
      <path
        fill="#fff"
        d="M9.662 14.338L6.5 11.176l1.414-1.414 1.748 1.748 4.662-4.662 1.414 1.414z"
      />
    </svg>
  )
}

/**
 * Three marquee rows. Rows one and three travel right-to-left while row two
 * runs the opposite way, so the block never reads as one flat conveyor. Each
 * row renders its items twice so the -50% translation loops seamlessly.
 */
export function Reviews() {
  return (
    <section className="overflow-hidden border-t border-mono-200 bg-mono-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-mono-500">
          Ulasan pelanggan
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Dipercaya pemain di seluruh Indonesia
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">
          Ribuan pesanan diproses setiap bulan, dari top-up harian hingga item langka.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <MarqueeRow reviews={reviewsRowOne} direction="left" />
        <MarqueeRow reviews={reviewsRowTwo} direction="right" />
        <MarqueeRow reviews={reviewsRowThree} direction="left" speed="44s" />
      </div>
    </section>
  )
}

function MarqueeRow({
  reviews,
  direction,
  speed,
}: {
  reviews: Review[]
  direction: 'left' | 'right'
  /** Overrides the row's default duration so rows stay out of phase. */
  speed?: string
}) {
  return (
    <div
      // touch-pan-y: horizontal swipes can't drag the row, but the page still
      // scrolls vertically through this section on mobile.
      className="relative touch-pan-y select-none overflow-hidden"
      style={{
        // Fade the row into the page edges instead of cutting it off hard.
        maskImage:
          'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      {/* No hover/touch pause — the rows scroll continuously at all times. */}
      <div
        className={cn(
          'flex w-max gap-4',
          direction === 'left'
            ? 'motion-safe:animate-[marquee-left_32s_linear_infinite]'
            : 'motion-safe:animate-[marquee-right_38s_linear_infinite]',
        )}
        style={speed ? { animationDuration: speed } : undefined}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col rounded-card border border-mono-200 bg-surface p-5 sm:w-[22rem]">
      <div className="flex items-center gap-3">
        {/* Initials stand in for a photo — no stock portraits of people. */}
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold tracking-tight text-surface"
        >
          {initialsOf(review.name)}
        </span>
        <div className="min-w-0">
          <figcaption className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <span className="truncate">{review.name}</span>
            <VerifiedBadge />
          </figcaption>
          <p className="truncate text-xs text-mono-500">{review.role}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-0.5" aria-label={`Rating ${review.stars} dari 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              'size-3.5',
              index < review.stars ? 'fill-ink text-ink' : 'text-mono-300',
            )}
          />
        ))}
      </div>

      <blockquote className="mt-3 text-sm leading-relaxed text-ink">
        &ldquo;{review.text}&rdquo;
      </blockquote>
    </figure>
  )
}
