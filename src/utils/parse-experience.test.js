import { describe, it, expect } from 'vitest'
import { parseExperienceMonths, formatExperienceMonths } from './parse-experience'

describe('parseExperienceMonths', () => {
  it('parses years only', () => {
    expect(parseExperienceMonths('2 years')).toBe(24)
    expect(parseExperienceMonths('1 year')).toBe(12)
  })

  it('parses months only', () => {
    expect(parseExperienceMonths('6 months')).toBe(6)
    expect(parseExperienceMonths('1 month')).toBe(1)
  })

  it('parses years and months together', () => {
    expect(parseExperienceMonths('1 yr 4 months')).toBe(16)
    expect(parseExperienceMonths('2 years 3 months')).toBe(27)
  })

  it('parses plain numbers as months', () => {
    expect(parseExperienceMonths('6')).toBe(6)
  })

  it('returns 0 for empty or unrecognised input', () => {
    expect(parseExperienceMonths('')).toBe(0)
    expect(parseExperienceMonths('abc')).toBe(0)
  })
})

describe('formatExperienceMonths', () => {
  it('formats months only when under 12', () => {
    expect(formatExperienceMonths(6)).toBe('6 months')
    expect(formatExperienceMonths(1)).toBe('1 month')
  })

  it('formats years only when exact multiple of 12', () => {
    expect(formatExperienceMonths(24)).toBe('2 years')
    expect(formatExperienceMonths(12)).toBe('1 year')
  })

  it('formats years and months', () => {
    expect(formatExperienceMonths(16)).toBe('1 year 4 months')
    expect(formatExperienceMonths(27)).toBe('2 years 3 months')
  })
})
