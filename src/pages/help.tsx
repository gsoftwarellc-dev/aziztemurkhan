import { Clock, Mail, MessageCircle } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqItems } from '@/data/faq'
import { company } from '@/data/company'
import { usePageMeta } from '@/lib/use-page-meta'

export function HelpPage() {
  usePageMeta(
    'Pusat Bantuan — SkinJago',
    'Jawaban atas pertanyaan umum seputar pembayaran, pengiriman, dan pengembalian dana di SkinJago.',
  )

  return (
    <PageShell
      title="Pusat bantuan"
      description="Temukan jawaban atas pertanyaan yang paling sering diajukan, atau hubungi tim kami secara langsung."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer noopener"
          className="group rounded-card border border-mono-200 p-5 transition-all hover:border-mono-300 hover:shadow-[var(--shadow-elevate)]"
        >
          <MessageCircle className="size-5 text-ink" />
          <h2 className="mt-3 text-[15px] font-semibold text-ink">WhatsApp</h2>
          <p className="mt-1 text-sm text-mono-600">{company.whatsapp}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-mono-500">
            <Clock className="size-3.5" />
            {company.operationalHours}
          </p>
        </a>

        <a
          href={`mailto:${company.supportEmail}`}
          className="group rounded-card border border-mono-200 p-5 transition-all hover:border-mono-300 hover:shadow-[var(--shadow-elevate)]"
        >
          <Mail className="size-5 text-ink" />
          <h2 className="mt-3 text-[15px] font-semibold text-ink">Email</h2>
          <p className="mt-1 text-sm text-mono-600">{company.supportEmail}</p>
          <p className="mt-2 text-xs text-mono-500">Dibalas maksimal 1x24 jam</p>
        </a>
      </div>

      <h2 className="mt-12 text-lg font-semibold text-ink">Pertanyaan umum</h2>
      <Accordion
        type="single"
        collapsible
        className="mt-4 rounded-card border border-mono-200 px-5 sm:px-6"
      >
        {faqItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 rounded-card border border-mono-200 bg-mono-50 p-5">
        <h3 className="text-sm font-semibold text-ink">Sebelum menghubungi kami</h3>
        <p className="mt-2 text-sm leading-relaxed text-mono-600">
          Siapkan nomor referensi pesanan Anda (format SJ-XXXXXX) dan bukti pembayaran agar
          tim kami dapat menelusuri transaksi Anda lebih cepat.
        </p>
      </div>
    </PageShell>
  )
}
