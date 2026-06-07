// Epley formula: e1RM = weight × (1 + reps / 30)
export function calcE1RM(weightKg, reps) {
  if (reps === 1) return weightKg
  return Math.round((weightKg * (1 + reps / 30)) * 10) / 10
}

export function formatWeight(kg) {
  return Number.isInteger(kg) ? String(kg) : kg.toFixed(1)
}
