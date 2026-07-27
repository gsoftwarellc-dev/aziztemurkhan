import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: { to: string; label: string }
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-mono-500">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{description}</p>
        )}
      </div>

      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
