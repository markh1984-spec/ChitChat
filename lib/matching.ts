/**
 * ChitChat Matching Algorithm
 *
 * Calculates compatibility scores between users based on shared interests.
 * Higher scores indicate better matches.
 */

export interface UserProfile {
  id: string
  interests: Array<{
    interestId: string
    level: number // 1-10 scale
  }>
}

export interface MatchResult {
  userId: string
  score: number
  sharedInterests: string[]
}

/**
 * Calculate match score between two users
 * @param user1 - First user profile
 * @param user2 - Second user profile
 * @returns Match score from 0-100
 */
export function calculateMatchScore(
  user1: UserProfile,
  user2: UserProfile
): number {
  const interests1 = new Map(
    user1.interests.map(i => [i.interestId, i.level])
  )
  const interests2 = new Map(
    user2.interests.map(i => [i.interestId, i.level])
  )

  let totalScore = 0
  let sharedCount = 0

  // Find shared interests and calculate weighted score
  for (const [interestId, level1] of interests1) {
    const level2 = interests2.get(interestId)
    if (level2) {
      // Shared interest found
      sharedCount++
      // Average the interest levels and weight by enthusiasm
      const avgLevel = (level1 + level2) / 2
      totalScore += avgLevel
    }
  }

  if (sharedCount === 0) return 0

  // Normalize to 0-100 scale
  // More shared interests = higher base score
  // Higher enthusiasm levels = higher score
  const baseScore = (totalScore / sharedCount) * 10 // Max 100
  const sharedBonus = Math.min(sharedCount * 5, 30) // Bonus for more shared interests

  return Math.min(baseScore + sharedBonus, 100)
}

/**
 * Find top matches for a user from a pool of candidates
 * @param user - User to find matches for
 * @param candidates - Pool of potential matches
 * @param limit - Maximum number of matches to return
 * @returns Array of match results sorted by score (highest first)
 */
export function findTopMatches(
  user: UserProfile,
  candidates: UserProfile[],
  limit: number = 10
): MatchResult[] {
  const matches = candidates
    .filter(candidate => candidate.id !== user.id)
    .map(candidate => {
      const score = calculateMatchScore(user, candidate)
      const sharedInterests = user.interests
        .filter(ui =>
          candidate.interests.some(ci => ci.interestId === ui.interestId)
        )
        .map(ui => ui.interestId)

      return {
        userId: candidate.id,
        score,
        sharedInterests,
      }
    })
    .filter(match => match.score > 0) // Only return actual matches
    .sort((a, b) => b.score - a.score) // Highest score first
    .slice(0, limit)

  return matches
}

/**
 * Get a human-readable match quality label
 */
export function getMatchQuality(score: number): string {
  if (score >= 80) return 'Excellent Match'
  if (score >= 60) return 'Great Match'
  if (score >= 40) return 'Good Match'
  if (score >= 20) return 'Potential Match'
  return 'Low Match'
}
