import { describe, it, expect } from 'vitest'
import { getRankResult, applyAgeAdjustment } from './ranking'

const maleProfile = { sex: 'male', age: 25, weightKg: 80 }
const femaleProfile = { sex: 'female', age: 25, weightKg: 60 }

describe('getRankResult — known lift', () => {
  it('returns beginner for low e1RM', () => {
    // Bench Press male beginner = 0.5 × 80 = 40kg
    const result = getRankResult(30, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.rank).toBe('beginner')
  })

  it('returns intermediate for e1RM meeting intermediate threshold', () => {
    // Bench Press male intermediate = 1.0 × 80 = 80kg
    const result = getRankResult(80, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.rank).toBe('intermediate')
  })

  it('returns elite for e1RM meeting elite threshold', () => {
    // Bench Press male elite = 1.75 × 80 = 140kg
    const result = getRankResult(140, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.rank).toBe('elite')
  })

  it('returns bwRatio rounded to 2 decimal places', () => {
    const result = getRankResult(100, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.bwRatio).toBeCloseTo(1.25, 2)
  })

  it('returns nextRank null when already elite', () => {
    const result = getRankResult(200, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.nextRank).toBeNull()
  })

  it('returns nextRank with kgNeeded when not elite', () => {
    // intermediate = 80kg, advanced = 100kg
    const result = getRankResult(80, maleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.nextRank).toEqual({ tier: 'advanced', kgNeeded: expect.any(Number) })
    expect(result.nextRank.kgNeeded).toBeGreaterThan(0)
  })

  it('uses female standards for female profile', () => {
    // Bench Press female intermediate = 0.75 × 60 = 45kg
    const result = getRankResult(45, femaleProfile, 'Barbell Bench Press', 'upper-push', true)
    expect(result.rank).toBe('intermediate')
  })
})

describe('getRankResult — custom lift (category fallback)', () => {
  it('uses category standards when isKnownLift is false', () => {
    // upper-push male intermediate = 0.75 × 80 = 60kg
    const result = getRankResult(60, maleProfile, 'Cable Fly', 'upper-push', false)
    expect(result.rank).toBe('intermediate')
  })
})

describe('applyAgeAdjustment', () => {
  it('returns standards unchanged for age <= 40', () => {
    const std = { beginner: 0.5, novice: 1.0, intermediate: 1.25, advanced: 1.5, elite: 2.0 }
    expect(applyAgeAdjustment(std, 35)).toEqual(std)
  })

  it('reduces thresholds by 2% per year over 40', () => {
    const std = { beginner: 0.5, novice: 1.0, intermediate: 1.0, advanced: 1.0, elite: 1.0 }
    const adjusted = applyAgeAdjustment(std, 45) // 5 years over 40 → 10% reduction
    expect(adjusted.elite).toBeCloseTo(0.9, 3)
  })

  it('caps reduction at 40% (age 60+)', () => {
    const std = { beginner: 0.5, novice: 1.0, intermediate: 1.0, advanced: 1.0, elite: 1.0 }
    const adjusted = applyAgeAdjustment(std, 80)
    expect(adjusted.elite).toBeCloseTo(0.6, 3)
  })
})
