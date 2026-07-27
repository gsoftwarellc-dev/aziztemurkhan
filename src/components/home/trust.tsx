import { BadgeCheck, Headphones, Lock, RefreshCcw } from 'lucide-react'
import { Section } from './section'
import { paymentMethods } from '@/lib/labels'
import { cn } from '@/lib/utils'

const pillars = [
  {
    icon: BadgeCheck,
    title: 'Produk terverifikasi',
    description:
      'Setiap item diperiksa keasliannya sebelum dikirim ke akun atau inventaris Anda.',
  },
  {
    icon: Lock,
    title: 'Pembayaran aman',
    description:
      'Transaksi diproses lewat penyedia jasa pembayaran QRIS yang berizin Bank Indonesia.',
  },
  {
    icon: RefreshCcw,
    title: 'Jaminan pengembalian dana',
    description:
      'Jika pesanan gagal diproses, dana dikembalikan penuh sesuai kebijakan pengembalian kami.',
  },
  {
    icon: Headphones,
    title: 'Bantuan setiap hari',
    description:
      'Tim dukungan siap membantu lewat WhatsApp dan email pada jam operasional kami.',
  },
]

export function Trust() {
  return (
    <div className="border-y border-mono-200 bg-mono-50">
      <Section className="py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center rounded-card bg-surface p-6 text-center sm:items-start sm:text-left">
              <pillar.icon className="size-5 text-ink" />
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-mono-200 bg-surface px-6 py-7">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-mono-500">
            Metode pembayaran
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {paymentMethods.map((method) => (
              <li key={method.id}>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium',
                    method.available
                      ? 'border-mono-300 bg-surface text-ink'
                      : 'border-dashed border-mono-200 bg-mono-50 text-mono-400',
                  )}
                >
                  {method.name}
                  {!method.available && (
                    <span className="text-[10px] font-medium uppercase tracking-wide">
                      Segera
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-ink">
            QRIS dapat dibayar memakai aplikasi bank dan e-wallet apa pun yang mendukung
            standar QRIS di Indonesia.
          </p>
        </div>
      </Section>
    </div>
  )
}
