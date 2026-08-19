import { calculateMatchScore, findTopMatches, getMatchQuality } from './matching'

describe('calculateMatchScore', () => {
  it('returns 0 for users with no shared interests', () => {
    const user1 = {
      id: '1',
      interests: [{ interestId: 'reading', level: 8 }]
    }
    const user2 = {
      id: '2',
      interests: [{ interestId: 'cooking', level: 7 }]
    }

    expect(calculateMatchScore(user1, user2)).toBe(0)
  })

  it('calculates score for users with shared interests', () => {
    const user1 = {
      id: '1',
      interests: [
        { interestId: 'reading', level: 8 },
        { interestId: 'gardening', level: 6 }
      ]
    }
    const user2 = {
      id: '2',
      interests: [
        { interestId: 'reading', level: 9 },
        { interestId: 'gardening', level: 7 }
      ]
    }

    const score = calculateMatchScore(user1, user2)
    expect(score).toBeGreaterThan(0)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('gives higher scores for more shared interests', () => {
    const user1 = {
      id: '1',
      interests: [
        { interestId: 'reading', level: 8 },
        { interestId: 'gardening', level: 6 },
        { interestId: 'cooking', level: 7 }
      ]
    }
    const user2a = {
      id: '2a',
      interests: [{ interestId: 'reading', level: 8 }]
    }
    const user2b = {
      id: '2b',
      interests: [
        { interestId: 'reading', level: 8 },
        { interestId: 'gardening', level: 6 }
      ]
    }

    const scoreOneShared = calculateMatchScore(user1, user2a)
    const scoreTwoShared = calculateMatchScore(user1, user2b)

    expect(scoreTwoShared).toBeGreaterThan(scoreOneShared)
  })
})

describe('getMatchQuality', () => {
  it('returns correct quality labels', () => {
    expect(getMatchQuality(90)).toBe('Excellent Match')
    expect(getMatchQuality(70)).toBe('Great Match')
    expect(getMatchQuality(50)).toBe('Good Match')
    expect(getMatchQuality(30)).toBe('Potential Match')
    expect(getMatchQuality(10)).toBe('Low Match')
  })
})
