import { Dialog as SheetPrimitive } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close
export const SheetTitle = SheetPrimitive.Title
export const SheetDescription = SheetPrimitive.Description

export function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'left' | 'right'
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_200ms_ease]" />
      <SheetPrimitive.Content
        className={cn(
          'fixed inset-y-0 z-50 flex w-full max-w-sm flex-col bg-surface shadow-[0_0_60px_-15px_rgb(0_0_0/0.3)] outline-none',
          side === 'right'
            ? 'right-0 data-[state=open]:animate-[slide-in-right_260ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-right_200ms_ease-in]'
            : 'left-0 data-[state=open]:animate-[slide-in-left_260ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-left_200ms_ease-in]',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          aria-label="Tutup"
          className="absolute right-4 top-4 rounded-full p-2 text-mono-500 transition-colors hover:bg-mono-100 hover:text-ink"
        >
          <X className="size-4" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}
