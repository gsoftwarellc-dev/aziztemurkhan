import { Accordion as AccordionPrimitive } from 'radix-ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-mono-200 last:border-b-0', className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-start justify-between gap-4 py-5 text-left text-[15px] font-medium text-ink transition-colors hover:text-mono-600',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="mt-0.5 size-4 shrink-0 text-mono-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_200ms_ease] data-[state=open]:animate-[accordion-down_200ms_ease]"
      {...props}
    >
      <div className={cn('pb-5 pr-8 text-sm leading-relaxed text-mono-600', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
