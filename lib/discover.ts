import { calculateMatchScore, UserProfile } from './matching'
import { MockUser } from './mockUsers'

export const BALANCED_PRIORITY = 0.5

export interface DiscoverResult {
  user: MockUser
  interestScore: number
  locationScore: number
  combinedScore: number
  sharedInterestIds: string[]
  overlappingAvailability: string[]
  adHocAvailable: boolean
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
 * Blend interest and location scores along a single priority slider.
 * priority = 0   -> pure "nearby" ranking
 * priority = 1   -> pure "shared interests" ranking
 * priority = 0.5 -> balanced, equal weight
 */
export function rankMatches(
  me: UserProfile,
  candidates: MockUser[],
  priority: number,
  myAvailability: string[] = [],
  myAdHoc: boolean = false
): DiscoverResult[] {
  const weight = Math.max(0, Math.min(1, priority))
  const myAvailabilitySet = new Set(myAvailability)

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
      // If I'm ad hoc, I'll fit around any time they've set — so all of their
      // slots count as "available", not just ones that literally overlap mine.
      // But my own flexibility never implies THEY are free anytime; that's
      // only true if they've said so themselves.
      const overlappingAvailability = myAdHoc
        ? candidate.availability
        : candidate.availability.filter(a => myAvailabilitySet.has(a))
      const adHocAvailable = candidate.adHoc

      return {
        user: candidate,
        interestScore,
        locationScore,
        combinedScore,
        sharedInterestIds,
        overlappingAvailability,
        adHocAvailable,
      }
    })
    .sort((a, b) => b.combinedScore - a.combinedScore)
}

/**
 * Maps a 0-100 match score to a red-to-green color pair for badges.
 * 0 = red (poor match), 100 = green (excellent match).
 */
export function scoreColor(score: number): { bg: string; text: string } {
  const clamped = Math.max(0, Math.min(100, score))
  const hue = (clamped / 100) * 120
  return {
    bg: `hsl(${hue}, 70%, 90%)`,
    text: `hsl(${hue}, 70%, 26%)`,
  }
}
