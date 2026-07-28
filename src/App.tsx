import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ScrollToTopButton } from '@/components/layout/scroll-to-top-button'
import { CartProvider } from '@/context/cart-context'
import { AuthProvider } from '@/context/auth-context'
import { RequireAuth } from '@/components/layout/require-auth'
import { LoginPage, RegisterPage } from '@/pages/auth'
import { AccountPage } from '@/pages/account'
import { HomePage } from '@/pages/home'
import { CatalogPage } from '@/pages/catalog'
import { GamesPage } from '@/pages/games'
import { GameDetailPage } from '@/pages/game-detail'
import { ProductDetailPage } from '@/pages/product-detail'
import { CartPage } from '@/pages/cart'
import { CheckoutPage } from '@/pages/checkout'
import { PaymentPage } from '@/pages/payment'
import { TrackOrderPage } from '@/pages/track-order'
import { HowItWorksPage } from '@/pages/how-it-works'
import { HelpPage } from '@/pages/help'
import { AboutPage } from '@/pages/about'
import { PrivacyPage, RefundPage, TermsPage } from '@/pages/legal'
import { NotFoundPage } from '@/pages/not-found'

/** Keep <html lang> in sync so assistive tech announces the right language. */
function HtmlLang() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'id'
  }, [i18n.resolvedLanguage])
  return null
}

/** Reset scroll on navigation — react-router preserves position by default. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HtmlLang />
        <ScrollToTop />
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/katalog" element={<CatalogPage />} />
              <Route path="/game" element={<GamesPage />} />
              <Route path="/game/:slug" element={<GameDetailPage />} />
              <Route path="/produk/:slug" element={<ProductDetailPage />} />
              <Route path="/keranjang" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pembayaran/:reference" element={<PaymentPage />} />
              <Route path="/lacak-pesanan" element={<TrackOrderPage />} />
              <Route path="/masuk" element={<LoginPage />} />
              <Route path="/daftar" element={<RegisterPage />} />
              <Route
                path="/akun"
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />
              <Route path="/cara-kerja" element={<HowItWorksPage />} />
              <Route path="/bantuan" element={<HelpPage />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              <Route path="/syarat-ketentuan" element={<TermsPage />} />
              <Route path="/kebijakan-privasi" element={<PrivacyPage />} />
              <Route path="/kebijakan-pengembalian" element={<RefundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTopButton />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
