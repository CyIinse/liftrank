import { useState, useCallback } from 'react'

const KEY = 'liftrank_units'

function readUnits() {
  try {
    return localStorage.getItem(KEY) === 'imperial' ? 'imperial' : 'metric'
  } catch {
    return 'metric'
  }
}

export function useUnits() {
  const [units, setUnits] = useState(() => readUnits())

  const toggleUnits = useCallback(() => {
    setUnits((prev) => {
      const next = prev === 'metric' ? 'imperial' : 'metric'
      try { localStorage.setItem(KEY, next) } catch {}
      return next
    })
  }, [])

  return { units, toggleUnits }
}
