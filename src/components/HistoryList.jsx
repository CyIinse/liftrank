import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import RankBadge from './RankBadge'
import TierStrip from './TierStrip'
import { formatWeight } from '../utils/e1rm'
import { useUnitsContext } from '../contexts/UnitsContext'
import { displayWeight, kgToDisplay, formatWeightDisplay } from '../utils/units'
import UnitToggle from './UnitToggle'

function groupByDate(log) {
  const groups = {}
  for (const entry of log) {
    if (!groups[entry.date]) groups[entry.date] = []
    groups[entry.date].push(entry)
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function HistoryList({ log, profile }) {
  const navigate = useNavigate()
  const { units } = useUnitsContext()
  const [expanded, setExpanded] = useState(null)
  const groups = groupByDate(log)

  return (
    <div className="screen">
      {/* Nav */}
      <nav className="nav">
        <a href="/log" className="nav-logo">LIFT<span>R</span></a>
        <div className="nav-actions">
          <UnitToggle />
          <button
            className="icon-btn"
            aria-label="Log a lift"
            onClick={() => navigate('/log')}
            title="Log lift"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
            </svg>
          </button>
          <button
            className="icon-btn"
            aria-label="Edit profile"
            onClick={() => navigate('/setup')}
          >
            <Settings size={20} />
          </button>
        </div>
      </nav>

      <h1 style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: 28, fontWeight: 900,
        textTransform: 'uppercase', letterSpacing: 2,
        marginBottom: 24,
      }}>
        History
      </h1>

      {groups.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <p style={{ color: 'var(--color-muted)', marginBottom: 16 }}>No lifts logged yet.</p>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 32px' }} onClick={() => navigate('/log')}>
            Log Your First Lift
          </button>
        </div>
      ) : (
        groups.map(([date, entries]) => (
          <div key={date} style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 10, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', color: 'var(--color-muted)',
              marginBottom: 10,
            }}>
              {formatDate(date)}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {entries.map((entry) => (
                <div key={entry.id}>
                  <button
                    onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                    className="card"
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', cursor: 'pointer',
                      background: 'var(--color-card)', border: '1px solid var(--color-border)',
                      textAlign: 'left', minHeight: 44,
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{entry.liftName}</p>
                      <p style={{ color: 'var(--color-muted)', fontSize: 12 }}>
                        {displayWeight(entry.weightKg, units)} × {entry.reps}
                        {entry.sets ? ` × ${entry.sets} sets` : ''}
                      </p>
                    </div>
                    <RankBadge rank={entry.rank} />
                  </button>

                  {expanded === entry.id && (
                    <div className="card" style={{
                      borderTop: 'none',
                      borderRadius: '0 0 12px 12px',
                      padding: '16px',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                    }}>
                      <p style={{ color: 'var(--color-dim)', fontSize: 12, marginBottom: 12 }}>
                        e1RM {formatWeightDisplay(kgToDisplay(entry.e1rm, units), units)} · BW ratio {entry.bwRatio}×
                      </p>
                      <TierStrip currentRank={entry.rank} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
