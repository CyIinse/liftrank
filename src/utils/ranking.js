import { LIFT_STANDARDS, CATEGORY_STANDARDS, TIERS } from '../data/strength-standards'

export function applyAgeAdjustment(standards, age) {
  if (age <= 40) return standards
  const yearsOver = age - 40
  const factor = Math.max(1 - yearsOver * 0.02, 0.6)
  return Object.fromEntries(
    Object.entries(standards).map(([tier, value]) => [tier, value * factor])
  )
}

function getStandards(liftName, category, sex, age) {
  const base = liftName && LIFT_STANDARDS[liftName]
    ? LIFT_STANDARDS[liftName][sex]
    : CATEGORY_STANDARDS[category][sex]
  return applyAgeAdjustment(base, age)
}

export function getRankResult(e1rm, profile, liftName, category, isKnownLift) {
  const { sex, age, weightKg } = profile
  const bwRatio = e1rm / weightKg
  const standards = getStandards(isKnownLift ? liftName : null, category, sex, age)

  let rank = 'beginner'
  for (const tier of TIERS) {
    if (bwRatio >= standards[tier]) {
      rank = tier
      break
    }
  }

  const currentTierIndex = TIERS.indexOf(rank)
  let nextRank = null
  if (currentTierIndex > 0) {
    const nextTier = TIERS[currentTierIndex - 1]
    const neededE1RM = standards[nextTier] * weightKg
    nextRank = {
      tier: nextTier,
      kgNeeded: Math.max(0, Math.round((neededE1RM - e1rm) * 10) / 10),
    }
  }

  return {
    rank,
    bwRatio: Math.round(bwRatio * 100) / 100,
    e1rm,
    nextRank,
  }
}
