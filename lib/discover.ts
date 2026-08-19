import { calculateMatchScore, UserProfile } from './matching'
import { MockUser } from './mockUsers'

export interface MatchWeights {
  location: number
  interests: number
  age: number
}

export const BALANCED_WEIGHTS: MatchWeights = { location: 0.5, interests: 0.5, age: 0.5 }

export interface DiscoverResult {
  user: MockUser
  interestScore: number
  locationScore: number
  ageScore: number
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
 * Converts an age gap in years to a 0-100 closeness score.
 * Same age scores 100; closeness fades to 0 by a 25-year gap.
 */
export function ageScoreFromGap(ageGapYears: number): number {
  const score = 100 - Math.abs(ageGapYears) * 4
  return Math.max(0, Math.min(100, score))
}

/**
 * Blend location, interest, and age scores according to a user's three
 * priority sliders (each 0-1, representing how much that axis matters).
 * All-zero weights fall back to a balanced blend so results never break.
 */
export function rankMatches(
  me: UserProfile & { age: number },
  candidates: MockUser[],
  weights: MatchWeights
): DiscoverResult[] {
  const w = {
    location: Math.max(0, Math.min(1, weights.location)),
    interests: Math.max(0, Math.min(1, weights.interests)),
    age: Math.max(0, Math.min(1, weights.age)),
  }
  const totalWeight = w.location + w.interests + w.age
  const normalized = totalWeight === 0 ? BALANCED_WEIGHTS : w

  return candidates
    .map(candidate => {
      const interestScore = calculateMatchScore(me, {
        id: candidate.id,
        interests: candidate.interests,
      })
      const locationScore = locationScoreFromDistance(candidate.distanceMiles)
      const ageScore = ageScoreFromGap(candidate.age - me.age)
      const combinedScore =
        (normalized.location * locationScore +
          normalized.interests * interestScore +
          normalized.age * ageScore) /
        (normalized.location + normalized.interests + normalized.age)
      const myInterestIds = new Set(me.interests.map(i => i.interestId))
      const sharedInterestIds = candidate.interests
        .filter(i => myInterestIds.has(i.interestId))
        .map(i => i.interestId)

      return {
        user: candidate,
        interestScore,
        locationScore,
        ageScore,
        combinedScore,
        sharedInterestIds,
      }
    })
    .sort((a, b) => b.combinedScore - a.combinedScore)
}
