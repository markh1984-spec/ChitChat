'use client'

import { useState } from 'react'
import { DiscoverResult } from '@/lib/discover'
import { getInterest } from '@/lib/interests'
import { getMatchQuality } from '@/lib/matching'

export default function MatchCard({ result }: { result: DiscoverResult }) {
  const [waved, setWaved] = useState(false)
  const { user, combinedScore, sharedInterestIds } = result

  return (
    <div className="bg-white border-2 border-primary-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-primary-200 transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className="text-4xl w-14 h-14 shrink-0 rounded-full bg-primary-50 flex items-center justify-center"
          aria-hidden="true"
        >
          {user.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">
              {user.name}, {user.age}
            </h3>
            <span className="text-sm font-semibold bg-primary-100 text-primary-800 px-3 py-1 rounded-full whitespace-nowrap">
              {getMatchQuality(combinedScore)}
            </span>
          </div>
          <p className="text-base text-ink/50">
            {user.town} &middot; {user.distanceMiles.toFixed(1)} miles away
          </p>
        </div>
      </div>

      <p className="text-lg text-ink/80">{user.bio}</p>

      {sharedInterestIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sharedInterestIds.map(id => {
            const interest = getInterest(id)
            if (!interest) return null
            return (
              <span
                key={id}
                className="text-base bg-accent-50 text-accent-800 px-3 py-1 rounded-full"
              >
                {interest.emoji} {interest.label}
              </span>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setWaved(true)}
        disabled={waved}
        className="mt-1 self-start text-lg font-semibold px-5 py-3 rounded-full transition-colors disabled:bg-accent-100 disabled:text-accent-800 bg-primary-600 hover:bg-primary-700 text-cream shadow-sm disabled:shadow-none"
      >
        {waved ? '👋 Wave sent!' : '👋 Say Hello'}
      </button>
    </div>
  )
}
