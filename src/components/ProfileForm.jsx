import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseExperienceMonths } from '../utils/parse-experience'

export default function ProfileForm({ existingProfile, onSave }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    sex: existingProfile?.sex ?? 'male',
    age: existingProfile?.age ?? '',
    weightKg: existingProfile?.weightKg ?? '',
    heightCm: existingProfile?.heightCm ?? '',
    experienceText: existingProfile
      ? `${existingProfile.experienceMonths} months`
      : '',
  })
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const errs = {}
    if (!form.age || Number(form.age) <= 0) errs.age = 'Enter a valid age'
    if (!form.weightKg || Number(form.weightKg) <= 0) errs.weightKg = 'Enter a valid weight'
    if (!form.heightCm || Number(form.heightCm) <= 0) errs.heightCm = 'Enter a valid height'
    if (!form.experienceText.trim()) errs.experienceText = 'Enter your training experience'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({
      sex: form.sex,
      age: Number(form.age),
      weightKg: Number(form.weightKg),
      heightCm: Number(form.heightCm),
      experienceMonths: parseExperienceMonths(form.experienceText),
    })
    navigate('/log')
  }

  return (
    <div className="screen">
      <div className="app-logo" style={{ marginBottom: 4 }}>
        LIFT<span>RANK</span>
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
            <label className="label" htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              className="input"
              type="number"
              inputMode="decimal"
              min="20"
              max="300"
              placeholder="e.g. 82"
              value={form.weightKg}
              onChange={(e) => set('weightKg', e.target.value)}
            />
            {errors.weightKg && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.weightKg}</p>}
          </div>
          <div className="field">
            <label className="label" htmlFor="height">Height (cm)</label>
            <input
              id="height"
              className="input"
              type="number"
              inputMode="numeric"
              min="100"
              max="250"
              placeholder="e.g. 180"
              value={form.heightCm}
              onChange={(e) => set('heightCm', e.target.value)}
            />
            {errors.heightCm && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.heightCm}</p>}
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
