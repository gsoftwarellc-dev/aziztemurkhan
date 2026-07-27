export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Berapa lama pesanan saya diproses?',
    answer:
      'Waktu proses berbeda untuk setiap produk dan selalu tercantum di halaman produk. Produk dengan pengiriman otomatis umumnya selesai dalam 1 sampai 20 menit setelah pembayaran dikonfirmasi. Produk yang diverifikasi manual, seperti skin gifting atau Steam trade, membutuhkan waktu lebih lama sesuai estimasi yang tertera.',
  },
  {
    question: 'Apakah saya perlu memberikan kata sandi akun game?',
    answer:
      'Tidak. Kami tidak pernah meminta kata sandi akun Anda. Data yang dibutuhkan hanya berupa pengenal publik seperti User ID, Zone ID, Player ID, Riot ID, atau Trade URL Steam sesuai jenis produk yang dibeli. Jika ada pihak yang mengatasnamakan SkinJago dan meminta kata sandi, mohon segera laporkan kepada kami.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Saat ini QRIS menjadi metode pembayaran utama dan dapat dibayar memakai aplikasi bank atau e-wallet apa pun yang mendukung standar QRIS di Indonesia. Metode lain seperti DANA, GoPay, OVO, transfer bank, dan kartu debit atau kredit sedang kami siapkan dan akan diaktifkan setelah proses integrasi selesai.',
  },
  {
    question: 'Bagaimana jika pembayaran saya kedaluwarsa?',
    answer:
      'Kode QRIS memiliki masa berlaku terbatas. Jika waktu habis sebelum pembayaran selesai, pesanan otomatis berstatus kedaluwarsa dan tidak ada dana yang terpotong. Anda dapat membuat pesanan baru kapan saja melalui keranjang belanja.',
  },
  {
    question: 'Apa yang terjadi jika item gagal dikirim?',
    answer:
      'Jika item gagal kami kirim karena stok habis, data akun tidak valid, atau kendala teknis, pesanan akan berstatus gagal dan dana Anda dikembalikan penuh. Proses pengembalian dana mengikuti waktu proses penyedia pembayaran, umumnya 1 sampai 7 hari kerja tergantung metode yang digunakan.',
  },
  {
    question: 'Apakah data akun saya salah bisa diperbaiki?',
    answer:
      'Selama pesanan belum diproses, hubungi kami lewat WhatsApp dengan menyertakan nomor referensi pesanan agar data dapat kami perbaiki. Jika pesanan sudah terkirim ke akun yang salah karena data yang Anda masukkan keliru, item tidak dapat ditarik kembali, sehingga mohon periksa kembali data sebelum membayar.',
  },
  {
    question: 'Apakah pembelian di SkinJago aman untuk akun saya?',
    answer:
      'Kami memakai jalur pengiriman resmi seperti pengisian melalui ID publik, gifting dalam game, dan Steam trade offer. Metode ini tidak melanggar ketentuan penerbit game dan tidak memerlukan akses langsung ke akun Anda. Untuk setiap produk, metode pengiriman dijelaskan secara terbuka di halaman produk.',
  },
  {
    question: 'Apakah saya bisa membatalkan pesanan?',
    answer:
      'Pesanan yang masih berstatus menunggu pembayaran dapat dibatalkan begitu saja dengan membiarkan kode pembayaran kedaluwarsa. Untuk pesanan yang sudah dibayar tetapi belum diproses, hubungi tim kami secepatnya agar pembatalan dan pengembalian dana dapat kami bantu proses.',
  },
]
