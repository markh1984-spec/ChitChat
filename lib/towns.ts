// A broader set of fictional towns for the location typeahead demo.
// The four towns used by mock neighbour profiles (Riverside, Oakfield,
// Millbrook, Elmswood) are included so "miles away" framing still makes sense.
export const TOWNS: string[] = [
  'Riverside',
  'Oakfield',
  'Millbrook',
  'Elmswood',
  'Ashford',
  'Bridgeton',
  'Castlebridge',
  'Denby',
  'Eastcombe',
  'Fairhaven',
  'Greenmoor',
  'Hartley',
  'Ingleton',
  'Kirkstone',
  'Larkfield',
  'Meadowbank',
  'Northwold',
  'Orchard Hill',
  'Pemberton',
  'Queensferry',
  'Redcliffe',
  'Silverdale',
  'Thornbury',
  'Uppingham',
  'Vale End',
  'Westbrook',
  'Yarrow',
]

export function searchTowns(query: string): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return TOWNS
  return TOWNS.filter(town => town.toLowerCase().includes(q))
}
