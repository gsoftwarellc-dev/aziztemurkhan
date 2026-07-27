import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePageMeta } from '@/lib/use-page-meta'

export function NotFoundPage() {
  usePageMeta('Halaman tidak ditemukan — SkinJago')

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-semibold tracking-tight text-mono-200">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-mono-600">
        Halaman yang Anda cari mungkin telah dipindahkan atau tautannya sudah tidak berlaku.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">Kembali ke beranda</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/katalog">Lihat katalog</Link>
        </Button>
      </div>
    </div>
  )
}
