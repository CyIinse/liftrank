import { useUnitsContext } from '../contexts/UnitsContext'

export default function UnitToggle() {
  const { units, toggleUnits } = useUnitsContext()
  const isImperial = units === 'imperial'

  return (
    <button
      type="button"
      onClick={toggleUnits}
      aria-label={`Switch to ${isImperial ? 'metric' : 'imperial'} units`}
      title={`Switch to ${isImperial ? 'kg / cm' : 'lb / in'}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 20,
        padding: '4px 2px',
        cursor: 'pointer',
        minHeight: 44,
        minWidth: 64,
      }}
    >
      {['kg', 'lb'].map((unit) => {
        const active = (unit === 'lb') === isImperial
        return (
          <span
            key={unit}
            style={{
              flex: 1,
              padding: '3px 8px',
              borderRadius: 20,
              fontFamily: 'var(--font-condensed)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              background: active ? 'var(--color-primary)' : 'none',
              color: active ? '#0F172A' : 'var(--color-muted)',
              transition: 'background 150ms, color 150ms',
            }}
          >
            {unit}
          </span>
        )
      })}
    </button>
  )
}
