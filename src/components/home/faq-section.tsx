import { Link } from 'react-router-dom'
import { Section, SectionHeading } from './section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqItems } from '@/data/faq'

export function FaqSection({ limit }: { limit?: number }) {
  const items = limit ? faqItems.slice(0, limit) : faqItems

  return (
    <Section className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Pertanyaan umum"
        title="Hal yang sering ditanyakan"
        description="Belum menemukan jawaban? Tim kami siap membantu lewat WhatsApp."
        action={limit ? { to: '/bantuan', label: 'Lihat semua' } : undefined}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <Accordion type="single" collapsible className="rounded-card border border-mono-200 px-5 sm:px-6">
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <aside className="h-fit rounded-card border border-mono-200 bg-mono-50 p-6">
          <h3 className="text-[15px] font-semibold text-ink">Masih ada pertanyaan?</h3>
          <p className="mt-2 text-sm leading-relaxed text-mono-600">
            Hubungi tim dukungan kami dan sertakan nomor referensi pesanan Anda agar proses
            lebih cepat.
          </p>
          <Link
            to="/bantuan"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-surface transition-colors hover:bg-mono-800"
          >
            Buka pusat bantuan
          </Link>
        </aside>
      </div>
    </Section>
  )
}
