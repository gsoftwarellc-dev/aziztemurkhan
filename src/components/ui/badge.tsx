import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-ink text-surface',
        outline: 'border-mono-300 bg-surface text-mono-700',
        subtle: 'border-transparent bg-mono-100 text-mono-700',
        success: 'border-transparent bg-success/10 text-success',
        warning: 'border-transparent bg-warning/10 text-warning',
        danger: 'border-transparent bg-danger/10 text-danger',
        info: 'border-transparent bg-info/10 text-info',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        default: 'px-2.5 py-1 text-xs',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
