import { createContext, useContext } from 'react'
import { useUnits } from '../hooks/useUnits'

const UnitsContext = createContext(null)

export function UnitsProvider({ children }) {
  const { units, toggleUnits } = useUnits()
  return (
    <UnitsContext.Provider value={{ units, toggleUnits }}>
      {children}
    </UnitsContext.Provider>
  )
}

export function useUnitsContext() {
  const ctx = useContext(UnitsContext)
  if (!ctx) throw new Error('useUnitsContext must be used inside UnitsProvider')
  return ctx
}
