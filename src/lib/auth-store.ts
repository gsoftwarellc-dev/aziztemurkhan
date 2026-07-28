import type { User } from '@/types'

/**
 * Client-side account store for the frontend phase.
 *
 * ⚠️  SECURITY — READ BEFORE WIRING THE BACKEND
 * This store exists so the account/cart/order flows can be built and reviewed
 * before the Laravel API lands. It is NOT authentication. Everything lives in
 * localStorage, which means:
 *
 *   - Any visitor can read or edit the "account" list from the browser console
 *   - The password digest below is a non-cryptographic hash, chosen only so
 *     plaintext passwords aren't sitting in storage during demos. It is
 *     trivially reversible and must never guard anything real.
 *   - There is no session expiry, no CSRF protection, and no rate limiting.
 *
 * When the backend arrives, delete this file. Registration, login and session
 * handling must move server-side (Laravel Sanctum or equivalent) with password
 * hashing via bcrypt/argon2 and an httpOnly session cookie. The AuthProvider
 * API is shaped to make that swap a change of transport, not of components.
 */

const USERS_KEY = 'skinjago.users.v1'
const SESSION_KEY = 'skinjago.session.v1'

/** Stored account record — the user plus the demo-only password digest. */
interface StoredAccount extends User {
  passwordDigest: string
}

/**
 * Demo-only digest. See the security note above: this is obfuscation so the
 * demo store doesn't hold plaintext, not a security control.
 */
function digest(password: string): string {
  let hash = 0
  for (let index = 0; index < password.length; index += 1) {
    hash = (hash << 5) - hash + password.charCodeAt(index)
    hash |= 0
  }
  return `demo:${hash.toString(36)}:${password.length}`
}

function readAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredAccount[]) : []
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]): void {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(accounts))
}

/** Strip the digest so it never escapes this module into component state. */
const toUser = ({ passwordDigest: _passwordDigest, ...user }: StoredAccount): User => user

const normaliseEmail = (email: string) => email.trim().toLowerCase()

export type AuthResult = { ok: true; user: User } | { ok: false; error: string }

export function register(input: {
  name: string
  email: string
  whatsapp: string
  password: string
}): AuthResult {
  const email = normaliseEmail(input.email)
  const accounts = readAccounts()

  if (accounts.some((account) => normaliseEmail(account.email) === email)) {
    return { ok: false, error: 'Email ini sudah terdaftar. Silakan masuk.' }
  }

  const account: StoredAccount = {
    id: `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name.trim(),
    email,
    whatsapp: input.whatsapp.trim(),
    createdAt: new Date().toISOString(),
    savedGameIds: {},
    passwordDigest: digest(input.password),
  }

  writeAccounts([...accounts, account])
  return { ok: true, user: toUser(account) }
}

export function login(email: string, password: string): AuthResult {
  const target = normaliseEmail(email)
  const account = readAccounts().find(
    (candidate) => normaliseEmail(candidate.email) === target,
  )

  // Same message for unknown-email and wrong-password so the form can't be
  // used to enumerate which addresses have accounts.
  if (!account || account.passwordDigest !== digest(password)) {
    return { ok: false, error: 'Email atau kata sandi salah.' }
  }

  return { ok: true, user: toUser(account) }
}

export function updateUser(userId: string, patch: Partial<User>): User | undefined {
  const accounts = readAccounts()
  const index = accounts.findIndex((account) => account.id === userId)
  if (index < 0) return undefined

  // id/createdAt are identity, not profile data — never let a patch move them.
  const { id: _id, createdAt: _createdAt, ...safePatch } = patch
  accounts[index] = { ...accounts[index], ...safePatch }
  writeAccounts(accounts)
  return toUser(accounts[index])
}

export function readSession(): User | undefined {
  if (typeof window === 'undefined') return undefined
  const userId = window.localStorage.getItem(SESSION_KEY)
  if (!userId) return undefined
  const account = readAccounts().find((candidate) => candidate.id === userId)
  return account ? toUser(account) : undefined
}

export function writeSession(userId: string): void {
  window.localStorage.setItem(SESSION_KEY, userId)
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY)
}
