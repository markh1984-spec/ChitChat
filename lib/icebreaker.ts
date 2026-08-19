export interface IcebreakerOption {
  id: string
  label: string
  emoji: string
  relatedInterestIds: string[]
}

export const ICEBREAKER_QUESTION = "What's your idea of a perfect Saturday?"

export const ICEBREAKER_OPTIONS: IcebreakerOption[] = [
  {
    id: 'garden',
    label: 'Pottering in the garden, or just outside with the birds',
    emoji: '🌷',
    relatedInterestIds: ['gardening', 'birdwatching'],
  },
  {
    id: 'book',
    label: 'Curled up with a good book',
    emoji: '📚',
    relatedInterestIds: ['reading', 'crafts'],
  },
  {
    id: 'out',
    label: 'Out and about — a walk, a day trip, somewhere new',
    emoji: '🚗',
    relatedInterestIds: ['walking', 'travel'],
  },
  {
    id: 'table',
    label: 'Round a table — cards, cooking, catching up with friends',
    emoji: '🃏',
    relatedInterestIds: ['cards', 'cooking'],
  },
]

export function getIcebreakerOption(id: string): IcebreakerOption | undefined {
  return ICEBREAKER_OPTIONS.find(o => o.id === id)
}
