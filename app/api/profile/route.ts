import { NextRequest, NextResponse } from 'next/server'
import { fetchProfile, saveProfileRemote, isAirtableConfigured, AirtableProfile } from '@/lib/airtable'

export async function GET(request: NextRequest) {
  if (!isAirtableConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 })
  }

  const name = request.nextUrl.searchParams.get('name') ?? ''
  const pin = request.nextUrl.searchParams.get('pin') ?? ''
  if (!name || !pin) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 })
  }

  try {
    const profile = await fetchProfile(name, pin)
    if (!profile) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'airtable_error' }, { status: 502 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAirtableConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 })
  }

  const body = (await request.json()) as AirtableProfile
  if (!body.name || !body.pin || body.pin.length !== 4) {
    return NextResponse.json({ error: 'invalid_profile' }, { status: 400 })
  }

  try {
    await saveProfileRemote(body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'airtable_error' }, { status: 502 })
  }
}
