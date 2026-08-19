export interface LastLogin {
  name: string
  pin: string
}

const STORAGE_KEY = 'chitchat-last-login'

/** Remembers only name+PIN locally, as a convenience to pre-fill the "returning" form.
 *  The actual profile data lives in Airtable, looked up by name+PIN. */
export function loadLastLogin(): LastLogin | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.name !== 'string' || typeof parsed.pin !== 'string') return null
    return parsed as LastLogin
  } catch {
    return null
  }
}

export function saveLastLogin(login: LastLogin): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(login))
}

export function clearLastLogin(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
