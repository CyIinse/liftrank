const COLORS = {
  beginner:     { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
  novice:       { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  intermediate: { bg: 'rgba(249,115,22,0.15)',  color: '#f97316', border: 'rgba(249,115,22,0.3)' },
  advanced:     { bg: 'rgba(168,85,247,0.15)',  color: '#c084fc', border: 'rgba(168,85,247,0.3)' },
  elite:        { bg: 'rgba(34,197,94,0.15)',   color: '#22c55e', border: 'rgba(34,197,94,0.3)'  },
}

export default function RankBadge({ rank }) {
  const c = COLORS[rank] ?? COLORS.beginner
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 20,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        fontFamily: 'var(--font-condensed)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: 'uppercase',
      }}
    >
      {rank}
    </span>
  )
}
