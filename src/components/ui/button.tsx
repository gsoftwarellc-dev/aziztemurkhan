import { Slot } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-ink text-surface hover:bg-mono-800 active:bg-mono-950 shadow-[0_1px_2px_rgb(0_0_0/0.08)]',
        outline:
          'border border-mono-300 bg-surface text-ink hover:bg-mono-50 hover:border-mono-400',
        ghost: 'text-mono-600 hover:bg-mono-100 hover:text-ink',
        subtle: 'bg-mono-100 text-ink hover:bg-mono-200',
        link: 'text-ink underline-offset-4 hover:underline',
        danger: 'bg-danger text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        default: 'h-11 px-6',
        lg: 'h-13 px-8 text-base',
        icon: 'size-11',
        'icon-sm': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

export { buttonVariants }
