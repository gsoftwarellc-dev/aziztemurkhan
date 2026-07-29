import { PageShell, Prose } from '@/components/layout/page-shell'
import { company } from '@/data/company'
import { usePageMeta } from '@/lib/use-page-meta'

const LAST_UPDATED = '28 Juli 2026'

/**
 * Legal pages.
 *
 * ⚠️ HANDOVER — REQUIRES LEGAL SIGN-OFF BEFORE LAUNCH
 * These policies are drafted around how the storefront actually works: the
 * three delivery methods in `src/types/index.ts` (otomatis / manual /
 * trade-url), the seven order statuses, the per-product checkout fields, and
 * QRIS as the primary payment rail. That makes them specific rather than
 * generic boilerplate.
 *
 * Every clause marked [PERLU KONFIRMASI] contains a commitment the business
 * must verify or replace. Do not launch with those markers still visible. An
 * Indonesian lawyer should review the final text against UU PDP (27/2022), UU
 * ITE, UU Perlindungan Konsumen (8/1999), UU KUP, and PP 80/2019.
 *
 * CLIENT ANSWERS RECEIVED 2026-07-29 — applied:
 * - Support response time: 36 hours (also used for data-subject requests).
 * - Dispute: first raised by email, per the client's answer.
 *
 * NOT applied — the client's answers cannot be used as given, and each is
 * still marked in place with the reason:
 * - Retention "about 2 days": transaction records must be kept 10 years under
 *   UU KUP, and 2 days would make refund verification impossible. The question
 *   needs splitting into transaction data vs personal data.
 * - Refund window "12 hours": contradicts the client's own 36-hour response
 *   time — a customer cannot receive a reply before the window closes.
 * - Dispute "via email": email is a contact channel, not a dispute forum. The
 *   clause must name BPSK or a competent district court.
 * - CS2 "buy after order": the item can sit in a Steam trade hold for up to 7
 *   days, so the advertised 15-60 minute delivery estimate is unachievable.
 */

/** Renders an inline marker for facts the business must confirm. */
function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-warning/15 px-1 py-0.5 text-inherit">
      [PERLU KONFIRMASI: {children}]
    </mark>
  )
}

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
          Dengan mengakses situs SkinJago, membuat akun, atau menyelesaikan pembelian, Anda
          menyatakan telah membaca, memahami, dan terikat pada seluruh ketentuan di halaman
          ini beserta Kebijakan Privasi dan Kebijakan Pengembalian Dana yang menjadi bagian
          tidak terpisahkan darinya. Apabila Anda tidak menyetujui ketentuan ini, mohon tidak
          menggunakan layanan kami.
        </p>
        <p>
          Layanan ini ditujukan bagi pengguna berusia minimal 17 tahun atau yang telah
          memiliki Kartu Tanda Penduduk. Pengguna di bawah usia tersebut hanya boleh
          bertransaksi dengan persetujuan dan pengawasan orang tua atau wali yang sah.
        </p>

        <h2>2. Sifat layanan kami</h2>
        <p>
          {company.legalName} adalah perantara distribusi konten digital berupa skin, item
          dalam game, voucher, kredit permainan, dan akses premium. Kami{' '}
          <strong>bukan penerbit game</strong> dan tidak memiliki hubungan afiliasi,
          kemitraan, sponsorship, atau dukungan resmi dari penerbit mana pun. Seluruh nama
          game, logo, dan merek dagang adalah milik pemegang hak masing-masing.
        </p>
        <p>
          Kami tidak menjual akun game, tidak menyediakan jasa joki atau peningkatan
          peringkat, dan tidak memperjualbelikan mata uang dalam game di luar jalur
          distribusi resmi.
        </p>

        <h2>3. Akun pengguna</h2>
        <p>
          Anda bertanggung jawab menjaga kerahasiaan kata sandi akun SkinJago Anda dan atas
          seluruh aktivitas yang terjadi melalui akun tersebut. Beri tahu kami segera apabila
          Anda menduga terjadi akses tanpa izin. Kami berhak menangguhkan akun yang terindikasi
          melakukan penipuan, penyalahgunaan sistem pengembalian dana, atau pembayaran dengan
          instrumen yang bukan haknya.
        </p>

        <h2>4. Kewajiban pengguna saat memesan</h2>
        <ul>
          <li>
            Memastikan seluruh data akun game yang Anda masukkan sudah benar{' '}
            <strong>sebelum</strong> melakukan pembayaran. Data yang diminta berbeda untuk
            setiap produk, misalnya User ID dan Zone ID untuk Mobile Legends, Player ID untuk
            Free Fire, Riot ID beserta tagline untuk Valorant, UID dan server untuk Genshin
            Impact, atau Trade URL Steam untuk item Counter-Strike 2.
          </li>
          <li>
            Memastikan akun tujuan dalam keadaan aktif, tidak sedang dibatasi penerbit, dan
            mampu menerima item. Untuk item Counter-Strike 2, akun Steam Anda tidak boleh
            berada dalam masa trade hold dan Trade URL harus dalam keadaan aktif.
          </li>
          <li>
            Menggunakan metode pembayaran yang sah dan atas nama Anda sendiri, atau dengan
            izin tertulis dari pemilik yang berhak.
          </li>
          <li>
            Tidak menggunakan layanan ini untuk pencucian uang, pendanaan aktivitas terlarang,
            atau tujuan lain yang melanggar hukum Republik Indonesia maupun ketentuan penerbit
            game terkait.
          </li>
        </ul>

        <h2>5. Harga dan pembayaran</h2>
        <p>
          Seluruh harga ditampilkan dalam Rupiah (IDR) dan sudah termasuk pajak yang berlaku,
          kecuali dinyatakan lain. Biaya layanan ditampilkan terpisah pada halaman keranjang
          dan checkout sebelum Anda menyelesaikan pembayaran.
        </p>
        <p>
          Harga item pasar seperti skin Counter-Strike 2 mengikuti nilai pasar yang bergerak
          setiap saat. Harga yang mengikat adalah harga yang tertera pada saat pesanan Anda
          dibuat. Apabila terjadi kesalahan harga yang nyata dan signifikan akibat kekeliruan
          sistem, kami berhak membatalkan pesanan tersebut dan mengembalikan dana Anda secara
          penuh sebelum pesanan diproses.
        </p>
        <p>
          Pembayaran QRIS memiliki masa berlaku terbatas. Kode yang tidak dibayar hingga
          melewati batas waktu akan kedaluwarsa secara otomatis dan pesanan dibatalkan tanpa
          pemotongan dana.
        </p>

        <h2>6. Pengiriman produk</h2>
        <p>Kami menggunakan tiga metode pengiriman, masing-masing dengan karakteristik berbeda:</p>
        <ul>
          <li>
            <strong>Otomatis</strong> — item dikirim oleh sistem segera setelah pembayaran
            dikonfirmasi, umumnya dalam 1 sampai 20 menit sesuai estimasi pada halaman produk.
          </li>
          <li>
            <strong>Manual</strong> — item dikirim oleh admin melalui proses gifting resmi,
            umumnya dalam 30 sampai 120 menit pada jam operasional{' '}
            {company.operationalHours}. Pesanan yang masuk di luar jam tersebut diproses pada
            jam operasional berikutnya.
          </li>
          <li>
            <strong>Trade URL</strong> — item Counter-Strike 2 dikirim melalui penawaran trade
            Steam resmi.{' '}
            <Confirm>
              estimasi waktu pengiriman item CS2. Klien menyatakan item dibeli setelah pesanan
              masuk, sehingga item dapat terkena Steam trade hold hingga 7 hari sebelum dapat
              dikirim. Estimasi 15&ndash;60 menit yang tercantum pada halaman produk tidak
              dapat dipenuhi dengan model ini — estimasi harus diperpanjang, atau item
              disimpan lebih dulu sebagai inventaris
            </Confirm>{' '}
            Anda wajib menerima penawaran trade tersebut dalam waktu{' '}
            <Confirm>batas waktu penerimaan trade offer, misalnya 24 jam</Confirm>. Penawaran
            yang tidak diterima dalam batas waktu akan dibatalkan.
          </li>
        </ul>
        <p>
          Estimasi waktu bersifat perkiraan dan dapat terpengaruh oleh gangguan sistem penerbit
          game, pemeliharaan server, masa tunggu trade Steam, atau lonjakan volume pesanan.
          Estimasi bukan merupakan jaminan waktu pengiriman.
        </p>
        <p>
          Kesalahan data akun yang Anda masukkan berada di luar tanggung jawab kami. Item yang
          telah terkirim ke akun yang salah akibat kesalahan pengisian data tidak dapat ditarik
          kembali dan tidak memenuhi syarat pengembalian dana. Periksa kembali data Anda pada
          halaman checkout.
        </p>

        <h2>7. Status pesanan</h2>
        <p>
          Setiap pesanan melewati status berikut, yang dapat Anda pantau melalui halaman Lacak
          Pesanan menggunakan nomor referensi berformat SJ-XXXXXX, atau melalui riwayat pesanan
          pada akun Anda: Menunggu Pembayaran, Dibayar, Diproses, Terkirim, serta status akhir
          Gagal, Dibatalkan, atau Dana Dikembalikan apabila pesanan tidak dapat diselesaikan.
        </p>

        <h2>8. Pembatasan tanggung jawab</h2>
        <p>
          Sepanjang diizinkan hukum yang berlaku, tanggung jawab kami atas suatu pesanan
          terbatas pada nilai transaksi pesanan tersebut. Kami tidak bertanggung jawab atas
          kerugian tidak langsung, kehilangan kesempatan, atau kerugian atas nilai item yang
          berubah setelah pengiriman berhasil dilakukan.
        </p>
        <p>
          Kami tidak bertanggung jawab atas tindakan penerbit game terhadap akun Anda,
          termasuk pembatasan, penangguhan, atau penghapusan item, yang disebabkan oleh
          pelanggaran ketentuan penerbit atau kebijakan penerbit yang berada di luar kendali
          kami. Ketentuan ini tidak menghapus hak Anda sebagai konsumen berdasarkan
          Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen.
        </p>

        <h2>9. Penyelesaian keluhan dan sengketa</h2>
        <p>
          Sampaikan keluhan melalui WhatsApp {company.whatsapp} atau email{' '}
          {company.supportEmail} dengan menyertakan nomor referensi pesanan. Kami menanggapi
          keluhan dalam waktu <strong>36 jam</strong> sejak keluhan diterima.
        </p>
        <p>
          Penyelesaian sengketa diupayakan terlebih dahulu secara musyawarah melalui email{' '}
          {company.supportEmail}. Apabila kesepakatan tidak tercapai, sengketa diselesaikan
          melalui{' '}
          <Confirm>
            forum penyelesaian sengketa formal. &quot;Melalui email&quot; adalah saluran
            komunikasi, bukan forum penyelesaian sengketa — klausul ini harus menyebut BPSK
            atau pengadilan negeri yang berwenang. Konsumen tetap berhak mengajukan sengketa
            ke BPSK menurut UU 8/1999 terlepas dari isi klausul ini
          </Confirm>
          . Ketentuan ini tunduk pada hukum Republik Indonesia.
        </p>

        <h2>10. Perubahan ketentuan</h2>
        <p>
          Kami dapat memperbarui ketentuan ini sewaktu-waktu. Versi terbaru selalu tersedia di
          halaman ini dengan tanggal pembaruan di bagian atas. Perubahan yang bersifat material
          akan kami beri tahukan melalui email kepada pengguna terdaftar sebelum berlaku.
          Perubahan tidak berlaku surut terhadap pesanan yang sudah dibayar.
        </p>

        <h2>11. Kontak</h2>
        <p>
          {company.legalName}, {company.address}. Pertanyaan mengenai ketentuan ini dapat
          dikirimkan ke {company.email} atau melalui WhatsApp di {company.whatsapp}.
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
        <p>
          Kebijakan ini menjelaskan bagaimana {company.legalName} memproses data pribadi Anda
          sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.
          Pengendali data adalah {company.legalName}, {company.address}.
        </p>

        <h2>1. Data yang kami kumpulkan</h2>
        <ul>
          <li>
            <strong>Data akun:</strong> nama, alamat email, nomor WhatsApp, dan kata sandi
            terenkripsi, saat Anda mendaftar.
          </li>
          <li>
            <strong>Data akun game:</strong> pengenal publik yang diperlukan untuk mengirim
            pesanan, seperti User ID dan Zone ID, Player ID, Riot ID, UID dan server, username
            Roblox, atau Trade URL Steam. Data ini kami simpan pada profil Anda agar pembelian
            berikutnya dapat terisi otomatis, dan dapat Anda hapus kapan saja.
          </li>
          <li>
            <strong>Data transaksi:</strong> riwayat pesanan, nominal, metode pembayaran, dan
            status pembayaran.
          </li>
          <li>
            <strong>Data teknis:</strong> alamat IP, jenis perangkat, dan peramban, digunakan
            untuk keamanan, pencegahan penipuan, serta peningkatan kualitas layanan.
          </li>
        </ul>

        <h2>2. Data yang tidak pernah kami minta</h2>
        <p>
          Kami tidak pernah meminta kata sandi akun game Anda, kode OTP, PIN, maupun data
          lengkap kartu pembayaran. Data pembayaran diproses sepenuhnya oleh penyedia jasa
          pembayaran berizin dan tidak kami simpan. Waspadai pihak mana pun yang mengatasnamakan
          SkinJago dan meminta data tersebut.
        </p>

        <h2>3. Dasar dan tujuan pemrosesan</h2>
        <ul>
          <li>
            <strong>Pelaksanaan perjanjian</strong> — memproses serta mengirim pesanan Anda dan
            mengirimkan konfirmasi pembayaran maupun notifikasi pengiriman.
          </li>
          <li>
            <strong>Kewajiban hukum</strong> — memenuhi kewajiban perpajakan dan pencatatan
            transaksi.
          </li>
          <li>
            <strong>Kepentingan yang sah</strong> — mencegah penipuan, penyalahgunaan layanan,
            dan menjaga keamanan sistem.
          </li>
          <li>
            <strong>Persetujuan</strong> — pengiriman informasi promosi, apabila Anda memilih
            untuk menerimanya. Persetujuan dapat ditarik kapan saja.
          </li>
        </ul>

        <h2>4. Pembagian data kepada pihak ketiga</h2>
        <p>
          Data Anda hanya dibagikan kepada pihak yang diperlukan untuk memenuhi pesanan, yaitu
          penyedia jasa pembayaran berizin Bank Indonesia, penyedia layanan pengiriman email,
          serta distributor item yang memproses pesanan Anda. Kami{' '}
          <strong>tidak memperjualbelikan</strong> data pribadi Anda kepada pihak mana pun.
        </p>
        <p>
          <Confirm>
            daftar final pemroses data pihak ketiga beserta lokasi server, misalnya penyedia
            QRIS, penyedia email transaksional, dan penyedia hosting
          </Confirm>
        </p>

        <h2>5. Penyimpanan dan masa retensi</h2>
        <p>
          Data transaksi disimpan selama{' '}
          <Confirm>
            masa retensi data transaksi. Klien menjawab &quot;sekitar 2 hari&quot;, dan angka
            ini TIDAK DAPAT DIGUNAKAN: dokumen pembukuan dan transaksi wajib disimpan 10 tahun
            menurut UU KUP. Retensi 2 hari juga membuat proses pengembalian dana tidak mungkin
            diverifikasi. Pertanyaan ini perlu dipisah — berapa lama data transaksi disimpan
            (wajib 10 tahun), dan berapa lama data pribadi disimpan setelah akun ditutup
          </Confirm>{' '}
          untuk memenuhi kewajiban hukum dan perpajakan. Data akun disimpan selama akun Anda
          aktif dan dihapus dalam waktu{' '}
          <Confirm>masa penghapusan setelah permintaan, misalnya 30 hari</Confirm> setelah
          permintaan penghapusan disetujui, kecuali bagian yang wajib kami simpan menurut
          hukum.
        </p>
        <p>
          Kami menerapkan langkah pengamanan teknis dan organisasi yang wajar, termasuk
          enkripsi kata sandi dan pembatasan akses internal, untuk melindungi data Anda dari
          akses tanpa izin.
        </p>

        <h2>6. Hak Anda sebagai subjek data</h2>
        <p>
          Sesuai UU Pelindungan Data Pribadi, Anda berhak memperoleh informasi mengenai data
          Anda, mengakses dan memperoleh salinannya, memperbaiki data yang tidak akurat,
          mengakhiri pemrosesan, menghapus data, serta menarik persetujuan. Permintaan dapat
          diajukan melalui {company.email} dan kami tanggapi dalam waktu{' '}
          <strong>36 jam</strong>.
        </p>

        <h2>7. Pemberitahuan kegagalan pelindungan data</h2>
        <p>
          Apabila terjadi kegagalan pelindungan data pribadi, kami memberitahukan kepada Anda
          dan kepada lembaga yang berwenang paling lambat 3x24 jam sejak diketahui, sesuai
          ketentuan UU Pelindungan Data Pribadi.
        </p>

        <h2>8. Cookie</h2>
        <p>
          Situs ini menggunakan cookie dan penyimpanan lokal peramban untuk menjaga isi
          keranjang belanja, sesi masuk, dan preferensi bahasa Anda. Anda dapat menonaktifkannya
          melalui pengaturan peramban, namun sebagian fitur tidak akan berfungsi sebagaimana
          mestinya.
        </p>

        <h2>9. Kontak</h2>
        <p>
          Pertanyaan atau keberatan terkait pemrosesan data pribadi dapat disampaikan ke{' '}
          {company.email}. <Confirm>penunjukan dan kontak Pejabat Pelindungan Data, apabila diwajibkan</Confirm>
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
          dapat dikembalikan, karena item tersebut tidak dapat ditarik kembali dari akun
          penerima. Namun, kami menjamin pengembalian dana penuh untuk pesanan yang gagal kami
          proses. Ketentuan ini tidak mengurangi hak Anda berdasarkan Undang-Undang Nomor 8
          Tahun 1999 tentang Perlindungan Konsumen.
        </p>

        <h2>2. Pesanan yang memenuhi syarat pengembalian dana</h2>
        <ul>
          <li>Pesanan gagal diproses karena stok item habis pada saat pemrosesan.</li>
          <li>Pesanan tidak dapat kami kirim karena kendala teknis di pihak kami.</li>
          <li>
            Item tidak diterima dalam waktu yang wajar melebihi estimasi pengiriman, dan
            kegagalan tersebut bukan disebabkan oleh kesalahan data yang Anda masukkan. Batas
            wajar yang kami gunakan adalah{' '}
            <Confirm>
              batas keterlambatan sebelum pesanan dianggap gagal, misalnya 24 jam untuk
              pengiriman otomatis dan 3 hari kerja untuk pre-order
            </Confirm>
            .
          </li>
          <li>Terjadi pembayaran ganda untuk pesanan yang sama akibat kesalahan sistem.</li>
          <li>
            Item yang dikirim tidak sesuai dengan deskripsi pada halaman produk, misalnya
            kondisi float atau varian skin Counter-Strike 2 yang berbeda dari yang dipesan.
          </li>
        </ul>

        <h2>3. Pesanan yang tidak memenuhi syarat</h2>
        <ul>
          <li>
            Kesalahan pengisian data akun, seperti User ID, Zone ID, Riot ID, atau Trade URL
            yang keliru, sehingga item terkirim ke akun lain.
          </li>
          <li>Perubahan pikiran setelah item berhasil dikirim dan diterima di akun Anda.</li>
          <li>
            Penawaran trade Steam yang tidak Anda terima hingga melewati batas waktu, atau akun
            Steam yang sedang dalam masa trade hold.
          </li>
          <li>
            Pembatasan atau penangguhan akun oleh penerbit game akibat pelanggaran ketentuan
            penerbit oleh pengguna.
          </li>
          <li>Penurunan nilai pasar item setelah pengiriman berhasil dilakukan.</li>
        </ul>

        <h2>4. Batas waktu pengajuan</h2>
        <p>
          Pengajuan pengembalian dana disampaikan paling lambat{' '}
          <Confirm>
            batas waktu pengajuan. Klien menjawab 12 jam, namun angka ini bertentangan dengan
            waktu tanggap keluhan 36 jam yang juga disanggupi klien: konsumen tidak mungkin
            memperoleh tanggapan sebelum batas pengajuan berakhir. Batas pengajuan harus lebih
            panjang daripada waktu tanggap, dan tetap tunduk pada hak konsumen menurut UU
            8/1999
          </Confirm>{' '}
          sejak tanggal pesanan dibuat. Pengajuan setelah batas tersebut tetap kami tinjau
          secara kasuistis, namun tidak dijamin.
        </p>

        <h2>5. Cara mengajukan pengembalian dana</h2>
        <ol>
          <li>
            Hubungi tim kami melalui WhatsApp di {company.whatsapp} atau email{' '}
            {company.supportEmail}.
          </li>
          <li>
            Sertakan nomor referensi pesanan Anda (format SJ-XXXXXX) beserta bukti pembayaran.
          </li>
          <li>
            Jelaskan kendala yang Anda alami dan lampirkan tangkapan layar apabila tersedia.
            Tim kami memverifikasi dalam waktu maksimal 2x24 jam kerja.
          </li>
          <li>
            Anda akan menerima pemberitahuan hasil verifikasi melalui email. Apabila disetujui,
            status pesanan berubah menjadi Dana Dikembalikan dan dapat Anda pantau pada halaman
            Lacak Pesanan.
          </li>
        </ol>

        <h2>6. Waktu proses pengembalian dana</h2>
        <p>
          Setelah pengajuan disetujui, dana dikembalikan ke metode pembayaran asal Anda. Waktu
          proses mengikuti ketentuan penyedia pembayaran, umumnya 1 sampai 7 hari kerja untuk
          pembayaran melalui QRIS. Pengembalian dana dilakukan dalam nominal penuh sesuai yang
          Anda bayarkan, termasuk biaya layanan, untuk pesanan yang gagal kami proses.
        </p>
        <p>
          <Confirm>
            kebijakan pengembalian biaya layanan pada pembatalan atas permintaan pengguna
          </Confirm>
        </p>

        <h2>7. Pembayaran yang kedaluwarsa</h2>
        <p>
          Apabila kode pembayaran QRIS kedaluwarsa sebelum Anda menyelesaikan pembayaran, tidak
          ada dana yang terpotong dan tidak diperlukan pengajuan pengembalian dana. Anda cukup
          membuat pesanan baru.
        </p>

        <h2>8. Eskalasi</h2>
        <p>
          Apabila Anda tidak puas dengan hasil penanganan, sampaikan keberatan ke{' '}
          {company.email} untuk ditinjau ulang. Anda juga berhak menyampaikan pengaduan kepada
          Badan Penyelesaian Sengketa Konsumen atau Direktorat Jenderal Perlindungan Konsumen
          dan Tertib Niaga, Kementerian Perdagangan Republik Indonesia.
        </p>
      </Prose>
    </PageShell>
  )
}
