import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Back-to-top control, mirrored opposite the WhatsApp button. Hidden until the
 * user has scrolled roughly a viewport down, so it never competes for
 * attention at the top of a page.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    // Honour reduced-motion: jump instantly rather than animating the scroll.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'group fixed bottom-5 left-5 z-50 flex size-12 items-center justify-center rounded-full border border-mono-300 bg-surface text-ink shadow-[var(--shadow-elevate)] transition-all duration-300 hover:border-ink hover:shadow-[var(--shadow-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:bottom-7 sm:left-7 sm:size-14',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
}
