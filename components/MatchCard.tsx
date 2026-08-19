import { DiscoverResult, scoreColor } from '@/lib/discover'
import { getInterest } from '@/lib/interests'
import { describeAvailability } from '@/lib/availability'

export default function MatchCard({ result }: { result: DiscoverResult }) {
  const { user, combinedScore, sharedInterestIds } = result
  const { bg, text } = scoreColor(combinedScore)
  const availabilityLabels = describeAvailability(user.availability)

  return (
    <div className="bg-white border-2 border-primary-100 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-primary-200 transition-shadow">
      <img
        src={user.avatar}
        alt=""
        className="w-14 h-14 shrink-0 rounded-full object-cover"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-semibold text-ink truncate">
          {user.name}, {user.age}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-sm text-ink/50 truncate">
            {user.town} &middot; {user.distanceMiles.toFixed(1)} mi
          </p>
          <span
            className="text-sm font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0"
            style={{ backgroundColor: bg, color: text }}
          >
            {Math.round(combinedScore)}%
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {sharedInterestIds.length > 0 && (
            <div className="relative inline-block group">
              <button
                type="button"
                className="text-xs font-medium bg-accent-50 text-accent-800 px-2 py-0.5 rounded-full cursor-default"
              >
                🎯 {sharedInterestIds.length} shared interest{sharedInterestIds.length > 1 ? 's' : ''}
              </button>
              <div
                role="tooltip"
                className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute z-30 bottom-full left-0 mb-2 w-max max-w-[220px] bg-ink text-cream text-xs rounded-lg p-2 shadow-lg flex flex-wrap gap-1"
              >
                {sharedInterestIds.map(id => {
                  const interest = getInterest(id)
                  if (!interest) return null
                  return (
                    <span
                      key={id}
                      className="bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap"
                    >
                      {interest.emoji} {interest.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {availabilityLabels.length > 0 && (
            <div className="relative inline-block group">
              <button
                type="button"
                className="text-xs font-medium bg-primary-50 text-primary-800 px-2 py-0.5 rounded-full cursor-default"
              >
                📅 Available to call
              </button>
              <div
                role="tooltip"
                className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute z-30 bottom-full left-0 mb-2 w-max max-w-[220px] bg-ink text-cream text-xs rounded-lg p-2 shadow-lg flex flex-wrap gap-1"
              >
                {availabilityLabels.map(label => (
                  <span key={label} className="bg-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
