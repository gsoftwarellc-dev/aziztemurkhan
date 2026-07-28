import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { User } from '@/types'
import {
  clearSession,
  login as loginUser,
  readSession,
  register as registerUser,
  updateUser,
  writeSession,
  type AuthResult,
} from '@/lib/auth-store'

export interface AuthContextValue {
  user: User | undefined
  isAuthenticated: boolean
  /** False until the stored session has been read, so guards don't flash. */
  ready: boolean
  register: (input: {
    name: string
    email: string
    whatsapp: string
    password: string
  }) => AuthResult
  login: (email: string, password: string) => AuthResult
  logout: () => void
  /** Persist checkout field values so repeat purchases can prefill them. */
  rememberGameIds: (values: Record<string, string>) => void
  updateProfile: (patch: Pick<Partial<User>, 'name' | 'whatsapp'>) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>()
  const [ready, setReady] = useState(false)

  // Restore the session on mount rather than during render, so the first paint
  // is consistent between the initial load and a refresh.
  useEffect(() => {
    setUser(readSession())
    setReady(true)
  }, [])

  const register = useCallback((input: Parameters<AuthContextValue['register']>[0]) => {
    const result = registerUser(input)
    if (result.ok) {
      writeSession(result.user.id)
      setUser(result.user)
    }
    return result
  }, [])

  const login = useCallback((email: string, password: string) => {
    const result = loginUser(email, password)
    if (result.ok) {
      writeSession(result.user.id)
      setUser(result.user)
    }
    return result
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(undefined)
  }, [])

  const rememberGameIds = useCallback((values: Record<string, string>) => {
    setUser((current) => {
      if (!current) return current
      const merged = { ...current.savedGameIds, ...values }
      return updateUser(current.id, { savedGameIds: merged }) ?? current
    })
  }, [])

  const updateProfile = useCallback(
    (patch: Pick<Partial<User>, 'name' | 'whatsapp'>) => {
      setUser((current) => (current ? updateUser(current.id, patch) ?? current : current))
    },
    [],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      ready,
      register,
      login,
      logout,
      rememberGameIds,
      updateProfile,
    }),
    [user, ready, register, login, logout, rememberGameIds, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
