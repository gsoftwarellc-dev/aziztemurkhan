import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Clock,
  KeyRound,
  PackageCheck,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { Trust } from '@/components/home/trust'
import { FaqSection } from '@/components/home/faq-section'
import { Section } from '@/components/home/section'
import { Button } from '@/components/ui/button'
import { deliveryLabels } from '@/lib/labels'
import { cn } from '@/lib/utils'
import { usePageMeta } from '@/lib/use-page-meta'

const steps = [
  {
    icon: ShoppingCart,
    title: 'Pilih game dan produk',
    description:
      'Telusuri katalog berdasarkan game, jenis item, rarity, atau rentang harga. Setiap halaman produk mencantumkan metode dan estimasi pengiriman secara terbuka.',
    detail: 'Butuh 1 - 2 menit',
  },
  {
    icon: ClipboardList,
    title: 'Isi data akun game',
    description:
      'Masukkan data yang dibutuhkan produk tersebut, misalnya User ID dan Zone ID, Player ID, Riot ID, atau Trade URL Steam. Periksa kembali sebelum melanjutkan.',
    detail: 'Kata sandi tidak pernah diminta',
  },
  {
    icon: QrCode,
    title: 'Bayar dengan QRIS',
    description:
      'Pindai kode QRIS memakai aplikasi bank atau e-wallet apa pun. Status pembayaran diperbarui otomatis setelah dikonfirmasi penyedia pembayaran.',
    detail: 'Kode berlaku 15 menit',
  },
  {
    icon: PackageCheck,
    title: 'Pantau status pengiriman',
    description:
      'Setelah pembayaran dikonfirmasi, pesanan diproses dan Anda dapat memantau setiap perubahan status lewat halaman lacak pesanan.',
    detail: 'Konfirmasi dikirim ke email',
  },
]

const deliveryModes = [
  {
    key: 'otomatis' as const,
    time: '1 - 20 menit',
    description:
      'Pesanan diteruskan langsung ke sistem distributor begitu pembayaran dikonfirmasi, tanpa campur tangan manual.',
    examples: 'Top up diamond, UC, Genesis Crystal, voucher',
  },
  {
    key: 'manual' as const,
    time: '30 - 120 menit',
    description:
      'Tim kami memproses pesanan Anda secara langsung, biasanya melalui proses gifting resmi di dalam game.',
    examples: 'Skin gifting, Valorant Point, Robux',
  },
  {
    key: 'trade-url' as const,
    time: '15 - 60 menit',
    description:
      'Item dikirim sebagai penawaran trade Steam dari inventaris terverifikasi kami. Pastikan inventaris Anda publik.',
    examples: 'Skin Counter-Strike 2, knife, sarung tangan',
  },
]

const statuses = [
  { label: 'Menunggu pembayaran', note: 'Pesanan dibuat, menunggu QRIS dibayar.' },
  { label: 'Sudah dibayar', note: 'Pembayaran dikonfirmasi penyedia pembayaran.' },
  { label: 'Sedang diproses', note: 'Item sedang disiapkan dan dikirim.' },
  { label: 'Terkirim', note: 'Item sudah masuk ke akun Anda.' },
]

export function HowItWorksPage() {
  usePageMeta(
    'Cara Kerja — SkinJago',
    'Pelajari alur pembelian di SkinJago: pilih produk, isi data akun, bayar dengan QRIS, dan pantau status pesanan.',
  )

  return (
    <>
      <section className="border-b border-mono-200 bg-mono-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-mono-200 bg-surface px-3.5 py-1.5 text-xs font-medium text-ink">
            <Sparkles className="size-3.5" />
            Empat langkah, tanpa ribet
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Cara kerja SkinJago
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink sm:text-base">
            Kami merancang alur pembelian yang singkat dan transparan, dengan status yang
            jelas di setiap tahap sehingga Anda selalu tahu posisi pesanan Anda.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="rainbow-ring w-full sm:w-auto">
              <Link to="/katalog">
                Mulai belanja
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/lacak-pesanan">Lacak pesanan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Alternating timeline: cards sit either side of a central spine with
          numbered nodes on the line. Collapses to a single left-rail column on
          small screens, where a zig-zag would be unreadable. */}
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <ol className="relative flex flex-col gap-7">
            {/* The spine, inset so it starts and ends inside the first/last nodes. */}
            <span
              aria-hidden
              className="absolute inset-y-8 left-6 w-px bg-gradient-to-b from-mono-200 via-ink to-mono-200 sm:left-1/2 sm:-translate-x-1/2"
            />

            {steps.map((step, index) => {
              const alignRight = index % 2 === 1
              return (
                <li
                  key={step.title}
                  className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-5 sm:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] sm:gap-x-0"
                >
                  <span
                    aria-hidden
                    className="z-10 col-start-1 row-start-1 flex size-12 items-center justify-center justify-self-center rounded-full border border-mono-300 bg-surface text-sm font-semibold text-ink tabular-nums shadow-[0_0_0_6px_var(--color-surface)] sm:col-start-2 sm:size-14 sm:text-base"
                  >
                    {index + 1}
                  </span>

                  <div
                    className={cn(
                      'col-start-2 row-start-1 rounded-card border border-mono-200 bg-surface p-6 shadow-[var(--shadow-elevate)] transition-all duration-200 hover:-translate-y-1 hover:border-mono-300 hover:shadow-[var(--shadow-hover)]',
                      alignRight ? 'sm:col-start-3' : 'sm:col-start-1',
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-3',
                        // Mirror the header on left-hand cards so the icon
                        // always sits nearest the spine, badge trailing it.
                        !alignRight && 'sm:flex-row-reverse',
                      )}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink text-surface">
                        <step.icon className="size-5" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mono-100 px-2.5 py-1 text-[11px] font-medium text-ink">
                        <Clock className="size-3" />
                        {step.detail}
                      </span>
                    </div>

                    <h2
                      className={cn(
                        'mt-4 text-lg font-semibold text-ink sm:text-xl',
                        !alignRight && 'sm:text-right',
                      )}
                    >
                      {step.title}
                    </h2>
                    <p
                      className={cn(
                        'mt-2 text-[15px] leading-relaxed text-ink',
                        !alignRight && 'sm:text-right',
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Section>

      {/* Delivery methods — the brief forbids blanket "30 second" promises, so
          each mode states its own realistic window. */}
      <div className="border-y border-mono-200 bg-mono-50">
        <Section className="py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Tiga metode pengiriman
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">
              Metode yang dipakai tergantung jenis produk, dan selalu tercantum di halaman
              produk sebelum Anda membayar.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {deliveryModes.map((mode) => (
              <div key={mode.key} className="rounded-card bg-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-semibold text-ink">
                    {deliveryLabels[mode.key]}
                  </h3>
                  <span className="shrink-0 rounded-full bg-mono-100 px-2.5 py-1 text-[11px] font-medium text-ink tabular-nums">
                    {mode.time}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">{mode.description}</p>
                <p className="mt-4 border-t border-mono-100 pt-3 text-xs text-mono-500">
                  Contoh: {mode.examples}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Status pesanan yang akan Anda lihat
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              Setiap pesanan memiliki nomor referensi berformat SJ-XXXXXX. Gunakan nomor itu
              di halaman lacak pesanan untuk melihat posisi terkini.
            </p>

            <ol className="mt-6 flex flex-col gap-3">
              {statuses.map((status, index) => (
                <li
                  key={status.label}
                  className="flex items-start gap-3 rounded-xl border border-mono-200 px-4 py-3.5"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-surface tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{status.label}</p>
                    <p className="mt-0.5 text-sm text-mono-600">{status.note}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button variant="outline" asChild className="mt-6">
              <Link to="/lacak-pesanan">
                Buka halaman lacak pesanan
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-card border border-mono-200 p-6">
              <KeyRound className="size-5 text-ink" />
              <h3 className="mt-4 text-[15px] font-semibold text-ink">
                Kami tidak pernah meminta kata sandi
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Semua produk dikirim lewat pengenal publik seperti User ID, Riot ID, atau
                Trade URL. Jika ada pihak mengatasnamakan SkinJago dan meminta kata sandi
                atau kode OTP, itu bukan kami — segera laporkan.
              </p>
            </div>

            <div className="rounded-card border border-mono-200 p-6">
              <AlertTriangle className="size-5 text-ink" />
              <h3 className="mt-4 text-[15px] font-semibold text-ink">
                Periksa data sebelum membayar
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Item digital yang telah terkirim ke akun yang salah tidak dapat kami tarik
                kembali. Pastikan User ID, Zone ID, atau Trade URL sudah benar sebelum
                menyelesaikan pembayaran.
              </p>
            </div>

            <div className="rounded-card border border-mono-200 bg-mono-50 p-6">
              <ShieldCheck className="size-5 text-ink" />
              <h3 className="mt-4 text-[15px] font-semibold text-ink">
                Pesanan gagal, dana kembali
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Jika pesanan gagal kami proses karena stok habis atau kendala teknis, dana
                Anda dikembalikan penuh sesuai kebijakan pengembalian dana.
              </p>
              <Link
                to="/kebijakan-pengembalian"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-4"
              >
                Baca kebijakan pengembalian
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Trust />
      <FaqSection />
    </>
  )
}
