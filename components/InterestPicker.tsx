'use client'

import { INTERESTS } from '@/lib/interests'

export default function InterestPicker({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label="Choose your interests">
      {INTERESTS.map(interest => {
        const isSelected = selected.includes(interest.id)
        return (
          <button
            key={interest.id}
            type="button"
            onClick={() => onToggle(interest.id)}
            aria-pressed={isSelected}
            className={`flex items-center gap-2 text-lg font-medium px-4 py-4 rounded-xl border-2 transition-colors text-left ${
              isSelected
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white border-gray-200 text-gray-800 hover:border-primary-300'
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {interest.emoji}
            </span>
            {interest.label}
            {isSelected && <span className="ml-auto" aria-hidden="true">✓</span>}
          </button>
        )
      })}
    </div>
  )
}
