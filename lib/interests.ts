export interface Interest {
  id: string
  label: string
  emoji: string
}

export const INTERESTS: Interest[] = [
  { id: 'gardening', label: 'Gardening', emoji: '🌷' },
  { id: 'walking', label: 'Walking Groups', emoji: '🚶' },
  { id: 'reading', label: 'Book Club', emoji: '📚' },
  { id: 'cooking', label: 'Cooking', emoji: '🍳' },
  { id: 'birdwatching', label: 'Birdwatching', emoji: '🐦' },
  { id: 'music', label: 'Live Music', emoji: '🎵' },
  { id: 'crafts', label: 'Arts & Crafts', emoji: '🎨' },
  { id: 'history', label: 'Local History', emoji: '🏛️' },
  { id: 'cards', label: 'Cards & Board Games', emoji: '🃏' },
  { id: 'dancing', label: 'Dancing', emoji: '💃' },
  { id: 'chess', label: 'Chess', emoji: '♟️' },
  { id: 'swimming', label: 'Swimming', emoji: '🏊' },
  { id: 'volunteering', label: 'Volunteering', emoji: '🤝' },
  { id: 'grandkids', label: 'Grandparenting', emoji: '👨‍👩‍👧' },
  { id: 'tech', label: 'Learning Tech', emoji: '💻' },
  { id: 'travel', label: 'Day Trips & Travel', emoji: '🚗' },
]

export function getInterest(id: string): Interest | undefined {
  return INTERESTS.find(i => i.id === id)
}
