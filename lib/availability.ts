export interface Day {
  id: string
  label: string
}

export interface TimeSlot {
  id: string
  label: string
  emoji: string
}

export const DAYS: Day[] = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
]

export const SLOTS: TimeSlot[] = [
  { id: 'morning', label: 'Morning', emoji: '☀️' },
  { id: 'afternoon', label: 'Afternoon', emoji: '🌤️' },
  { id: 'evening', label: 'Evening', emoji: '🌙' },
]

export function slotKey(dayId: string, slotId: string): string {
  return `${dayId}-${slotId}`
}

export function getDay(id: string): Day | undefined {
  return DAYS.find(d => d.id === id)
}

export function getSlot(id: string): TimeSlot | undefined {
  return SLOTS.find(s => s.id === id)
}

/** Formats a list of "day-slot" keys into short readable labels, e.g. "Mon ☀️ Morning". */
export function describeAvailability(keys: string[]): string[] {
  return keys
    .map(key => {
      const [dayId, slotId] = key.split('-')
      const day = getDay(dayId)
      const slot = getSlot(slotId)
      if (!day || !slot) return null
      return `${day.label} ${slot.emoji} ${slot.label}`
    })
    .filter((s): s is string => s !== null)
}
