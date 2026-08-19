'use client'

import { MatchWeights } from '@/lib/discover'

const AXES: Array<{
  key: keyof MatchWeights
  label: string
  emoji: string
  hint: string
}> = [
  { key: 'location', label: 'Location', emoji: '📍', hint: 'How close someone lives' },
  { key: 'interests', label: 'Interests', emoji: '🎯', hint: 'How many hobbies you share' },
]

function describeWeight(value: number): string {
  if (value <= 0.15) return "Doesn't matter much"
  if (value <= 0.4) return 'A little important'
  if (value <= 0.6) return 'Somewhat important'
  if (value <= 0.85) return 'Important'
  return 'Very important'
}

export default function PrioritySlider({
  value,
  onChange,
}: {
  value: MatchWeights
  onChange: (value: MatchWeights) => void
}) {
  return (
    <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-accent-900 mb-1">
        What matters more when finding people for you?
      </h3>
      <p className="text-base text-accent-800/70 mb-5">
        These are settings on your account — you can change them any time.
      </p>
      <div className="space-y-5">
        {AXES.map(axis => (
          <div key={axis.key}>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={`priority-${axis.key}`}
                className="text-lg font-medium text-accent-800 flex items-center gap-2"
              >
                <span aria-hidden="true">{axis.emoji}</span> {axis.label}
              </label>
              <span className="text-base font-semibold text-accent-700" aria-hidden="true">
                {describeWeight(value[axis.key])}
              </span>
            </div>
            <input
              id={`priority-${axis.key}`}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={value[axis.key]}
              onChange={e => onChange({ ...value, [axis.key]: Number(e.target.value) })}
              className="w-full h-3 accent-accent-600 cursor-pointer"
              aria-valuetext={describeWeight(value[axis.key])}
            />
            <p className="text-sm text-accent-800/60 mt-0.5">{axis.hint}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
