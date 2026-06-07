import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { searchLifts } from '../data/known-lifts'
import { LIFT_STANDARDS } from '../data/strength-standards'
import { calcE1RM } from '../utils/e1rm'
import { getRankResult } from '../utils/ranking'
import CategoryModal from './CategoryModal'
import RankResult from './RankResult'

export default function LiftLogger({ profile, onEntry }) {
  const navigate = useNavigate()
  const [liftName, setLiftName] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedLift, setSelectedLift] = useState(null) // { name, category, isKnownLift }
  const [showModal, setShowModal] = useState(false)
  const [pendingCustomName, setPendingCustomName] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  function handleLiftInput(value) {
    setLiftName(value)
    setSelectedLift(null)
    setResult(null)
    if (value.trim().length < 1) { setSuggestions([]); return }
    const matches = searchLifts(value)
    setSuggestions(matches)
  }

  function selectKnownLift(lift) {
    setLiftName(lift.name)
    setSelectedLift({ name: lift.name, category: lift.category, isKnownLift: true })
    setSuggestions([])
  }

  function requestCustomLift() {
    setPendingCustomName(liftName.trim())
    setShowModal(true)
    setSuggestions([])
  }

  function confirmCategory(category) {
    setSelectedLift({ name: pendingCustomName, category, isKnownLift: false })
    setLiftName(pendingCustomName)
    setShowModal(false)
  }

  const liftHint = selectedLift?.isKnownLift
    ? LIFT_STANDARDS[selectedLift.name]?.hint ?? null
    : null

  const canSubmit =
    selectedLift &&
    Number(weightKg) > 0 &&
    Number(reps) > 0 &&
    Number.isInteger(Number(reps))

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return

    const e1rm = calcE1RM(Number(weightKg), Number(reps))
    const rankResult = getRankResult(
      e1rm,
      profile,
      selectedLift.name,
      selectedLift.category,
      selectedLift.isKnownLift,
    )

    const entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      liftName: selectedLift.name,
      category: selectedLift.category,
      isKnownLift: selectedLift.isKnownLift,
      weightKg: Number(weightKg),
      reps: Number(reps),
      sets: sets ? Number(sets) : null,
      e1rm: rankResult.e1rm,
      rank: rankResult.rank,
      bwRatio: rankResult.bwRatio,
    }

    onEntry(entry)
    setResult({ rankResult, entry })
  }

  function handleLogAnother() {
    setLiftName('')
    setSelectedLift(null)
    setSuggestions([])
    setWeightKg('')
    setReps('')
    setSets('')
    setResult(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className="screen">
      {/* Nav */}
      <nav className="nav">
        <a href="/log" className="nav-logo">LIFT<span>R</span></a>
        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="View history"
            onClick={() => navigate('/history')}
            title="History"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>
            </svg>
          </button>
          <button
            className="icon-btn"
            aria-label="Edit profile"
            onClick={() => navigate('/setup')}
            title="Profile settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </nav>

      {result ? (
        <RankResult
          result={result.rankResult}
          liftName={result.entry.liftName}
          weightKg={result.entry.weightKg}
          reps={result.entry.reps}
          onLogAnother={handleLogAnother}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Lift name */}
          <div className="field">
            <label className="label" htmlFor="lift-name">Lift Name</label>
            <input
              ref={inputRef}
              id="lift-name"
              className="input"
              type="text"
              autoComplete="off"
              placeholder="e.g. Bench Press, Squat..."
              value={liftName}
              onChange={(e) => handleLiftInput(e.target.value)}
              style={suggestions.length > 0 ? { borderRadius: '8px 8px 0 0' } : {}}
            />

            {/* Autocomplete dropdown */}
            {suggestions.length > 0 && (
              <div style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                overflow: 'hidden',
              }}>
                {suggestions.map((lift) => (
                  <button
                    key={lift.name}
                    type="button"
                    onClick={() => selectKnownLift(lift)}
                    style={{
                      display: 'block', width: '100%', padding: '10px 14px',
                      background: 'none', border: 'none',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-fg)', fontSize: 14, textAlign: 'left',
                      cursor: 'pointer', minHeight: 44,
                    }}
                  >
                    {lift.name}
                  </button>
                ))}
                {liftName.trim() && (
                  <button
                    type="button"
                    onClick={requestCustomLift}
                    style={{
                      display: 'block', width: '100%', padding: '10px 14px',
                      background: 'none', border: 'none',
                      color: 'var(--color-primary)', fontSize: 13, textAlign: 'left',
                      fontStyle: 'italic', cursor: 'pointer', minHeight: 44,
                    }}
                  >
                    + Add "{liftName.trim()}" as custom lift
                  </button>
                )}
              </div>
            )}

            {/* Show "add custom" when no suggestions match */}
            {liftName.trim() && suggestions.length === 0 && !selectedLift && (
              <button
                type="button"
                onClick={requestCustomLift}
                style={{
                  marginTop: 4, background: 'none', border: 'none', padding: 0,
                  color: 'var(--color-primary)', fontSize: 13, fontStyle: 'italic',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                + Add "{liftName.trim()}" as custom lift
              </button>
            )}

            {liftHint && (
              <p style={{ color: 'var(--color-muted)', fontSize: 12, marginTop: 4 }}>{liftHint}</p>
            )}
          </div>

          {/* Weight + Reps + Sets */}
          <div className="input-row">
            <div className="field">
              <label className="label" htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                className="input"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                placeholder="100"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="reps">Reps</label>
              <input
                id="reps"
                className="input"
                type="number"
                inputMode="numeric"
                min="1"
                max="100"
                placeholder="5"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label" htmlFor="sets">Sets</label>
              <input
                id="sets"
                className="input"
                type="number"
                inputMode="numeric"
                min="1"
                max="20"
                placeholder="3"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-accent"
            style={{ marginTop: 8 }}
            disabled={!canSubmit}
          >
            Get Rank
          </button>
        </form>
      )}

      {showModal && (
        <CategoryModal
          liftName={pendingCustomName}
          onSelect={confirmCategory}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
