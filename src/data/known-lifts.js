// Each entry: canonical name, movement category, search aliases
export const KNOWN_LIFTS = [
  { name: 'Barbell Back Squat',              category: 'lower-body',  aliases: ['squat', 'back squat'] },
  { name: 'Barbell Bench Press',             category: 'upper-push',  aliases: ['bench', 'bench press', 'flat bench'] },
  { name: 'Deadlift',                        category: 'lower-body',  aliases: ['dl', 'dead lift', 'conventional deadlift'] },
  { name: 'Barbell Overhead Press',          category: 'upper-push',  aliases: ['ohp', 'overhead press', 'military press', 'press'] },
  { name: 'Barbell Row',                     category: 'upper-pull',  aliases: ['row', 'bent over row', 'barbell row'] },
  { name: 'Romanian Deadlift',               category: 'lower-body',  aliases: ['rdl', 'romanian'] },
  { name: 'Pull-up',                         category: 'upper-pull',  aliases: ['pullup', 'pull up', 'chin up', 'chinup'] },
  { name: 'Dip',                             category: 'upper-push',  aliases: ['dips', 'chest dip', 'tricep dip'] },
  { name: 'Hip Thrust',                      category: 'lower-body',  aliases: ['hip thrust', 'glute bridge', 'barbell hip thrust'] },
  { name: 'Incline Bench Press',             category: 'upper-push',  aliases: ['incline bench', 'incline press'] },
  { name: 'Front Squat',                     category: 'lower-body',  aliases: ['front squat'] },
  { name: 'Power Clean',                     category: 'full-body',   aliases: ['clean', 'power clean'] },
  { name: 'Seated Dumbbell Shoulder Press',  category: 'upper-push',  aliases: ['shoulder press', 'db shoulder press', 'seated press', 'dumbbell press'] },
  { name: 'Overhead Tricep Extension',       category: 'upper-push',  aliases: ['tricep extension', 'overhead extension', 'skull crusher'] },
  { name: 'Bicep Curl',                      category: 'upper-pull',  aliases: ['curl', 'barbell curl', 'dumbbell curl', 'bicep'] },
  { name: 'Lateral Raise',                   category: 'upper-push',  aliases: ['lateral raise', 'side raise', 'lat raise'] },
  { name: 'Leg Press',                       category: 'lower-body',  aliases: ['leg press'] },
  { name: 'Tricep Pushdown',                 category: 'upper-push',  aliases: ['pushdown', 'tricep pushdown', 'cable pushdown'] },
  { name: 'Leg Curl',                        category: 'lower-body',  aliases: ['leg curl', 'hamstring curl', 'lying leg curl'] },
  { name: 'Leg Extension',                   category: 'lower-body',  aliases: ['leg extension', 'quad extension'] },
]

// Search lifts by query — returns matches sorted by relevance
export function searchLifts(query) {
  if (!query || query.trim().length < 1) return []
  const q = query.toLowerCase().trim()
  return KNOWN_LIFTS.filter(
    (lift) =>
      lift.name.toLowerCase().includes(q) ||
      lift.aliases.some((a) => a.includes(q))
  ).slice(0, 6)
}

export function findLift(name) {
  const lower = name.toLowerCase().trim()
  return KNOWN_LIFTS.find(
    (lift) =>
      lift.name.toLowerCase() === lower ||
      lift.aliases.includes(lower)
  ) ?? null
}
