import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlertCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useAuth } from '@/lib/use-auth'
import { usePageMeta } from '@/lib/use-page-meta'
import { cn } from '@/lib/utils'

/** Where to send the customer after a successful login/registration. */
function useRedirectTarget(): string {
  const location = useLocation()
  const state = location.state as { from?: string } | null
  return state?.from ?? '/akun'
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1.5 text-xs text-danger">
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  )
}

/**
 * Shared shell for both forms.
 *
 * `width` is per-form: login has two fields and reads better narrow, while
 * registration has five and gets more room so it doesn't scroll on a laptop.
 */
function AuthShell({
  title,
  subtitle,
  children,
  footer,
  width = 'narrow',
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
  width?: 'narrow' | 'wide'
}) {
  return (
    <div
      className={cn(
        'mx-auto px-4 py-12 sm:px-6 lg:py-16',
        width === 'wide' ? 'max-w-2xl' : 'max-w-md',
      )}
    >
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-mono-600">{subtitle}</p>

      <div className="mt-8 rounded-card border border-mono-200 p-6 sm:p-8">{children}</div>

      <p className="mt-6 text-center text-sm text-mono-600">{footer}</p>
    </div>
  )
}

export function LoginPage() {
  usePageMeta('Masuk — SkinJago', 'Masuk ke akun SkinJago Anda untuk melihat riwayat pesanan.')

  const navigate = useNavigate()
  const redirectTo = useRedirectTarget()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(undefined)

    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      setSubmitting(false)
      return
    }
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthShell
      title="Masuk"
      subtitle="Masuk untuk melanjutkan checkout dan memantau riwayat pesanan Anda."
      footer={
        <>
          Belum punya akun?{' '}
          <Link
            to="/daftar"
            state={{ from: redirectTo }}
            className="font-medium text-ink underline underline-offset-4"
          >
            Daftar sekarang
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nama@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-password">Kata sandi</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Masukkan kata sandi"
          />
        </div>

        <Button type="submit" size="lg" className="mt-2" disabled={submitting}>
          {submitting ? 'Memproses…' : 'Masuk'}
        </Button>
      </form>
    </AuthShell>
  )
}

export function RegisterPage() {
  usePageMeta('Daftar — SkinJago', 'Buat akun SkinJago untuk checkout dan melacak pesanan.')

  const navigate = useNavigate()
  const redirectTo = useRedirectTarget()
  const { register } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  function setField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function validate(): boolean {
    const next: Record<string, string> = {}

    if (form.name.trim().length < 2) next.name = 'Masukkan nama lengkap Anda.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Format email tidak valid.'
    }
    // Indonesian mobile numbers: 08xx or +628xx, 9–15 digits total.
    if (!/^(\+?62|0)8[1-9][0-9]{6,11}$/.test(form.whatsapp.replace(/[\s-]/g, ''))) {
      next.whatsapp = 'Masukkan nomor WhatsApp Indonesia yang valid, contoh: 081234567890.'
    }
    if (form.password.length < 8) next.password = 'Kata sandi minimal 8 karakter.'
    if (form.password !== form.confirm) next.confirm = 'Konfirmasi kata sandi tidak cocok.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const result = register({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      password: form.password,
    })

    if (!result.ok) {
      setErrors({ email: result.error })
      setSubmitting(false)
      return
    }
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthShell
      width="wide"
      title="Daftar"
      subtitle="Buat akun untuk menyimpan data game, melihat riwayat pesanan, dan melacak pengiriman."
      footer={
        <>
          Sudah punya akun?{' '}
          <Link
            to="/masuk"
            state={{ from: redirectTo }}
            className="font-medium text-ink underline underline-offset-4"
          >
            Masuk di sini
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Paired fields on wider screens; single column on mobile. */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-name">Nama lengkap</Label>
            <Input
              id="reg-name"
              autoComplete="name"
              value={form.name}
              aria-invalid={Boolean(errors.name)}
              onChange={(event) => setField('name', event.target.value)}
              placeholder="Nama Anda"
            />
            <FieldError message={errors.name} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-whatsapp">Nomor WhatsApp</Label>
            <Input
              id="reg-whatsapp"
              type="tel"
              autoComplete="tel"
              value={form.whatsapp}
              aria-invalid={Boolean(errors.whatsapp)}
              onChange={(event) => setField('whatsapp', event.target.value)}
              placeholder="081234567890"
            />
            <FieldError message={errors.whatsapp} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            type="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => setField('email', event.target.value)}
            placeholder="nama@email.com"
          />
          <FieldError message={errors.email} />
          <p className="text-xs text-mono-500">
            Konfirmasi pesanan dan item digital dikirim ke email ini.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-password">Kata sandi</Label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              aria-invalid={Boolean(errors.password)}
              onChange={(event) => setField('password', event.target.value)}
              placeholder="Minimal 8 karakter"
            />
            <FieldError message={errors.password} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reg-confirm">Ulangi kata sandi</Label>
            <Input
              id="reg-confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              aria-invalid={Boolean(errors.confirm)}
              onChange={(event) => setField('confirm', event.target.value)}
              placeholder="Ulangi kata sandi"
            />
            <FieldError message={errors.confirm} />
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-mono-50 p-3 text-xs leading-relaxed text-mono-600">
          <Lock className="mt-0.5 size-3.5 shrink-0" />
          <p>
            Dengan mendaftar, Anda menyetujui{' '}
            <Link to="/syarat-ketentuan" className="underline underline-offset-2">
              Syarat &amp; Ketentuan
            </Link>{' '}
            dan{' '}
            <Link to="/kebijakan-privasi" className="underline underline-offset-2">
              Kebijakan Privasi
            </Link>{' '}
            SkinJago.
          </p>
        </div>

        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? 'Memproses…' : 'Buat akun'}
        </Button>
      </form>
    </AuthShell>
  )
}
