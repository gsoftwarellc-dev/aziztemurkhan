import { ClipboardList, PackageCheck, QrCode, ShoppingCart } from 'lucide-react'
import { Section, SectionHeading } from './section'

const steps = [
  {
    icon: ShoppingCart,
    title: 'Pilih game dan produk',
    description:
      'Telusuri katalog berdasarkan game, jenis item, rarity, atau rentang harga sampai menemukan produk yang Anda cari.',
  },
  {
    icon: ClipboardList,
    title: 'Isi data akun game',
    description:
      'Masukkan data yang dibutuhkan seperti User ID, Zone ID, atau Trade URL. Kami tidak pernah meminta kata sandi akun Anda.',
  },
  {
    icon: QrCode,
    title: 'Bayar dengan QRIS',
    description:
      'Pindai kode QRIS memakai aplikasi bank atau e-wallet apa pun. Status pembayaran diperbarui secara otomatis.',
  },
  {
    icon: PackageCheck,
    title: 'Pantau status pengiriman',
    description:
      'Setelah pembayaran dikonfirmasi, pesanan diproses dan Anda dapat memantau statusnya lewat halaman lacak pesanan.',
  },
]

export function HowItWorks() {
  return (
    <Section className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Cara kerja"
        title="Empat langkah, selesai."
        description="Proses pembelian dibuat sesederhana mungkin, dengan status yang jelas di setiap tahap."
      />

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex flex-col items-center rounded-card border border-mono-200 bg-surface p-6 text-center sm:items-start sm:text-left"
          >
            <div className="flex w-full items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mono-100">
                <step.icon className="size-5 text-ink" />
              </span>
              <span className="text-2xl font-semibold text-mono-200 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 text-[15px] font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* Honest delivery framing — the brief explicitly forbids promising
          "30 second delivery" while automatic delivery is not yet wired up. */}
      <p className="mt-6 text-center text-xs leading-relaxed text-ink sm:text-left">
        Estimasi waktu pengiriman berbeda untuk setiap produk dan tercantum di halaman
        produk. Produk dengan pengiriman otomatis diproses lebih cepat, sedangkan produk
        tertentu diverifikasi manual oleh tim kami.
      </p>
    </Section>
  )
}
