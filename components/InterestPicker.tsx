'use client'

import { INTERESTS, INTEREST_CATEGORIES } from '@/lib/interests'

export default function InterestPicker({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div className="space-y-8">
      {INTEREST_CATEGORIES.map(category => {
        const items = INTERESTS.filter(i => i.category === category)
        if (items.length === 0) return null
        return (
          <div key={category}>
            <h3 className="text-lg font-bold text-primary-700 mb-3">{category}</h3>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              role="group"
              aria-label={category}
            >
              {items.map(interest => {
                const isSelected = selected.includes(interest.id)
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => onToggle(interest.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-2 text-lg font-medium px-4 py-4 rounded-xl border-2 transition-colors text-left ${
                      isSelected
                        ? 'bg-primary-600 border-primary-600 text-cream shadow-sm'
                        : 'bg-white border-primary-100 text-ink hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {interest.emoji}
                    </span>
                    {interest.label}
                    {isSelected && (
                      <span className="ml-auto" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
