'use client'

import { DAYS, SLOTS, slotKey } from '@/lib/availability'

export default function AvailabilityPicker({
  selected,
  onToggle,
  adHoc,
  onToggleAdHoc,
}: {
  selected: string[]
  onToggle: (key: string) => void
  adHoc: boolean
  onToggleAdHoc: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggleAdHoc}
        aria-pressed={adHoc}
        className={`w-full flex items-center gap-3 text-left text-lg font-medium px-5 py-4 rounded-xl border-2 transition-colors mb-6 ${
          adHoc
            ? 'bg-primary-600 border-primary-600 text-cream'
            : 'bg-white border-primary-100 text-ink hover:border-primary-300'
        }`}
      >
        <span className="text-2xl" aria-hidden="true">
          🎲
        </span>
        I&rsquo;m happy to chat ad hoc &mdash; no need to schedule, call me whenever
        {adHoc && (
          <span className="ml-auto" aria-hidden="true">
            ✓
          </span>
        )}
      </button>

      <p className="text-base text-ink/60 mb-3">
        Or, tap specific times you&rsquo;re usually free:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1.5 min-w-[420px]">
          <thead>
            <tr>
              <th className="w-16"></th>
              {SLOTS.map(slot => (
                <th key={slot.id} className="text-base font-medium text-ink pb-1">
                  <span aria-hidden="true">{slot.emoji}</span> {slot.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(day => (
              <tr key={day.id}>
                <th scope="row" className="text-base font-medium text-ink text-left pr-2">
                  {day.label}
                </th>
                {SLOTS.map(slot => {
                  const key = slotKey(day.id, slot.id)
                  const isSelected = selected.includes(key)
                  return (
                    <td key={slot.id}>
                      <button
                        type="button"
                        onClick={() => onToggle(key)}
                        aria-pressed={isSelected}
                        aria-label={`${day.label} ${slot.label}`}
                        className={`w-full h-12 rounded-lg border-2 transition-colors ${
                          isSelected
                            ? 'bg-primary-600 border-primary-600'
                            : 'bg-white border-primary-100 hover:border-primary-300'
                        }`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
