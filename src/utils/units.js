// Unit conversion utilities — all stored data stays in kg/cm internally

export const KG_TO_LB = 2.20462
export const LB_TO_KG = 1 / KG_TO_LB
export const CM_TO_IN = 1 / 2.54
export const IN_TO_CM = 2.54

// Weight conversions
export function kgToLb(kg) {
  return Math.round(kg * KG_TO_LB * 10) / 10
}

export function lbToKg(lb) {
  return Math.round(lb * LB_TO_KG * 10) / 10
}

// Display a stored-kg value in the current unit system
export function displayWeight(kg, units) {
  if (units === 'imperial') return `${kgToLb(kg)} lb`
  return `${kg} kg`
}

// Return just the numeric value for display (for inputs)
export function kgToDisplay(kg, units) {
  if (units === 'imperial') return kgToLb(kg)
  return kg
}

// Convert a user-entered value (in current units) to kg for storage
export function inputToKg(value, units) {
  const num = Number(value)
  if (units === 'imperial') return lbToKg(num)
  return num
}

// Unit label string
export function weightUnit(units) {
  return units === 'imperial' ? 'lb' : 'kg'
}

// Height conversions
export function cmToIn(cm) {
  return Math.round(cm * CM_TO_IN)
}

export function inToCm(inches) {
  return Math.round(Number(inches) * IN_TO_CM)
}

// Display cm as ft'in" string
export function cmToFtIn(cm) {
  const totalIn = cm * CM_TO_IN
  const feet = Math.floor(totalIn / 12)
  const inches = Math.round(totalIn % 12)
  return `${feet}'${inches}"`
}

// Display a stored-cm height value in current unit
export function displayHeight(cm, units) {
  if (units === 'imperial') return `${cmToFtIn(cm)}`
  return `${cm} cm`
}

// Height unit label for inputs
export function heightUnit(units) {
  return units === 'imperial' ? 'in' : 'cm'
}

// Format a weight value with its unit label (no conversion — value already in display units)
export function formatWeightDisplay(value, units) {
  const num = Number.isInteger(value) ? String(value) : value.toFixed(1)
  return `${num} ${weightUnit(units)}`
}
