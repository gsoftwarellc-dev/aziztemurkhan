import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/use-auth'

/**
 * Route guard for account-only pages.
 *
 * Waits for the session read to finish before deciding, so a refresh on a
 * guarded route doesn't bounce a signed-in customer to the login screen. The
 * attempted path rides along in location state so login can return them there.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center" aria-busy>
        <p className="text-sm text-mono-500">Memuat…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/masuk" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
