import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { games } from '@/data/games'

export function Hero() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/katalog?q=${encodeURIComponent(trimmed)}` : '/katalog')
  }

  return (
    <section className="relative overflow-hidden border-b border-mono-200 bg-surface">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t('home.heroTitle')}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink sm:text-lg">
            {t('home.heroSubtitle')}
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-5 size-5 text-mono-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('home.heroSearchPlaceholder')}
                aria-label="Cari produk"
                className="h-14 w-full rounded-full border border-mono-300 bg-surface pl-13 pr-32 text-[15px] text-ink shadow-[var(--shadow-elevate)] transition-colors placeholder:text-mono-400 hover:border-mono-400 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
              />
              <Button type="submit" className="absolute right-2 h-10">
                {t('home.search')}
              </Button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-ink">{t('home.popular')}</span>
            {games.slice(0, 4).map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.slug}`}
                className="rounded-full border border-mono-200 px-3 py-1 text-xs font-medium text-mono-600 transition-colors hover:border-mono-400 hover:text-ink"
              >
                {game.name.split(':')[0]}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="rainbow-ring w-full sm:w-auto">
              <Link to="/katalog">
                {t('home.viewCatalog')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/game">{t('nav.games')}</Link>
            </Button>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs text-mono-500">
            <ShieldCheck className="size-4" />
            {t('home.heroTrust')}
          </p>
        </div>

      </div>
    </section>
  )
}
