'use client'

import { useState } from 'react'
import { DiscoverResult } from '@/lib/discover'
import { getInterest } from '@/lib/interests'
import { getMatchQuality } from '@/lib/matching'

export default function MatchCard({ result }: { result: DiscoverResult }) {
  const [waved, setWaved] = useState(false)
  const { user, combinedScore, sharedInterestIds } = result

  return (
    <div className="bg-white border-2 border-gray-100 rounded-xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-5xl" aria-hidden="true">
          {user.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              {user.name}, {user.age}
            </h3>
            <span className="text-sm font-semibold bg-primary-100 text-primary-800 px-3 py-1 rounded-full whitespace-nowrap">
              {getMatchQuality(combinedScore)}
            </span>
          </div>
          <p className="text-base text-gray-500">
            {user.town} &middot; {user.distanceMiles.toFixed(1)} miles away
          </p>
        </div>
      </div>

      <p className="text-lg text-gray-700">{user.bio}</p>

      {sharedInterestIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sharedInterestIds.map(id => {
            const interest = getInterest(id)
            if (!interest) return null
            return (
              <span
                key={id}
                className="text-base bg-green-50 text-green-800 px-3 py-1 rounded-full"
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
        className="mt-1 self-start text-lg font-semibold px-5 py-3 rounded-lg transition-colors disabled:bg-green-100 disabled:text-green-800 bg-primary-600 hover:bg-primary-700 text-white"
      >
        {waved ? '👋 Wave sent!' : '👋 Say Hello'}
      </button>
    </div>
  )
}
