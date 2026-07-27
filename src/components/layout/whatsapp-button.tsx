import { company } from '@/data/company'

const WHATSAPP_MESSAGE =
  'Halo SkinJago, saya ingin bertanya tentang produk di website Anda.'

/**
 * Persistent WhatsApp contact button. WhatsApp is the dominant support channel
 * in Indonesia, so it stays reachable on every page and viewport.
 *
 * The pulse halo, periodic nudge, and recurring tooltip are attention cues —
 * all of them are motion-only and disabled under prefers-reduced-motion, and
 * the button itself never moves, so the click target stays stable.
 */
export function WhatsAppButton() {
  const href = `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7">
      {/* Recurring tooltip — fades in and out on a loop to prompt a click. */}
      <span
        aria-hidden
        className="hidden animate-[wa-tip-in_9s_ease-in-out_3s_infinite] items-center gap-2 rounded-full border border-mono-200 bg-surface px-4 py-2.5 text-sm font-medium text-ink opacity-0 shadow-[var(--shadow-elevate)] sm:flex"
      >
        Chat with Whatsapp
        <span className="text-mono-400">&rarr;</span>
      </span>

      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Hubungi kami lewat WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_24px_-4px_rgb(0_0_0/0.3)] transition-[transform,box-shadow] duration-200 hover:scale-110 hover:shadow-[0_10px_32px_-6px_rgb(0_0_0/0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-safe:animate-[wa-nudge_6s_ease-in-out_infinite]"
      >
        {/* Two offset halos so the ripple reads as continuous. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-safe:animate-[wa-pulse_2.6s_ease-out_infinite]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] [animation-delay:1.3s] motion-safe:animate-[wa-pulse_2.6s_ease-out_infinite]"
        />

        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7 text-white transition-transform duration-200 group-hover:scale-110"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>

        {/* Unread-style badge: a familiar "you have a message" affordance. */}
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-surface"
        >
          1
        </span>
      </a>
    </div>
  )
}
