import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="SkinJago"
      width={148}
      height={32}
      className={cn('h-9 w-auto select-none lg:h-11', className)}
    />
  )
}
