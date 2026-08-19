'use client'

function describePriority(value: number): string {
  if (value <= 0.15) return 'Mostly Location'
  if (value <= 0.4) return 'Leaning towards Location'
  if (value <= 0.6) return 'Balanced'
  if (value <= 0.85) return 'Leaning towards Interests'
  return 'Mostly Interests'
}

export default function PrioritySlider({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <label htmlFor="priority-slider" className="block text-xl font-bold text-gray-800 mb-1">
        What matters more when finding people for you?
      </label>
      <p className="text-base text-gray-600 mb-4">
        This is a setting on your account — you can change it any time.
      </p>
      <div className="flex items-center gap-4">
        <span className="text-lg font-medium text-gray-700 w-32 shrink-0">📍 Location</span>
        <input
          id="priority-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-3 accent-primary-600 cursor-pointer"
          aria-valuetext={describePriority(value)}
        />
        <span className="text-lg font-medium text-gray-700 w-40 shrink-0 text-right">
          Interests 🎯
        </span>
      </div>
      <p className="text-center text-lg font-semibold text-primary-700 mt-3" aria-live="polite">
        {describePriority(value)}
      </p>
    </div>
  )
}
