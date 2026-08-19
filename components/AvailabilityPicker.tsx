'use client'

import { DAYS, SLOTS, slotKey } from '@/lib/availability'

export default function AvailabilityPicker({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (key: string) => void
}) {
  return (
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
  )
}
