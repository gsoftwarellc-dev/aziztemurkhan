import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Logo } from './logo'
import { LanguageSwitcher } from './language-switcher'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { games } from '@/data/games'
import { useCart } from '@/lib/use-cart'
import { cn } from '@/lib/utils'

const navigation = [
  { to: '/', key: 'nav.home' },
  { to: '/katalog', key: 'nav.catalog' },
  { to: '/game', key: 'nav.games' },
  { to: '/cara-kerja', key: 'nav.howItWorks' },
  { to: '/lacak-pesanan', key: 'nav.trackOrder' },
  { to: '/bantuan', key: 'nav.help' },
] as const

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-surface/85 backdrop-blur-xl transition-colors',
        scrolled ? 'border-mono-200' : 'border-transparent',
      )}
    >
      <div className="relative mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label={t('nav.openMenu')}>
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
            <div className="border-b border-mono-200 p-5">
              <Logo />
            </div>
            <nav className="flex flex-col p-2">
              {navigation.map((item) => (
                <SheetClose asChild key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors',
                        isActive ? 'bg-mono-100' : 'hover:bg-mono-50',
                      )
                    }
                  >
                    {t(item.key)}
                  </NavLink>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-2 border-t border-mono-200 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mono-400">
                {t('nav.popularGames')}
              </p>
              <div className="flex flex-col gap-1">
                {games.slice(0, 5).map((game) => (
                  <SheetClose asChild key={game.id}>
                    <Link
                      to={`/game/${game.slug}`}
                      className="rounded-lg px-2 py-2 text-sm text-mono-600 transition-colors hover:bg-mono-50 hover:text-ink"
                    >
                      {game.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="shrink-0" aria-label="SkinJago beranda">
          <Logo />
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex xl:absolute xl:left-1/2 xl:ml-0 xl:-translate-x-1/2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-2.5 text-[15px] font-medium text-ink transition-colors xl:px-4 xl:text-base',
                  isActive ? 'bg-mono-100' : 'hover:bg-mono-50',
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>


        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" asChild className="relative">
            <Link to="/keranjang" aria-label={`Keranjang, ${itemCount} item`}>
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-surface tabular-nums">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          </Button>

          <LanguageSwitcher />

          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link to="/katalog">{t('nav.shop')}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
