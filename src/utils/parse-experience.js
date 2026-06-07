export function parseExperienceMonths(str) {
  if (!str || typeof str !== 'string') return 0
  const s = str.trim().toLowerCase()
  if (!s) return 0

  let totalMonths = 0

  const yearMatch = s.match(/(\d+)\s*(?:years?|yrs?|y)/)
  if (yearMatch) totalMonths += parseInt(yearMatch[1], 10) * 12

  const monthMatch = s.match(/(\d+)\s*(?:months?|mos?|m)(?!in)/)
  if (monthMatch) totalMonths += parseInt(monthMatch[1], 10)

  if (totalMonths === 0) {
    const plainNum = s.match(/^(\d+)$/)
    if (plainNum) totalMonths = parseInt(plainNum[1], 10)
  }

  return totalMonths
}

export function formatExperienceMonths(months) {
  const years = Math.floor(months / 12)
  const remaining = months % 12
  if (years === 0) return `${months} ${months === 1 ? 'month' : 'months'}`
  if (remaining === 0) return `${years} ${years === 1 ? 'year' : 'years'}`
  return `${years} ${years === 1 ? 'year' : 'years'} ${remaining} ${remaining === 1 ? 'month' : 'months'}`
}
