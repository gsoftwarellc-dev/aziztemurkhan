/** Shared shell for prose-heavy content and legal pages. */
export function PageShell({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <header className="border-b border-mono-200 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-mono-600">{description}</p>
        )}
      </header>
      <div className="mt-8">{children}</div>
    </div>
  )
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-mono-600 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-[15px] [&_h3]:font-semibold [&_h3]:text-ink [&_li]:pl-1 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
      {children}
    </div>
  )
}
