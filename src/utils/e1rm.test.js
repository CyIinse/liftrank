import { describe, it, expect } from 'vitest'
import { calcE1RM, formatWeight } from './e1rm'

describe('calcE1RM', () => {
  it('returns weight unchanged for 1 rep', () => {
    expect(calcE1RM(100, 1)).toBe(100)
  })

  it('applies Epley formula: weight * (1 + reps/30)', () => {
    expect(calcE1RM(100, 5)).toBeCloseTo(116.67, 1)
  })

  it('rounds to 1 decimal place', () => {
    expect(calcE1RM(80, 8)).toBeCloseTo(101.3, 1)
  })

  it('returns 0 for zero weight', () => {
    expect(calcE1RM(0, 5)).toBe(0)
  })
})

describe('formatWeight', () => {
  it('formats whole numbers without decimals', () => {
    expect(formatWeight(100)).toBe('100')
  })

  it('formats decimals to 1 place', () => {
    expect(formatWeight(116.67)).toBe('116.7')
  })
})
