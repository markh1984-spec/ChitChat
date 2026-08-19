export interface AirtableProfile {
  name: string
  pin: string
  town: string
  age: number
  selectedInterests: string[]
  priority: number
  icebreakerAnswerId: string | null
}

function getConfig() {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME || 'Profiles'
  if (!token || !baseId) return null
  return {
    token,
    url: `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
  }
}

export function isAirtableConfigured(): boolean {
  return getConfig() !== null
}

function escapeForFormula(value: string): string {
  return value.replace(/'/g, "\\'")
}

function toFields(profile: AirtableProfile) {
  return {
    Name: profile.name,
    Pin: profile.pin,
    Town: profile.town,
    Age: profile.age,
    Interests: profile.selectedInterests.join(','),
    Weights: String(profile.priority),
    IcebreakerAnswerId: profile.icebreakerAnswerId ?? '',
  }
}

function fromFields(record: { fields: Record<string, unknown> }): AirtableProfile {
  const f = record.fields
  const parsedPriority = typeof f.Weights === 'string' ? Number(f.Weights) : NaN
  const priority = Number.isFinite(parsedPriority) ? parsedPriority : 0.5
  return {
    name: typeof f.Name === 'string' ? f.Name : '',
    pin: typeof f.Pin === 'string' ? f.Pin : '',
    town: typeof f.Town === 'string' ? f.Town : '',
    age: typeof f.Age === 'number' ? f.Age : 0,
    selectedInterests:
      typeof f.Interests === 'string' && f.Interests.length > 0 ? f.Interests.split(',') : [],
    priority,
    icebreakerAnswerId: typeof f.IcebreakerAnswerId === 'string' && f.IcebreakerAnswerId
      ? f.IcebreakerAnswerId
      : null,
  }
}

async function findRecordId(name: string, pin: string): Promise<string | null> {
  const config = getConfig()
  if (!config) return null
  const formula = `AND({Name}='${escapeForFormula(name)}', {Pin}='${escapeForFormula(pin)}')`
  const url = `${config.url}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${config.token}` } })
  if (!res.ok) throw new Error(`Airtable lookup failed: ${res.status}`)
  const data = await res.json()
  return data.records?.[0]?.id ?? null
}

export async function fetchProfile(name: string, pin: string): Promise<AirtableProfile | null> {
  const config = getConfig()
  if (!config) throw new Error('Airtable is not configured')
  const formula = `AND({Name}='${escapeForFormula(name)}', {Pin}='${escapeForFormula(pin)}')`
  const url = `${config.url}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${config.token}` } })
  if (!res.ok) throw new Error(`Airtable lookup failed: ${res.status}`)
  const data = await res.json()
  const record = data.records?.[0]
  return record ? fromFields(record) : null
}

export async function saveProfileRemote(profile: AirtableProfile): Promise<void> {
  const config = getConfig()
  if (!config) throw new Error('Airtable is not configured')
  const existingId = await findRecordId(profile.name, profile.pin)
  const body = JSON.stringify({ fields: toFields(profile) })

  const res = await fetch(existingId ? `${config.url}/${existingId}` : config.url, {
    method: existingId ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body,
  })
  if (!res.ok) throw new Error(`Airtable save failed: ${res.status}`)
}
