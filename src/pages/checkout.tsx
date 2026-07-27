import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Info, Lock } from 'lucide-react'
import { ProductThumb } from '@/components/catalog/product-thumb'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { useCart } from '@/lib/use-cart'
import { usePageMeta } from '@/lib/use-page-meta'
import { formatIDR } from '@/lib/utils'
import { SERVICE_FEE } from '@/lib/pricing'
import { paymentMethods } from '@/lib/labels'
import { buildTimeline, generateReference, saveOrder } from '@/lib/orders'
import { cn } from '@/lib/utils'
import type { CheckoutField, Order, PaymentMethodId } from '@/types'

/** Key a field value by cart line so two lines never share the same input. */
const fieldKey = (productId: string, variantId: string | undefined, fieldId: string) =>
  `${productId}::${variantId ?? 'base'}::${fieldId}`

export function CheckoutPage() {
  usePageMeta('Checkout — SkinJago', 'Lengkapi data pesanan dan pilih metode pembayaran.')

  const navigate = useNavigate()
  const { lines, subtotal, clearCart } = useCart()
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [method, setMethod] = useState<PaymentMethodId>('qris')
  const [submitting, setSubmitting] = useState(false)

  const total = subtotal + SERVICE_FEE

  /**
   * Contact fields (email/WhatsApp) are shared across the whole order, while
   * game-specific fields are collected per line.
   */
  const contactFields = useMemo(() => {
    const found = lines
      .flatMap((line) => line.product.checkoutFields)
      .filter((field) => field.id === 'email' || field.id === 'whatsapp')
    return Array.from(new Map(found.map((field) => [field.id, field])).values())
  }, [lines])

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Tidak ada produk untuk di-checkout
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-mono-600">
          Tambahkan produk ke keranjang terlebih dahulu sebelum melanjutkan ke pembayaran.
        </p>
        <Button size="lg" asChild className="mt-8">
          <Link to="/katalog">Lihat katalog</Link>
        </Button>
      </div>
    )
  }

  function setValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {}

    for (const field of contactFields) {
      const key = fieldKey('order', undefined, field.id)
      const value = values[key]?.trim() ?? ''
      const message = validateField(field, value)
      if (message) nextErrors[key] = message
    }

    for (const line of lines) {
      for (const field of line.product.checkoutFields) {
        if (field.id === 'email' || field.id === 'whatsapp') continue
        const key = fieldKey(line.productId, line.variantId, field.id)
        const value = values[key]?.trim() ?? ''
        const message = validateField(field, value)
        if (message) nextErrors[key] = message
      }
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so mobile users aren't left guessing.
      const firstKey = Object.keys(nextErrors)[0]
      document.getElementById(firstKey)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      document.getElementById(firstKey)?.focus({ preventScroll: true })
      return false
    }
    return true
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const createdAt = new Date().toISOString()
    const reference = generateReference()

    const order: Order = {
      id: reference,
      reference,
      createdAt,
      status: 'menunggu-pembayaran',
      paymentStatus: 'pending',
      paymentMethod: method,
      customerEmail: values[fieldKey('order', undefined, 'email')] ?? '',
      customerWhatsapp: values[fieldKey('order', undefined, 'whatsapp')] ?? '',
      lines: lines.map((line) => ({
        productId: line.productId,
        productName: line.product.name,
        gameName: line.product.gameName,
        variantName: line.variant?.name,
        image: line.product.image,
        unitPrice: line.unitPrice,
        quantity: line.quantity,
        fieldValues: Object.fromEntries(
          line.product.checkoutFields
            .filter((field) => field.id !== 'email' && field.id !== 'whatsapp')
            .map((field) => [
              field.label,
              values[fieldKey(line.productId, line.variantId, field.id)] ?? '',
            ]),
        ),
      })),
      subtotal,
      serviceFee: SERVICE_FEE,
      total,
      timeline: buildTimeline('menunggu-pembayaran', createdAt),
    }

    saveOrder(order)
    clearCart()
    navigate(`/pembayaran/${reference}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Checkout</h1>
      <p className="mt-2 max-w-2xl text-[15px] text-mono-600">
        Lengkapi data akun game Anda dengan teliti. Item yang sudah terkirim ke akun yang
        salah tidak dapat kami tarik kembali.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
          <section className="rounded-card border border-mono-200 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ink">Data kontak</h2>
            <p className="mt-1 text-sm text-mono-500">
              Konfirmasi pesanan dan status pengiriman kami kirim ke kontak ini.
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {contactFields.map((field) => (
                <FieldControl
                  key={field.id}
                  field={field}
                  id={fieldKey('order', undefined, field.id)}
                  value={values[fieldKey('order', undefined, field.id)] ?? ''}
                  error={errors[fieldKey('order', undefined, field.id)]}
                  onChange={setValue}
                />
              ))}
            </div>
          </section>

          {lines.map((line) => {
            const gameFields = line.product.checkoutFields.filter(
              (field) => field.id !== 'email' && field.id !== 'whatsapp',
            )
            if (gameFields.length === 0) return null

            return (
              <section
                key={`${line.productId}-${line.variantId ?? 'base'}`}
                className="rounded-card border border-mono-200 p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <ProductThumb
                    monogram={line.product.image}
                    className="size-11 shrink-0 rounded-lg"
                  />
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold leading-snug text-ink">
                      {line.product.name}
                    </h2>
                    <p className="text-sm text-mono-500">
                      {line.product.gameName}
                      {line.variant ? ` — ${line.variant.name}` : ''}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {gameFields.map((field) => (
                    <FieldControl
                      key={field.id}
                      field={field}
                      id={fieldKey(line.productId, line.variantId, field.id)}
                      value={values[fieldKey(line.productId, line.variantId, field.id)] ?? ''}
                      error={errors[fieldKey(line.productId, line.variantId, field.id)]}
                      onChange={setValue}
                    />
                  ))}
                </div>
              </section>
            )
          })}

          <section className="rounded-card border border-mono-200 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-ink">Metode pembayaran</h2>
            <p className="mt-1 text-sm text-mono-500">
              QRIS dapat dibayar dengan aplikasi bank atau e-wallet apa pun.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((option) => {
                const active = option.id === method
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={!option.available}
                    onClick={() => setMethod(option.id)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-start justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all',
                      active
                        ? 'border-ink ring-1 ring-ink'
                        : 'border-mono-200 hover:border-mono-400',
                      !option.available && 'cursor-not-allowed opacity-50 hover:border-mono-200',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink">{option.name}</span>
                      <span className="mt-0.5 block text-xs text-mono-500">
                        {option.description}
                      </span>
                    </span>
                    {option.available && (
                      <span
                        className={cn(
                          'mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border',
                          active ? 'border-ink' : 'border-mono-300',
                        )}
                      >
                        {active && <span className="size-2.5 rounded-full bg-ink" />}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-card border border-mono-200 p-6">
            <h2 className="text-base font-semibold text-ink">Ringkasan pesanan</h2>

            <ul className="mt-5 flex flex-col gap-4">
              {lines.map((line) => (
                <li
                  key={`${line.productId}-${line.variantId ?? 'base'}`}
                  className="flex gap-3"
                >
                  <ProductThumb
                    monogram={line.product.image}
                    className="size-12 shrink-0 rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {line.product.name}
                    </p>
                    <p className="text-xs text-mono-500">
                      {line.variant ? `${line.variant.name} · ` : ''}
                      {line.quantity}x
                    </p>
                  </div>
                  <span className="text-sm font-medium text-ink tabular-nums">
                    {formatIDR(line.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 flex flex-col gap-3 border-t border-mono-200 pt-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Subtotal</dt>
                <dd className="font-medium text-ink tabular-nums">{formatIDR(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-mono-600">Biaya layanan</dt>
                <dd className="font-medium text-ink tabular-nums">{formatIDR(SERVICE_FEE)}</dd>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-mono-200 pt-4">
                <dt className="text-base font-semibold text-ink">Total</dt>
                <dd className="text-lg font-semibold text-ink tabular-nums">
                  {formatIDR(total)}
                </dd>
              </div>
            </dl>

            <Button type="submit" size="lg" disabled={submitting} className="rainbow-ring mt-6 w-full">
              {submitting ? 'Memproses...' : 'Buat pesanan'}
              {!submitting && <ArrowRight className="size-4" />}
            </Button>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mono-500">
              <Lock className="mt-0.5 size-3.5 shrink-0" />
              Pembayaran diproses oleh penyedia jasa pembayaran berizin. SkinJago tidak
              menyimpan data kartu atau kredensial pembayaran Anda.
            </p>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-card border border-mono-200 bg-mono-50 px-4 py-3.5">
            <Info className="mt-0.5 size-4 shrink-0 text-mono-500" />
            <p className="text-xs leading-relaxed text-mono-600">
              Periksa kembali User ID, Zone ID, atau Trade URL Anda sebelum membayar.
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}

function validateField(field: CheckoutField, value: string): string | null {
  if (field.required && !value) return `${field.label} wajib diisi.`
  if (!value) return null

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return 'Format email tidak valid. Contoh: nama@email.com'
  }
  if (field.type === 'tel') {
    const digits = value.replace(/\D/g, '')
    if (digits.length < 9 || digits.length > 15) {
      return 'Nomor WhatsApp tidak valid. Gunakan format 08xx atau +62xx.'
    }
  }
  if (field.type === 'url' && !/^https?:\/\/.+/i.test(value)) {
    return 'URL harus diawali dengan http:// atau https://'
  }
  return null
}

function FieldControl({
  field,
  id,
  value,
  error,
  onChange,
}: {
  field: CheckoutField
  id: string
  value: string
  error?: string
  onChange: (key: string, value: string) => void
}) {
  const describedBy = error ? `${id}-error` : field.helpText ? `${id}-help` : undefined
  const isWide = field.type === 'url'

  return (
    <div className={cn('flex flex-col gap-1.5', isWide && 'sm:col-span-2')}>
      <Label htmlFor={id}>
        {field.label}
        {!field.required && (
          <span className="ml-1.5 font-normal text-mono-400">(opsional)</span>
        )}
      </Label>

      {field.type === 'select' ? (
        <Select
          id={id}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(id, event.target.value)}
        >
          <option value="">Pilih {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={id}
          type={field.type}
          value={value}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(id, event.target.value)}
        />
      )}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : (
        field.helpText && (
          <p id={`${id}-help`} className="text-xs leading-relaxed text-mono-500">
            {field.helpText}
          </p>
        )
      )}
    </div>
  )
}
