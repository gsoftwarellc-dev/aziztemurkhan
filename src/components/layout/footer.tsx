import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import { Logo } from './logo'
import { games } from '@/data/games'
import { company } from '@/data/company'

const katalogLinks = [
  { to: '/katalog?kategori=skin', label: 'Skin Game' },
  { to: '/katalog?kategori=top-up', label: 'Top Up Diamond' },
  { to: '/katalog?kategori=voucher', label: 'Voucher Game' },
  { to: '/katalog?kategori=akun-premium', label: 'Akses Premium' },
]

const bantuanLinks = [
  { to: '/cara-kerja', label: 'Cara Kerja' },
  { to: '/lacak-pesanan', label: 'Lacak Pesanan' },
  { to: '/bantuan', label: 'Pusat Bantuan' },
  { to: '/tentang-kami', label: 'Tentang Kami' },
]

const legalLinks = [
  { to: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
  { to: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
  { to: '/kebijakan-pengembalian', label: 'Kebijakan Pengembalian Dana' },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t border-mono-200 bg-mono-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-5">
          <div className="flex flex-col items-center md:items-start lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink">
              SkinJago adalah marketplace digital untuk skin, item dalam game, voucher, dan
              top-up. Kami menghubungkan pemain Indonesia dengan penyedia item digital
              tepercaya, dengan pembayaran QRIS dan proses yang transparan.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-mono-300 bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-mono-400"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-mono-300 bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-mono-400"
              >
                <Mail className="size-4" />
                Email
              </a>
            </div>
          </div>

          <FooterColumn title="Katalog" links={katalogLinks} />
          <FooterColumn title="Bantuan" links={bantuanLinks} />

          <div>
            <h3 className="text-sm font-semibold text-ink">Game Populer</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {games.slice(0, 6).map((game) => (
                <li key={game.id}>
                  <Link
                    to={`/game/${game.slug}`}
                    className="text-sm text-ink transition-colors hover:text-mono-600"
                  >
                    {game.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal block — essential trust signal for digital goods where the
            customer has no physical proof of purchase. */}
        <div className="mt-12 border-t border-mono-200 pt-8">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-1.5 text-xs leading-relaxed text-ink">
              <p className="font-medium text-ink">{company.legalName}</p>
              <p>
                NIB {company.nib} &middot; NPWP {company.npwp}
              </p>
              <p>{company.address}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-mono-200 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-ink">
              &copy; {new Date().getFullYear()} {company.legalName}. Seluruh hak cipta
              dilindungi.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-ink transition-colors hover:text-mono-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-mono-600 md:text-left">
            SkinJago tidak berafiliasi dengan, tidak didukung oleh, dan bukan bagian dari
            penerbit game mana pun. Seluruh nama game, logo, dan merek dagang adalah milik
            pemegang hak masing-masing.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { to: string; label: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-ink transition-colors hover:text-mono-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
