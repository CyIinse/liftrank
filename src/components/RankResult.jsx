import { useNavigate } from 'react-router-dom'
import TierStrip from './TierStrip'
import { formatWeight } from '../utils/e1rm'
import { useUnitsContext } from '../contexts/UnitsContext'
import { displayWeight, kgToDisplay, formatWeightDisplay } from '../utils/units'

const RANK_PERCENTILE = {
  beginner:     'Just getting started — keep showing up',
  novice:       'Better than most beginners',
  intermediate: 'Stronger than ~60% of lifters',
  advanced:     'Top 20% — serious strength',
  elite:        'Top 5% — competitive level',
}

export default function RankResult({ result, liftName, weightKg, reps, onLogAnother }) {
  const navigate = useNavigate()
  const { units } = useUnitsContext()
  const { rank, bwRatio, e1rm, nextRank } = result

  const displayedWeight = displayWeight(weightKg, units)
  const displayedE1rm = formatWeightDisplay(kgToDisplay(e1rm, units), units)

  return (
    <div>
      {/* Summary line */}
      <p style={{ color: 'var(--color-muted)', fontSize: 12, textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
        {liftName} · {displayedWeight} × {reps}
      </p>
      <p style={{ color: 'var(--color-dim)', fontSize: 11, textAlign: 'center', marginBottom: 20 }}>
        e1RM {displayedE1rm} · BW ratio {bwRatio}×
      </p>

      {/* Rank card */}
      <div
        className="card"
        style={{
          textAlign: 'center',
          marginBottom: 16,
          padding: '24px 16px',
          position: 'relative',
          overflow: 'hidden',
          borderColor: 'rgba(249,115,22,0.2)',
        }}
      >
        {/* Top stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        }} />

        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: 10, fontWeight: 700, letterSpacing: 3,
          textTransform: 'uppercase', color: 'var(--color-muted)',
          marginBottom: 8,
        }}>
          Your Rank
        </p>
        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: 52, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: 2,
          color: 'var(--color-primary)', lineHeight: 1,
          marginBottom: 8,
        }}>
          {rank}
        </p>
        <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>
          {RANK_PERCENTILE[rank]}
        </p>
      </div>

      {/* Tier strip */}
      <TierStrip currentRank={rank} />

      {/* Next rank */}
      {nextRank ? (
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 9, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase', color: 'var(--color-dim)',
            marginBottom: 4,
          }}>
            Next rank: {nextRank.tier}
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-fg)' }}>
            Need{' '}
            <strong style={{ color: 'var(--color-accent)' }}>
              {formatWeightDisplay(kgToDisplay(nextRank.kgNeeded, units), units)}
            </strong>{' '}
            more e1RM
          </p>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
          <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-condensed)', fontWeight: 700, letterSpacing: 1 }}>
            ELITE — Peak of the standards
          </p>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={onLogAnother}>
          Log Another
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ flex: 1, color: 'var(--color-primary)', borderColor: 'rgba(249,115,22,0.2)' }}
          onClick={() => navigate('/history')}
        >
          View History
        </button>
      </div>
    </div>
  )
}
