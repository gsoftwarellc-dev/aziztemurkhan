import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { Trust } from '@/components/home/trust'
import { Reviews } from '@/components/home/reviews'
import { Section, SectionHeading } from '@/components/home/section'
import { ProductCard } from '@/components/catalog/product-card'
import { GameCard } from '@/components/catalog/game-card'
import { games } from '@/data/games'
import { featuredProducts, popularProducts } from '@/lib/catalog'
import { usePageMeta } from '@/lib/use-page-meta'

export function HomePage() {
  usePageMeta(
    'SkinJago — Marketplace Skin dan Item Game Indonesia',
    'Beli skin, item dalam game, voucher, dan top-up dengan pembayaran QRIS. Proses transparan dan harga dalam Rupiah.',
  )

  return (
    <>
      <Hero />

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Jelajahi"
          title="Pilih game favorit Anda"
          description="Katalog kami mencakup game paling populer di Indonesia, dari mobile hingga PC."
          action={{ to: '/game', label: 'Semua game' }}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {games.slice(0, 8).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Pilihan kami"
          title="Produk unggulan"
          description="Item pilihan dengan permintaan tertinggi minggu ini."
          action={{ to: '/katalog', label: 'Lihat katalog' }}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Paling laris"
          title="Sering dibeli pemain lain"
          description="Produk dengan jumlah transaksi terbanyak di SkinJago."
          action={{ to: '/katalog?urutkan=terpopuler', label: 'Lihat semua' }}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {popularProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Trust />

      <HowItWorks />
      <Reviews />
    </>
  )
}
