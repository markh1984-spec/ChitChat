import { NextRequest, NextResponse } from 'next/server'

// Real-world settlements only (cities/towns/villages) — explicitly excludes
// postcodes, streets, and buildings by filtering to OSM "place" features.
const SETTLEMENT_TYPES = new Set([
  'city',
  'town',
  'village',
  'hamlet',
  'municipality',
  'suburb',
  'county',
])

interface NominatimResult {
  category: string
  type: string
  name?: string
  display_name: string
  address?: Record<string, string>
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') ?? '').trim()
  if (q.length < 2) {
    return NextResponse.json({ towns: [] })
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&featuretype=settlement&q=${encodeURIComponent(q)}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'ChitChat-Demo-Prototype/1.0 (student coursework project)',
      },
    })
    if (!res.ok) {
      return NextResponse.json({ towns: [] }, { status: 502 })
    }
    const results = (await res.json()) as NominatimResult[]

    const towns = results
      .filter(r => r.category === 'place' && SETTLEMENT_TYPES.has(r.type))
      .map(r => {
        const addr = r.address ?? {}
        const name =
          addr.city || addr.town || addr.village || addr.hamlet || r.name || r.display_name.split(',')[0]
        const country = addr.country
        return country ? `${name}, ${country}` : name
      })

    return NextResponse.json({ towns: Array.from(new Set(towns)) })
  } catch {
    return NextResponse.json({ towns: [] }, { status: 502 })
  }
}
