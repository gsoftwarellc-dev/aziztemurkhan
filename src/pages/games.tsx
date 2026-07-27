import { Link } from 'react-router-dom'
import { ArrowRight, Gamepad2, Search, Sparkles } from 'lucide-react'
import { GameCard } from '@/components/catalog/game-card'
import { Button } from '@/components/ui/button'
import { games } from '@/data/games'
import { products } from '@/data/products'
import { usePageMeta } from '@/lib/use-page-meta'
import { formatIDR } from '@/lib/utils'

export function GamesPage() {
  usePageMeta(
    'Daftar Game — SkinJago',
    'Jelajahi semua game yang tersedia di SkinJago, dari Mobile Legends hingga Counter-Strike 2.',
  )

  const featured = games.filter((game) => game.featured)
  const others = games.filter((game) => !game.featured)
  const totalProducts = games.reduce((sum, game) => sum + game.productCount, 0)

  /** Cheapest live product per game — a concrete "mulai dari" price signal. */
  const cheapestByGame = new Map<string, number>()
  for (const product of products) {
    if (product.availability === 'habis') continue
    const lowest = product.variants?.length
      ? Math.min(...product.variants.map((variant) => variant.price))
      : product.price
    const current = cheapestByGame.get(product.gameId)
    if (current === undefined || lowest < current) {
      cheapestByGame.set(product.gameId, lowest)
    }
  }

  return (
    <>
      <section className="border-b border-mono-200 bg-mono-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-mono-200 bg-surface px-3.5 py-1.5 text-xs font-medium text-ink">
                <Gamepad2 className="size-3.5" />
                {games.length} game tersedia
              </span>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Semua game
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-ink sm:text-base">
                Pilih game untuk melihat seluruh skin, item, voucher, dan paket top-up yang
                kami sediakan untuk judul tersebut. Semua harga dalam Rupiah dengan
                pembayaran QRIS.
              </p>
            </div>

            <dl className="mt-8 flex gap-8 lg:mt-0 lg:shrink-0">
              <div>
                <dt className="text-xs text-ink">Total produk</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">
                  {totalProducts}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink">Game unggulan</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">
                  {featured.length}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mono-500">
              <Sparkles className="size-3.5" />
              Paling dicari
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Game unggulan
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">
              Judul dengan permintaan tertinggi dari pemain di Indonesia.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} featured />
          ))}
        </div>

        {others.length > 0 && (
          <>
            <h2 className="mt-16 text-center text-2xl font-semibold tracking-tight text-ink sm:text-left sm:text-3xl">
              Game lainnya
            </h2>
            {/* Match the featured row's 3-up rhythm so a short tail of games
                doesn't leave a lopsided gap in a wider grid. */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((game) => (
                <GameCard key={game.id} game={game} featured />
              ))}
            </div>
          </>
        )}

        {/* Quick price-entry table — lets a visitor compare starting prices
            across every game without opening each category page. */}
        <div className="mt-16 overflow-hidden rounded-card border border-mono-200">
          <div className="border-b border-mono-200 bg-mono-50 px-5 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-ink">Harga mulai per game</h2>
            <p className="mt-1 text-sm text-ink">
              Harga terendah yang tersedia untuk setiap judul saat ini.
            </p>
          </div>
          <ul className="divide-y divide-mono-200">
            {games.map((game) => {
              const from = cheapestByGame.get(game.id)
              return (
                <li key={game.id}>
                  <Link
                    to={`/game/${game.slug}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-mono-50 sm:px-6"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold tracking-tight text-surface">
                      {game.logo}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{game.name}</p>
                      <p className="truncate text-xs text-mono-500">{game.publisher}</p>
                    </div>
                    <span className="hidden text-xs text-ink tabular-nums sm:block">
                      {game.productCount} produk
                    </span>
                    <span className="shrink-0 text-right">
                      {from !== undefined ? (
                        <>
                          <span className="block text-[11px] text-mono-500">mulai</span>
                          <span className="text-sm font-semibold text-ink tabular-nums">
                            {formatIDR(from)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-mono-500">Segera</span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-card border border-mono-200 bg-mono-50 px-6 py-10 text-center">
          <Search className="size-6 text-ink" />
          <h2 className="text-lg font-semibold text-ink">Tidak menemukan game Anda?</h2>
          <p className="max-w-md text-sm leading-relaxed text-ink">
            Kami terus menambah judul baru. Telusuri seluruh katalog atau hubungi tim kami
            untuk menanyakan ketersediaan game tertentu.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/katalog">
                Lihat seluruh katalog
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/bantuan">Hubungi kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
