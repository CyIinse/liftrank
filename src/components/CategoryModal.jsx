const CATEGORIES = [
  { id: 'upper-push', label: 'Upper Push', desc: 'Chest, shoulders, triceps' },
  { id: 'upper-pull', label: 'Upper Pull', desc: 'Back, biceps' },
  { id: 'lower-body', label: 'Lower Body', desc: 'Quads, hamstrings, glutes' },
  { id: 'full-body',  label: 'Full Body',  desc: 'Olympic lifts, carries' },
]

export default function CategoryModal({ liftName, onSelect, onCancel }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={onCancel}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: 400, padding: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="label" style={{ marginBottom: 8 }}>Custom Lift Category</p>
        <p style={{ color: 'var(--color-fg)', marginBottom: 4, fontWeight: 600 }}>
          "{liftName}"
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 20 }}>
          Pick the closest movement type so we can estimate your rank.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-input)',
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-condensed)',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: 'var(--color-fg)',
              }}>
                {cat.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-muted)', marginTop: 2 }}>
                {cat.desc}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="btn btn-ghost"
          style={{ marginTop: 16 }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
