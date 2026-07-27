import type { CheckoutField } from '@/types'

/**
 * Reusable checkout field presets. Products reference these so the admin panel
 * can later assign field sets per product without duplicating definitions.
 */

export const contactFields: CheckoutField[] = [
  {
    id: 'email',
    label: 'Alamat email',
    type: 'email',
    placeholder: 'nama@email.com',
    helpText: 'Konfirmasi pesanan dan bukti pembelian dikirim ke email ini.',
    required: true,
  },
  {
    id: 'whatsapp',
    label: 'Nomor WhatsApp',
    type: 'tel',
    placeholder: '0812 3456 7890',
    helpText: 'Kami hubungi lewat WhatsApp jika ada kendala pada pesanan.',
    required: true,
  },
]

export const mobileLegendsFields: CheckoutField[] = [
  {
    id: 'userId',
    label: 'User ID',
    type: 'text',
    placeholder: 'Contoh: 123456789',
    helpText: 'Buka menu profil di dalam game untuk melihat User ID Anda.',
    required: true,
  },
  {
    id: 'zoneId',
    label: 'Zone ID',
    type: 'text',
    placeholder: 'Contoh: 2201',
    helpText: 'Angka di dalam tanda kurung setelah User ID.',
    required: true,
  },
]

export const freeFireFields: CheckoutField[] = [
  {
    id: 'playerId',
    label: 'Player ID',
    type: 'text',
    placeholder: 'Contoh: 987654321',
    helpText: 'Player ID tertera di halaman profil akun Free Fire Anda.',
    required: true,
  },
]

export const pubgFields: CheckoutField[] = [
  {
    id: 'playerId',
    label: 'Character ID',
    type: 'text',
    placeholder: 'Contoh: 5123456789',
    helpText: 'Salin Character ID dari menu profil PUBG Mobile.',
    required: true,
  },
]

export const steamTradeFields: CheckoutField[] = [
  {
    id: 'tradeUrl',
    label: 'Trade URL Steam',
    type: 'url',
    placeholder: 'https://steamcommunity.com/tradeoffer/new/?partner=...',
    helpText: 'Pastikan inventaris Steam Anda publik agar penawaran dapat dikirim.',
    required: true,
  },
  {
    id: 'steamName',
    label: 'Nama akun Steam',
    type: 'text',
    placeholder: 'Nama tampilan Steam Anda',
    required: true,
  },
]

export const riotFields: CheckoutField[] = [
  {
    id: 'riotId',
    label: 'Riot ID',
    type: 'text',
    placeholder: 'Contoh: NamaPemain#SEA1',
    helpText: 'Tulis lengkap dengan tagline setelah tanda pagar.',
    required: true,
  },
  {
    id: 'region',
    label: 'Region server',
    type: 'select',
    required: true,
    options: [
      { value: 'sea', label: 'Asia Tenggara (SEA)' },
      { value: 'ap', label: 'Asia Pasifik (AP)' },
      { value: 'na', label: 'Amerika Utara (NA)' },
    ],
  },
]

export const genshinFields: CheckoutField[] = [
  {
    id: 'uid',
    label: 'UID Genshin',
    type: 'text',
    placeholder: 'Contoh: 812345678',
    helpText: 'UID tampil di pojok kanan bawah layar dalam game.',
    required: true,
  },
  {
    id: 'server',
    label: 'Server',
    type: 'select',
    required: true,
    options: [
      { value: 'asia', label: 'Asia' },
      { value: 'america', label: 'America' },
      { value: 'europe', label: 'Europe' },
      { value: 'twhkmo', label: 'TW, HK, MO' },
    ],
  },
]

export const accountLoginFields: CheckoutField[] = [
  {
    id: 'username',
    label: 'Username akun',
    type: 'text',
    placeholder: 'Username akun game Anda',
    helpText: 'Kami tidak pernah meminta kata sandi Anda.',
    required: true,
  },
  {
    id: 'server',
    label: 'Server atau region',
    type: 'text',
    placeholder: 'Contoh: Asia',
    required: true,
  },
]
