import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseExperienceMonths } from '../utils/parse-experience'
import { useUnitsContext } from '../contexts/UnitsContext'
import { weightUnit, heightUnit, kgToDisplay, inputToKg, inToCm, cmToIn } from '../utils/units'
import UnitToggle from './UnitToggle'

export default function ProfileForm({ existingProfile, onSave }) {
  const navigate = useNavigate()
  const { units } = useUnitsContext()

  const [form, setForm] = useState(() => ({
    sex: existingProfile?.sex ?? 'male',
    age: existingProfile?.age ?? '',
    // Store as display value in current unit system at mount time
    weightInput: existingProfile
      ? String(kgToDisplay(existingProfile.weightKg, units))
      : '',
    heightInput: existingProfile
      ? String(units === 'imperial' ? cmToIn(existingProfile.heightCm) : existingProfile.heightCm)
      : '',
    experienceText: existingProfile
      ? `${existingProfile.experienceMonths} months`
      : '',
  }))
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const wUnit = weightUnit(units)
  const hUnit = heightUnit(units)

  function validate() {
    const errs = {}
    if (!form.age || Number(form.age) <= 0) errs.age = 'Enter a valid age'
    if (!form.weightInput || Number(form.weightInput) <= 0) errs.weightInput = 'Enter a valid weight'
    if (!form.heightInput || Number(form.heightInput) <= 0) errs.heightInput = 'Enter a valid height'
    if (!form.experienceText.trim()) errs.experienceText = 'Enter your training experience'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const weightKg = inputToKg(form.weightInput, units)
    const heightCm = units === 'imperial' ? inToCm(form.heightInput) : Number(form.heightInput)

    onSave({
      sex: form.sex,
      age: Number(form.age),
      weightKg,
      heightCm,
      experienceMonths: parseExperienceMonths(form.experienceText),
    })
    navigate('/log')
  }

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div className="app-logo">LIFT<span>RANK</span></div>
        <UnitToggle />
      </div>
      <p style={{ color: 'var(--color-muted)', marginBottom: 28, fontSize: 13 }}>
        {existingProfile ? 'Edit your profile' : 'Set up your profile once to get accurate rankings'}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Sex toggle */}
        <div className="field">
          <span className="label">Sex</span>
          <div role="radiogroup" aria-label="Sex" style={{ display: 'flex', gap: 8 }}>
            {['male', 'female'].map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={form.sex === s}
                onClick={() => set('sex', s)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 'var(--radius-input)',
                  border: form.sex === s ? 'none' : '1px solid var(--color-border)',
                  background: form.sex === s ? 'var(--color-primary)' : 'var(--color-card)',
                  color: form.sex === s ? '#0F172A' : 'var(--color-muted)',
                  fontFamily: 'var(--font-condensed)',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                {s === 'male' ? 'Male' : 'Female'}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div className="field">
          <label className="label" htmlFor="age">Age</label>
          <input
            id="age"
            className="input"
            type="number"
            inputMode="numeric"
            min="10"
            max="100"
            placeholder="e.g. 24"
            value={form.age}
            onChange={(e) => set('age', e.target.value)}
          />
          {errors.age && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.age}</p>}
        </div>

        {/* Weight + Height */}
        <div className="input-row">
          <div className="field">
            <label className="label" htmlFor="weight">
              Weight ({wUnit})
            </label>
            <input
              id="weight"
              className="input"
              type="number"
              inputMode="decimal"
              min="0"
              step={units === 'imperial' ? '1' : '0.5'}
              placeholder={units === 'imperial' ? 'e.g. 180' : 'e.g. 82'}
              value={form.weightInput}
              onChange={(e) => set('weightInput', e.target.value)}
            />
            {errors.weightInput && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.weightInput}</p>}
          </div>
          <div className="field">
            <label className="label" htmlFor="height">
              Height ({hUnit})
            </label>
            <input
              id="height"
              className="input"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              placeholder={units === 'imperial' ? 'e.g. 71' : 'e.g. 180'}
              value={form.heightInput}
              onChange={(e) => set('heightInput', e.target.value)}
            />
            {errors.heightInput && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.heightInput}</p>}
          </div>
        </div>

        {/* Experience */}
        <div className="field">
          <label className="label" htmlFor="experience">Training Experience</label>
          <input
            id="experience"
            className="input"
            type="text"
            placeholder="e.g. 1 year 4 months, 6 months, 3 years"
            value={form.experienceText}
            onChange={(e) => set('experienceText', e.target.value)}
          />
          {errors.experienceText && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.experienceText}</p>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
          {existingProfile ? 'Save Changes' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}
