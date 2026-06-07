import { useState, useCallback } from 'react'

const KEY = 'liftrank_log'

function readLog() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeLog(entries) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries))
  } catch {
    // localStorage unavailable — state still updates
  }
}

export function useLiftLog() {
  const [log, setLog] = useState(() => readLog())

  const addEntry = useCallback((entry) => {
    setLog((prev) => {
      const next = [entry, ...prev]
      writeLog(next)
      return next
    })
  }, [])

  return { log, addEntry }
}
