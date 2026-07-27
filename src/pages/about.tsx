import { PageShell, Prose } from '@/components/layout/page-shell'
import { company } from '@/data/company'
import { usePageMeta } from '@/lib/use-page-meta'

export function AboutPage() {
  usePageMeta(
    'Tentang Kami — SkinJago',
    'SkinJago adalah marketplace digital Indonesia untuk skin, item dalam game, voucher, dan top-up.',
  )

  return (
    <PageShell
      title="Tentang kami"
      description="SkinJago adalah marketplace digital yang fokus pada distribusi item game untuk pemain di Indonesia."
    >
      <Prose>
        <p>
          SkinJago dibangun untuk menjawab satu kebutuhan sederhana: membeli skin dan item
          game seharusnya mudah, jelas harganya, dan aman untuk akun pemain. Kami
          menyediakan katalog item digital untuk game yang paling banyak dimainkan di
          Indonesia, dengan harga dalam Rupiah dan pembayaran melalui QRIS yang sudah
          familier bagi pengguna lokal.
        </p>

        <h2>Apa yang kami lakukan</h2>
        <p>
          Kami berperan sebagai perantara distribusi konten digital. Kami menghubungkan
          pemain dengan penyedia dan distributor item game, lalu memproses pengiriman ke akun
          Anda melalui jalur resmi seperti pengisian lewat ID publik, gifting dalam game,
          maupun Steam trade offer.
        </p>

        <h2>Prinsip kami</h2>
        <ul>
          <li>
            <strong>Transparan.</strong> Setiap produk mencantumkan metode dan estimasi
            pengiriman apa adanya. Kami tidak menjanjikan waktu pengiriman yang tidak dapat
            kami penuhi.
          </li>
          <li>
            <strong>Aman untuk akun Anda.</strong> Kami tidak pernah meminta kata sandi akun.
            Data yang kami butuhkan hanya pengenal publik sesuai jenis produk.
          </li>
          <li>
            <strong>Bertanggung jawab.</strong> Jika pesanan gagal kami proses, dana Anda
            dikembalikan penuh sesuai kebijakan pengembalian dana kami.
          </li>
        </ul>

        <h2>Identitas badan usaha</h2>
        <p>
          {company.legalName} terdaftar dengan klasifikasi baku lapangan usaha KBLI{' '}
          {company.kbli.code} &mdash; {company.kbli.title}, yang mencakup kegiatan distribusi
          dan perantara konten digital termasuk item permainan video.
        </p>
        <ul>
          <li>Nama badan usaha: {company.legalName}</li>
          <li>NIB: {company.nib}</li>
          <li>NPWP: {company.npwp}</li>
          <li>Alamat: {company.address}</li>
          <li>Email: {company.email}</li>
          <li>WhatsApp: {company.whatsapp}</li>
        </ul>

        <h2>Keterangan merek dagang</h2>
        <p>
          SkinJago tidak berafiliasi dengan, tidak didukung oleh, dan bukan bagian dari
          penerbit game mana pun. Seluruh nama game, logo, dan merek dagang yang disebutkan
          di situs ini adalah milik pemegang hak masing-masing dan digunakan semata-mata
          untuk keperluan identifikasi produk.
        </p>
      </Prose>
    </PageShell>
  )
}
