import { TIERS } from '../data/strength-standards'

const TIER_LABELS = {
  beginner: 'Beginner',
  novice: 'Novice',
  intermediate: 'Inter.',
  advanced: 'Advanced',
  elite: 'Elite',
}

export default function TierStrip({ currentRank }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 16 }} role="list" aria-label="Rank tiers">
      {[...TIERS].reverse().map((tier) => {
        const isCurrent = tier === currentRank
        const isDone = TIERS.indexOf(tier) > TIERS.indexOf(currentRank)

        return (
          <div
            key={tier}
            role="listitem"
            aria-current={isCurrent ? 'true' : undefined}
            style={{
              flex: 1,
              padding: '5px 2px',
              borderRadius: 4,
              textAlign: 'center',
              fontFamily: 'var(--font-condensed)',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              background: isCurrent
                ? 'var(--color-primary)'
                : isDone
                ? 'rgba(34,197,94,0.15)'
                : 'var(--color-card)',
              color: isCurrent
                ? '#0F172A'
                : isDone
                ? 'var(--color-accent)'
                : 'var(--color-dim)',
              border: isDone
                ? '1px solid rgba(34,197,94,0.3)'
                : isCurrent
                ? 'none'
                : '1px solid var(--color-border)',
            }}
          >
            {TIER_LABELS[tier]}
          </div>
        )
      })}
    </div>
  )
}
