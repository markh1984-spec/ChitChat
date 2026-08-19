import { DiscoverResult, scoreColor } from '@/lib/discover'
import { getInterest } from '@/lib/interests'

const MAX_VISIBLE_INTERESTS = 2

export default function MatchCard({ result }: { result: DiscoverResult }) {
  const { user, combinedScore, sharedInterestIds } = result
  const { bg, text } = scoreColor(combinedScore)
  const visibleInterests = sharedInterestIds.slice(0, MAX_VISIBLE_INTERESTS)
  const extraCount = sharedInterestIds.length - visibleInterests.length

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

        {visibleInterests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {visibleInterests.map(id => {
              const interest = getInterest(id)
              if (!interest) return null
              return (
                <span
                  key={id}
                  className="text-xs bg-accent-50 text-accent-800 px-2 py-0.5 rounded-full"
                >
                  {interest.emoji} {interest.label}
                </span>
              )
            })}
            {extraCount > 0 && (
              <span className="text-xs text-ink/40 px-1 py-0.5">+{extraCount} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
