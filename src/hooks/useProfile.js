import { useState, useCallback } from 'react'

const KEY = 'liftrank_profile'

function readProfile() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useProfile() {
  const [profile, setProfileState] = useState(() => readProfile())

  const saveProfile = useCallback((data) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      // localStorage unavailable (private browsing) — still update state
    }
    setProfileState(data)
  }, [])

  return { profile, saveProfile }
}

export function isLocalStorageAvailable() {
  try {
    localStorage.setItem('__test__', '1')
    localStorage.removeItem('__test__')
    return true
  } catch {
    return false
  }
}
