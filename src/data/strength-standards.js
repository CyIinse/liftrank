// Bodyweight-ratio thresholds per lift per sex.
// e1RM / bodyweightKg must meet or exceed the threshold for that tier.
export const LIFT_STANDARDS = {
  'Barbell Back Squat': {
    male:   { beginner: 0.5,  novice: 1.0,  intermediate: 1.25, advanced: 1.5,  elite: 2.0  },
    female: { beginner: 0.3,  novice: 0.65, intermediate: 0.85, advanced: 1.1,  elite: 1.5  },
  },
  'Barbell Bench Press': {
    male:   { beginner: 0.5,  novice: 0.75, intermediate: 1.0,  advanced: 1.25, elite: 1.75 },
    female: { beginner: 0.25, novice: 0.5,  intermediate: 0.75, advanced: 1.0,  elite: 1.25 },
  },
  'Deadlift': {
    male:   { beginner: 0.75, novice: 1.25, intermediate: 1.5,  advanced: 2.0,  elite: 2.5  },
    female: { beginner: 0.5,  novice: 0.85, intermediate: 1.1,  advanced: 1.5,  elite: 2.0  },
  },
  'Barbell Overhead Press': {
    male:   { beginner: 0.35, novice: 0.55, intermediate: 0.75, advanced: 1.0,  elite: 1.3  },
    female: { beginner: 0.2,  novice: 0.35, intermediate: 0.5,  advanced: 0.65, elite: 0.9  },
  },
  'Barbell Row': {
    male:   { beginner: 0.5,  novice: 0.75, intermediate: 1.0,  advanced: 1.25, elite: 1.5  },
    female: { beginner: 0.3,  novice: 0.5,  intermediate: 0.7,  advanced: 0.9,  elite: 1.15 },
  },
  'Romanian Deadlift': {
    male:   { beginner: 0.5,  novice: 0.85, intermediate: 1.15, advanced: 1.5,  elite: 1.85 },
    female: { beginner: 0.35, novice: 0.6,  intermediate: 0.8,  advanced: 1.05, elite: 1.35 },
  },
  'Pull-up': {
    male:   { beginner: 0.0,  novice: 0.5,  intermediate: 0.75, advanced: 1.0,  elite: 1.25 },
    female: { beginner: 0.0,  novice: 0.25, intermediate: 0.5,  advanced: 0.75, elite: 1.0  },
    hint: 'Enter total weight (bodyweight + added weight)',
  },
  'Dip': {
    male:   { beginner: 0.0,  novice: 0.5,  intermediate: 0.75, advanced: 1.0,  elite: 1.25 },
    female: { beginner: 0.0,  novice: 0.25, intermediate: 0.5,  advanced: 0.75, elite: 1.0  },
    hint: 'Enter total weight (bodyweight + added weight)',
  },
  'Hip Thrust': {
    male:   { beginner: 0.75, novice: 1.25, intermediate: 1.75, advanced: 2.25, elite: 2.75 },
    female: { beginner: 0.5,  novice: 0.9,  intermediate: 1.3,  advanced: 1.7,  elite: 2.2  },
  },
  'Incline Bench Press': {
    male:   { beginner: 0.4,  novice: 0.65, intermediate: 0.85, advanced: 1.1,  elite: 1.5  },
    female: { beginner: 0.2,  novice: 0.4,  intermediate: 0.6,  advanced: 0.85, elite: 1.1  },
  },
  'Front Squat': {
    male:   { beginner: 0.4,  novice: 0.7,  intermediate: 1.0,  advanced: 1.3,  elite: 1.6  },
    female: { beginner: 0.25, novice: 0.5,  intermediate: 0.7,  advanced: 0.95, elite: 1.2  },
  },
  'Power Clean': {
    male:   { beginner: 0.4,  novice: 0.65, intermediate: 0.85, advanced: 1.1,  elite: 1.4  },
    female: { beginner: 0.25, novice: 0.45, intermediate: 0.6,  advanced: 0.8,  elite: 1.0  },
  },
  'Seated Dumbbell Shoulder Press': {
    male:   { beginner: 0.15, novice: 0.25, intermediate: 0.35, advanced: 0.5,  elite: 0.65 },
    female: { beginner: 0.08, novice: 0.15, intermediate: 0.22, advanced: 0.32, elite: 0.45 },
  },
  'Overhead Tricep Extension': {
    male:   { beginner: 0.1,  novice: 0.2,  intermediate: 0.3,  advanced: 0.45, elite: 0.6  },
    female: { beginner: 0.06, novice: 0.12, intermediate: 0.2,  advanced: 0.3,  elite: 0.45 },
  },
  'Bicep Curl': {
    male:   { beginner: 0.15, novice: 0.25, intermediate: 0.35, advanced: 0.5,  elite: 0.65 },
    female: { beginner: 0.08, novice: 0.15, intermediate: 0.22, advanced: 0.32, elite: 0.45 },
  },
  'Lateral Raise': {
    male:   { beginner: 0.05, novice: 0.1,  intermediate: 0.15, advanced: 0.22, elite: 0.3  },
    female: { beginner: 0.03, novice: 0.06, intermediate: 0.1,  advanced: 0.15, elite: 0.22 },
  },
  'Leg Press': {
    male:   { beginner: 1.0,  novice: 1.5,  intermediate: 2.0,  advanced: 2.5,  elite: 3.0  },
    female: { beginner: 0.65, novice: 1.0,  intermediate: 1.4,  advanced: 1.8,  elite: 2.3  },
  },
  'Tricep Pushdown': {
    male:   { beginner: 0.15, novice: 0.25, intermediate: 0.35, advanced: 0.5,  elite: 0.65 },
    female: { beginner: 0.08, novice: 0.15, intermediate: 0.22, advanced: 0.32, elite: 0.45 },
  },
  'Leg Curl': {
    male:   { beginner: 0.25, novice: 0.4,  intermediate: 0.55, advanced: 0.7,  elite: 0.9  },
    female: { beginner: 0.17, novice: 0.28, intermediate: 0.38, advanced: 0.5,  elite: 0.65 },
  },
  'Leg Extension': {
    male:   { beginner: 0.25, novice: 0.4,  intermediate: 0.6,  advanced: 0.8,  elite: 1.0  },
    female: { beginner: 0.17, novice: 0.28, intermediate: 0.42, advanced: 0.55, elite: 0.72 },
  },
}

// Fallback standards by movement category for custom/unknown lifts
export const CATEGORY_STANDARDS = {
  'upper-push': {
    male:   { beginner: 0.35, novice: 0.55, intermediate: 0.75, advanced: 0.95, elite: 1.3  },
    female: { beginner: 0.2,  novice: 0.35, intermediate: 0.5,  advanced: 0.7,  elite: 0.95 },
  },
  'upper-pull': {
    male:   { beginner: 0.25, novice: 0.45, intermediate: 0.65, advanced: 0.9,  elite: 1.1  },
    female: { beginner: 0.15, novice: 0.3,  intermediate: 0.5,  advanced: 0.7,  elite: 0.9  },
  },
  'lower-body': {
    male:   { beginner: 0.5,  novice: 0.9,  intermediate: 1.2,  advanced: 1.6,  elite: 2.0  },
    female: { beginner: 0.35, novice: 0.65, intermediate: 0.9,  advanced: 1.2,  elite: 1.6  },
  },
  'full-body': {
    male:   { beginner: 0.4,  novice: 0.65, intermediate: 0.9,  advanced: 1.2,  elite: 1.5  },
    female: { beginner: 0.25, novice: 0.45, intermediate: 0.65, advanced: 0.9,  elite: 1.2  },
  },
}

export const TIERS = ['elite', 'advanced', 'intermediate', 'novice', 'beginner']
