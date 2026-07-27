import { cn } from '@/lib/utils'

export function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-mono-200 bg-surface px-4 text-sm text-ink transition-colors',
        'placeholder:text-mono-400',
        'hover:border-mono-300',
        'focus-visible:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
        'disabled:cursor-not-allowed disabled:bg-mono-50 disabled:text-mono-400',
        'aria-invalid:border-danger aria-invalid:ring-danger',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex min-h-24 w-full rounded-xl border border-mono-200 bg-surface px-4 py-3 text-sm text-ink transition-colors',
        'placeholder:text-mono-400 hover:border-mono-300',
        'focus-visible:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
        className,
      )}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      className={cn(
        'flex h-11 w-full appearance-none rounded-xl border border-mono-200 bg-surface px-4 text-sm text-ink transition-colors',
        "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:18px] bg-[right_0.9rem_center] bg-no-repeat pr-11",
        'hover:border-mono-300 focus-visible:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn('text-sm font-medium text-ink', className)}
      {...props}
    />
  )
}
