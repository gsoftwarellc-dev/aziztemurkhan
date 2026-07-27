import { PageShell, Prose } from '@/components/layout/page-shell'
import { company } from '@/data/company'
import { usePageMeta } from '@/lib/use-page-meta'

const LAST_UPDATED = '1 Juli 2026'

export function TermsPage() {
  usePageMeta(
    'Syarat & Ketentuan — SkinJago',
    'Ketentuan penggunaan layanan marketplace digital SkinJago.',
  )

  return (
    <PageShell
      title="Syarat & ketentuan"
      description={`Terakhir diperbarui ${LAST_UPDATED}`}
    >
      <Prose>
        <h2>1. Penerimaan ketentuan</h2>
        <p>
          Dengan mengakses dan melakukan transaksi di situs SkinJago, Anda menyatakan telah
          membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum di halaman ini.
          Apabila Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan
          kami.
        </p>

        <h2>2. Layanan yang kami sediakan</h2>
        <p>
          {company.legalName} menyediakan layanan perantara distribusi konten digital berupa
          skin, item dalam game, voucher, kredit permainan, dan akses premium. Kami bukan
          penerbit game dan tidak memiliki hubungan afiliasi dengan penerbit mana pun.
        </p>

        <h2>3. Kewajiban pengguna</h2>
        <ul>
          <li>
            Memastikan seluruh data akun game yang Anda masukkan, seperti User ID, Zone ID,
            Player ID, Riot ID, atau Trade URL, sudah benar sebelum melakukan pembayaran.
          </li>
          <li>
            Menggunakan metode pembayaran yang sah dan atas nama Anda sendiri atau dengan
            izin dari pemilik yang berhak.
          </li>
          <li>
            Tidak menggunakan layanan ini untuk tujuan yang melanggar hukum yang berlaku di
            Republik Indonesia maupun ketentuan penerbit game terkait.
          </li>
        </ul>

        <h2>4. Harga dan pembayaran</h2>
        <p>
          Seluruh harga ditampilkan dalam Rupiah (IDR) dan sudah termasuk pajak yang berlaku,
          kecuali dinyatakan lain. Biaya layanan ditampilkan secara terpisah pada halaman
          keranjang dan checkout sebelum Anda menyelesaikan pembayaran. Kami berhak mengubah
          harga sewaktu-waktu, namun perubahan tidak berlaku surut untuk pesanan yang sudah
          dibayar.
        </p>

        <h2>5. Pengiriman produk</h2>
        <p>
          Estimasi waktu pengiriman berbeda untuk setiap produk dan dicantumkan pada halaman
          produk. Estimasi tersebut bersifat perkiraan dan dapat terpengaruh oleh gangguan
          pada sistem penerbit game, pemeliharaan server, atau lonjakan volume pesanan.
        </p>
        <p>
          Kesalahan data akun yang Anda masukkan berada di luar tanggung jawab kami. Item
          yang telah terkirim ke akun yang salah akibat kesalahan pengisian data tidak dapat
          ditarik kembali dan tidak memenuhi syarat pengembalian dana.
        </p>

        <h2>6. Pembatasan tanggung jawab</h2>
        <p>
          Tanggung jawab kami atas suatu pesanan terbatas pada nilai transaksi pesanan
          tersebut. Kami tidak bertanggung jawab atas tindakan penerbit game terhadap akun
          Anda, termasuk pembatasan atau penangguhan akun yang disebabkan oleh pelanggaran
          ketentuan penerbit yang berada di luar kendali kami.
        </p>

        <h2>7. Perubahan ketentuan</h2>
        <p>
          Kami dapat memperbarui ketentuan ini sewaktu-waktu. Versi terbaru akan selalu
          tersedia di halaman ini dengan tanggal pembaruan yang tercantum di bagian atas.
        </p>

        <h2>8. Hukum yang berlaku</h2>
        <p>
          Ketentuan ini tunduk pada hukum Republik Indonesia. Setiap perselisihan akan
          diselesaikan terlebih dahulu secara musyawarah, dan apabila tidak tercapai
          kesepakatan, akan diselesaikan melalui pengadilan yang berwenang di Jakarta.
        </p>

        <h2>9. Kontak</h2>
        <p>
          Pertanyaan mengenai ketentuan ini dapat dikirimkan ke {company.email} atau melalui
          WhatsApp di {company.whatsapp}.
        </p>
      </Prose>
    </PageShell>
  )
}

export function PrivacyPage() {
  usePageMeta(
    'Kebijakan Privasi — SkinJago',
    'Cara SkinJago mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
  )

  return (
    <PageShell title="Kebijakan privasi" description={`Terakhir diperbarui ${LAST_UPDATED}`}>
      <Prose>
        <h2>1. Data yang kami kumpulkan</h2>
        <ul>
          <li>
            <strong>Data kontak:</strong> alamat email dan nomor WhatsApp yang Anda isikan
            saat checkout, digunakan untuk mengirim konfirmasi dan status pesanan.
          </li>
          <li>
            <strong>Data akun game:</strong> pengenal publik seperti User ID, Zone ID, Player
            ID, Riot ID, UID, atau Trade URL yang diperlukan untuk mengirim pesanan Anda.
          </li>
          <li>
            <strong>Data transaksi:</strong> riwayat pesanan, nominal, metode pembayaran, dan
            status pembayaran.
          </li>
          <li>
            <strong>Data teknis:</strong> alamat IP, jenis perangkat, dan peramban, digunakan
            untuk keamanan serta peningkatan kualitas layanan.
          </li>
        </ul>

        <h2>2. Data yang tidak kami minta</h2>
        <p>
          Kami tidak pernah meminta kata sandi akun game Anda, kode OTP, maupun data lengkap
          kartu pembayaran. Data pembayaran diproses sepenuhnya oleh penyedia jasa pembayaran
          berizin dan tidak kami simpan di sistem kami.
        </p>

        <h2>3. Penggunaan data</h2>
        <ul>
          <li>Memproses dan mengirim pesanan Anda.</li>
          <li>Mengirim konfirmasi pembayaran dan notifikasi status pengiriman.</li>
          <li>Menangani permintaan bantuan, pengembalian dana, dan penyelesaian sengketa.</li>
          <li>Mencegah penyalahgunaan layanan dan aktivitas penipuan.</li>
        </ul>

        <h2>4. Pembagian data kepada pihak ketiga</h2>
        <p>
          Data Anda hanya dibagikan kepada pihak yang diperlukan untuk memenuhi pesanan,
          yaitu penyedia jasa pembayaran, penyedia layanan pengiriman email, serta distributor
          item yang memproses pesanan Anda. Kami tidak memperjualbelikan data pribadi Anda
          kepada pihak mana pun.
        </p>

        <h2>5. Penyimpanan dan keamanan</h2>
        <p>
          Data disimpan selama diperlukan untuk kepentingan layanan dan pemenuhan kewajiban
          hukum. Kami menerapkan langkah pengamanan teknis dan organisasi yang wajar untuk
          melindungi data Anda dari akses yang tidak sah.
        </p>

        <h2>6. Hak Anda</h2>
        <p>
          Sesuai Undang-Undang Perlindungan Data Pribadi, Anda berhak mengakses, memperbaiki,
          dan meminta penghapusan data pribadi Anda, serta menarik persetujuan pemrosesan
          data. Permintaan dapat diajukan melalui {company.email}.
        </p>

        <h2>7. Cookie</h2>
        <p>
          Situs ini menggunakan cookie fungsional untuk menjaga isi keranjang belanja dan
          preferensi Anda. Anda dapat menonaktifkan cookie melalui pengaturan peramban,
          namun sebagian fitur mungkin tidak berfungsi sebagaimana mestinya.
        </p>
      </Prose>
    </PageShell>
  )
}

export function RefundPage() {
  usePageMeta(
    'Kebijakan Pengembalian Dana — SkinJago',
    'Ketentuan pengembalian dana untuk pesanan yang gagal diproses di SkinJago.',
  )

  return (
    <PageShell
      title="Kebijakan pengembalian dana"
      description={`Terakhir diperbarui ${LAST_UPDATED}`}
    >
      <Prose>
        <h2>1. Prinsip umum</h2>
        <p>
          Produk digital yang telah berhasil dikirim ke akun game Anda pada dasarnya tidak
          dapat dikembalikan, karena item tersebut sudah tidak dapat ditarik dari akun
          penerima. Namun, kami menjamin pengembalian dana penuh untuk pesanan yang gagal
          kami proses.
        </p>

        <h2>2. Pesanan yang memenuhi syarat pengembalian dana</h2>
        <ul>
          <li>Pesanan gagal diproses karena stok item habis pada saat pemrosesan.</li>
          <li>Pesanan tidak dapat kami kirim karena kendala teknis di pihak kami.</li>
          <li>
            Item tidak diterima dalam waktu yang wajar melebihi estimasi pengiriman, dan
            kegagalan tersebut bukan disebabkan oleh kesalahan data yang Anda masukkan.
          </li>
          <li>
            Terjadi pembayaran ganda untuk pesanan yang sama akibat kesalahan sistem.
          </li>
        </ul>

        <h2>3. Pesanan yang tidak memenuhi syarat</h2>
        <ul>
          <li>
            Kesalahan pengisian data akun, seperti User ID, Zone ID, atau Trade URL yang
            keliru, sehingga item terkirim ke akun lain.
          </li>
          <li>
            Perubahan pikiran setelah item berhasil dikirim dan diterima di akun Anda.
          </li>
          <li>
            Pembatasan atau penangguhan akun oleh penerbit game akibat pelanggaran ketentuan
            penerbit oleh pengguna.
          </li>
        </ul>

        <h2>4. Cara mengajukan pengembalian dana</h2>
        <ol>
          <li>
            Hubungi tim kami melalui WhatsApp di {company.whatsapp} atau email{' '}
            {company.supportEmail}.
          </li>
          <li>
            Sertakan nomor referensi pesanan Anda (format SJ-XXXXXX) dan bukti pembayaran.
          </li>
          <li>
            Jelaskan kendala yang Anda alami. Tim kami akan memverifikasi dalam waktu
            maksimal 2x24 jam kerja.
          </li>
        </ol>

        <h2>5. Waktu proses pengembalian dana</h2>
        <p>
          Setelah pengajuan disetujui, dana dikembalikan ke metode pembayaran asal Anda.
          Waktu proses mengikuti ketentuan penyedia pembayaran, umumnya 1 sampai 7 hari
          kerja untuk pembayaran melalui QRIS.
        </p>

        <h2>6. Pembayaran yang kedaluwarsa</h2>
        <p>
          Apabila kode pembayaran QRIS kedaluwarsa sebelum Anda menyelesaikan pembayaran,
          tidak ada dana yang terpotong dan tidak diperlukan pengajuan pengembalian dana.
          Anda cukup membuat pesanan baru.
        </p>
      </Prose>
    </PageShell>
  )
}
