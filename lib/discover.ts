import { calculateMatchScore, UserProfile } from './matching'
import { MockUser } from './mockUsers'

export interface DiscoverResult {
  user: MockUser
  interestScore: number
  locationScore: number
  combinedScore: number
  sharedInterestIds: string[]
}

/**
 * Converts a distance in miles to a 0-100 closeness score.
 * Anyone within half a mile scores ~100; closeness fades to 0 by 25 miles.
 */
export function locationScoreFromDistance(distanceMiles: number): number {
  const score = 100 - distanceMiles * 4
  return Math.max(0, Math.min(100, score))
}

/**
 * Blend interest and location scores according to a user's priority slider.
 * priority = 0   -> pure "nearby" ranking
 * priority = 1   -> pure "shared interests" ranking
 * priority = 0.5 -> balanced, equal weight
 */
export function rankMatches(
  me: UserProfile,
  candidates: MockUser[],
  priority: number
): DiscoverResult[] {
  const weight = Math.max(0, Math.min(1, priority))

  return candidates
    .map(candidate => {
      const interestScore = calculateMatchScore(me, {
        id: candidate.id,
        interests: candidate.interests,
      })
      const locationScore = locationScoreFromDistance(candidate.distanceMiles)
      const combinedScore = weight * interestScore + (1 - weight) * locationScore
      const myInterestIds = new Set(me.interests.map(i => i.interestId))
      const sharedInterestIds = candidate.interests
        .filter(i => myInterestIds.has(i.interestId))
        .map(i => i.interestId)

      return { user: candidate, interestScore, locationScore, combinedScore, sharedInterestIds }
    })
    .sort((a, b) => b.combinedScore - a.combinedScore)
}
