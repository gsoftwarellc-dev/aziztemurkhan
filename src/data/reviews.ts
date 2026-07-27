export interface Review {
  name: string
  role: string
  stars: number
  text: string
}

/**
 * Customer testimonials. Names and roles reflect the Indonesian gaming
 * audience; no photographs are used, so the cards render initials instead.
 *
 * HANDOVER: replace with genuine, attributable customer reviews before launch.
 * Publishing invented testimonials as real ones would be misleading to buyers.
 */
export const reviewsRowOne: Review[] = [
  {
    name: 'Rizky Pratama',
    role: 'Mobile Legends, Jakarta',
    stars: 5,
    text: 'Top up 568 diamond masuk kurang dari 3 menit setelah bayar QRIS. Harganya lebih murah dari beli langsung di game, dan tidak perlu login akun sama sekali.',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Genshin Impact, Bandung',
    stars: 5,
    text: 'Beli Blessing of the Welkin Moon di sini sudah tiga bulan berturut-turut. Selalu lancar, cukup masukkan UID dan pilih server, tidak pernah ada masalah.',
  },
  {
    name: 'Bagus Saputra',
    role: 'Counter-Strike 2, Surabaya',
    stars: 5,
    text: 'Awalnya ragu beli skin mahal lewat website, tapi trade offer Steam-nya resmi dan adminnya jelas. Float item sesuai deskripsi, tidak ada yang disembunyikan.',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Free Fire, Medan',
    stars: 5,
    text: 'Cuma butuh Player ID, langsung diproses otomatis. Konfirmasi masuk ke email dan status pesanan bisa dipantau sendiri di halaman lacak pesanan.',
  },
  {
    name: 'Andi Kurniawan',
    role: 'PUBG Mobile, Makassar',
    stars: 5,
    text: 'UC-nya masuk cepat waktu event Royale Pass. Pembayaran QRIS bisa pakai aplikasi bank apa saja, jadi tidak ribet cari e-wallet tertentu.',
  },
  {
    name: 'Putri Maharani',
    role: 'Valorant, Yogyakarta',
    stars: 5,
    text: 'Sempat salah tulis tagline Riot ID, langsung dibantu admin lewat WhatsApp sebelum pesanan diproses. Respons timnya cepat dan sopan.',
  },
]

export const reviewsRowTwo: Review[] = [
  {
    name: 'Fajar Ramadhan',
    role: 'Mobile Legends, Semarang',
    stars: 5,
    text: 'Starlight member tiap bulan beli di SkinJago. Harga transparan, tidak ada biaya tersembunyi, dan totalnya jelas kelihatan sebelum bayar.',
  },
  {
    name: 'Nabila Zahra',
    role: 'Roblox, Tangerang',
    stars: 5,
    text: 'Robux untuk adik saya diproses sekitar satu jam sesuai estimasi yang tertulis di halaman produk. Jujur soal waktu, tidak menjanjikan yang berlebihan.',
  },
  {
    name: 'Hendra Wijaya',
    role: 'Counter-Strike 2, Denpasar',
    stars: 5,
    text: 'Yang saya suka, tiap produk ditulis metode pengirimannya apa, otomatis atau manual. Jadi tahu harus menunggu berapa lama sejak awal.',
  },
  {
    name: 'Intan Permatasari',
    role: 'Genshin Impact, Palembang',
    stars: 5,
    text: 'Pernah pesanan gagal karena stok habis, dan dana benar-benar dikembalikan penuh tanpa saya harus mengejar-ngejar. Itu yang bikin saya balik lagi.',
  },
  {
    name: 'Yoga Aditya',
    role: 'Free Fire, Malang',
    stars: 5,
    text: 'Website-nya ringan dibuka di HP dan mudah dipakai. Cari produk pakai filter game dan harga sangat membantu waktu budget lagi terbatas.',
  },
  {
    name: 'Kartika Sari',
    role: 'PUBG Mobile, Balikpapan',
    stars: 5,
    text: 'Sudah beberapa kali transaksi dan semuanya aman. Tidak pernah diminta kata sandi akun, jadi saya merasa lebih tenang belanja di sini.',
  },
]

export const reviewsRowThree: Review[] = [
  {
    name: 'Reza Firmansyah',
    role: 'Valorant, Bekasi',
    stars: 5,
    text: 'Bundle senjata premium sampai sesuai estimasi, sekitar satu jam. Adminnya konfirmasi dulu region server saya sebelum diproses, jadi tidak ada salah kirim.',
  },
  {
    name: 'Melati Handayani',
    role: 'Mobile Legends, Bogor',
    stars: 5,
    text: 'Paket emote eksklusif dikirim lewat gifting resmi. Prosesnya dijelaskan dari awal, jadi saya tahu harus menunggu berapa lama tanpa perlu bertanya terus.',
  },
  {
    name: 'Gilang Ramadhan',
    role: 'Honor of Kings, Solo',
    stars: 5,
    text: 'Token masuk cepat dan harganya bersaing. Yang penting buat saya, nota pembelian dikirim ke email jadi ada bukti kalau sewaktu-waktu dibutuhkan.',
  },
  {
    name: 'Ayu Lestari',
    role: 'Free Fire, Pekanbaru',
    stars: 5,
    text: 'Sering beli diamond buat main bareng teman. Sekali checkout bisa beberapa produk sekaligus, jadi tidak perlu bayar berkali-kali.',
  },
  {
    name: 'Dimas Prasetyo',
    role: 'PUBG Mobile, Samarinda',
    stars: 5,
    text: 'Filter harga di katalog sangat membantu waktu cari yang sesuai budget. Stok dan status ketersediaan juga jujur ditulis, tidak asal tersedia semua.',
  },
  {
    name: 'Laras Wulandari',
    role: 'Genshin Impact, Malang',
    stars: 5,
    text: 'Genesis Crystal masuk tanpa kendala dan bonus pengisian pertama tetap dapat. Penjelasan di halaman produk ternyata memang sesuai kenyataan.',
  },
]

/** Two-letter initials used in place of a profile photo. */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
