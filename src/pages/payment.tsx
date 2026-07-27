import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Clock, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NotFoundPage } from './not-found'
import { QRIS_EXPIRY_MINUTES } from '@/lib/pricing'
import {
  buildTimeline,
  findOrder,
  paymentStatusToOrderStatus,
  saveOrder,
} from '@/lib/orders'
import { paymentMethodLabels, paymentStatusLabels } from '@/lib/labels'
import { usePageMeta } from '@/lib/use-page-meta'
import { formatIDR } from '@/lib/utils'
import type { Order, PaymentStatus } from '@/types'

export function PaymentPage() {
  const { reference } = useParams<{ reference: string }>()
  const [order, setOrder] = useState<Order | undefined>(() =>
    reference ? findOrder(reference) : undefined,
  )

  usePageMeta(
    `Pembayaran ${reference ?? ''} — SkinJago`,
    'Selesaikan pembayaran QRIS untuk memproses pesanan Anda.',
  )

  const expiresAt = useMemo(() => {
    if (!order) return 0
    return Date.parse(order.createdAt) + QRIS_EXPIRY_MINUTES * 60_000
  }, [order])

  const [remaining, setRemaining] = useState(() => Math.max(0, expiresAt - Date.now()))

  const updateStatus = useCallback((paymentStatus: PaymentStatus) => {
    setOrder((current) => {
      if (!current) return current
      const orderStatus = paymentStatusToOrderStatus(paymentStatus)
      const next: Order = {
        ...current,
        paymentStatus,
        status: orderStatus,
        timeline: buildTimeline(orderStatus, current.createdAt),
      }
      saveOrder(next)
      return next
    })
  }, [])

  const isPending = order?.paymentStatus === 'pending'

  useEffect(() => {
    if (!isPending) return
    const timer = setInterval(() => {
      const next = Math.max(0, expiresAt - Date.now())
      setRemaining(next)
      if (next === 0) updateStatus('kedaluwarsa')
    }, 1000)
    return () => clearInterval(timer)
  }, [isPending, expiresAt, updateStatus])

  if (!order) return <NotFoundPage />

  const minutes = Math.floor(remaining / 60_000)
  const seconds = Math.floor((remaining % 60_000) / 1000)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="text-center">
        <Badge variant={statusVariant(order.paymentStatus)}>
          {paymentStatusLabels[order.paymentStatus]}
        </Badge>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {order.paymentStatus === 'pending'
            ? 'Selesaikan pembayaran Anda'
            : order.paymentStatus === 'berhasil'
              ? 'Pembayaran berhasil'
              : order.paymentStatus === 'kedaluwarsa'
                ? 'Waktu pembayaran habis'
                : 'Pembayaran gagal'}
        </h1>
        <p className="mt-2 text-sm text-mono-500">
          Nomor referensi{' '}
          <span className="font-medium text-ink tabular-nums">{order.reference}</span>
        </p>
      </div>

      {order.paymentStatus === 'pending' && (
        <div className="mt-8 rounded-card border border-mono-200 p-6 sm:p-8">
          <div className="flex flex-col items-center">
            <QrisPlaceholder reference={order.reference} />

            <p className="mt-6 text-sm text-mono-600">Total pembayaran</p>
            <p className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
              {formatIDR(order.total)}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-mono-200 bg-mono-50 px-4 py-2">
              <Clock className="size-4 text-mono-500" />
              <span className="text-sm font-medium text-ink tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-sm text-mono-500">tersisa</span>
            </div>

            <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-mono-600">
              Pindai kode QRIS di atas menggunakan aplikasi bank atau e-wallet apa pun yang
              mendukung QRIS. Status pembayaran akan diperbarui otomatis setelah
              dikonfirmasi.
            </p>
          </div>

          {/* Simulation controls — replaced by the payment provider webhook once
              the backend is connected. Kept visible so the flow is testable. */}
          <div className="mt-8 rounded-xl border border-dashed border-mono-300 bg-mono-50 p-4">
            <p className="text-xs font-medium text-mono-500">
              Mode demo — simulasikan callback penyedia pembayaran
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => updateStatus('berhasil')}>
                Tandai berhasil
              </Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus('gagal')}>
                Tandai gagal
              </Button>
              <Button size="sm" variant="ghost" onClick={() => updateStatus('kedaluwarsa')}>
                Tandai kedaluwarsa
              </Button>
            </div>
          </div>
        </div>
      )}

      {order.paymentStatus === 'berhasil' && (
        <div className="mt-8 rounded-card border border-mono-200 p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto size-12 text-success" />
          <h2 className="mt-4 text-lg font-semibold text-ink">
            Terima kasih, pesanan Anda sedang kami proses
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mono-600">
            Konfirmasi pembayaran telah kami kirim ke{' '}
            <span className="font-medium text-ink">{order.customerEmail}</span>. Anda dapat
            memantau status pengiriman kapan saja melalui halaman lacak pesanan.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to={`/lacak-pesanan?ref=${order.reference}`}>Lacak pesanan</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/katalog">Belanja lagi</Link>
            </Button>
          </div>
        </div>
      )}

      {(order.paymentStatus === 'gagal' || order.paymentStatus === 'kedaluwarsa') && (
        <div className="mt-8 rounded-card border border-mono-200 p-6 text-center sm:p-8">
          <AlertCircle className="mx-auto size-12 text-mono-400" />
          <h2 className="mt-4 text-lg font-semibold text-ink">
            {order.paymentStatus === 'kedaluwarsa'
              ? 'Kode pembayaran sudah kedaluwarsa'
              : 'Pembayaran tidak berhasil'}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mono-600">
            Tidak ada dana yang terpotong dari rekening Anda. Silakan buat pesanan baru untuk
            mencoba kembali, atau hubungi tim kami jika Anda membutuhkan bantuan.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/katalog">
                <RefreshCcw className="size-4" />
                Buat pesanan baru
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/bantuan">Hubungi bantuan</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-card border border-mono-200 p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-ink">Rincian pesanan</h2>
        <dl className="mt-4 flex flex-col gap-2.5 text-sm">
          <Row label="Metode pembayaran" value={paymentMethodLabels[order.paymentMethod]} />
          <Row label="Subtotal" value={formatIDR(order.subtotal)} />
          <Row label="Biaya layanan" value={formatIDR(order.serviceFee)} />
          <div className="mt-1 flex items-center justify-between border-t border-mono-200 pt-3">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="font-semibold text-ink tabular-nums">{formatIDR(order.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-mono-600">{label}</dt>
      <dd className="font-medium text-ink tabular-nums">{value}</dd>
    </div>
  )
}

function statusVariant(status: PaymentStatus) {
  switch (status) {
    case 'berhasil':
      return 'success' as const
    case 'gagal':
      return 'danger' as const
    case 'kedaluwarsa':
      return 'subtle' as const
    default:
      return 'warning' as const
  }
}

/**
 * Deterministic QR-looking placeholder. The real payload comes from the QRIS
 * provider (Midtrans/Xendit/DOKU) once the backend is connected — this keeps
 * the layout honest in the meantime without faking a scannable code.
 */
function QrisPlaceholder({ reference }: { reference: string }) {
  const cells = useMemo(() => {
    const size = 21
    const grid: boolean[] = []
    let seed = 0
    for (const char of reference) seed = (seed * 31 + char.charCodeAt(0)) >>> 0

    for (let index = 0; index < size * size; index += 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0
      grid.push(seed % 100 < 46)
    }

    // Stamp the three finder patterns so it reads unmistakably as a QR code.
    const stamp = (originRow: number, originCol: number) => {
      for (let row = 0; row < 7; row += 1) {
        for (let col = 0; col < 7; col += 1) {
          const border = row === 0 || row === 6 || col === 0 || col === 6
          const core = row >= 2 && row <= 4 && col >= 2 && col <= 4
          grid[(originRow + row) * size + (originCol + col)] = border || core
        }
      }
    }
    stamp(0, 0)
    stamp(0, size - 7)
    stamp(size - 7, 0)

    return grid
  }, [reference])

  return (
    <div className="rounded-2xl border border-mono-200 bg-surface p-4">
      <div
        className="grid gap-0"
        style={{ gridTemplateColumns: 'repeat(21, 1fr)', width: 'min(15rem, 60vw)' }}
        role="img"
        aria-label={`Kode QRIS untuk pesanan ${reference}`}
      >
        {cells.map((filled, index) => (
          <span
            key={index}
            className={filled ? 'bg-ink' : 'bg-surface'}
            style={{ aspectRatio: '1' }}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wider text-mono-400">
        Kode contoh — mode demo
      </p>
    </div>
  )
}
