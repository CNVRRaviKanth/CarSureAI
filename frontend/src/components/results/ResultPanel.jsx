import { ClassificationCard } from './ClassificationCard'
import { LocalizationCard } from './LocalizationCard'
import { SeverityCard } from './SeverityCard'
import { BsCheckCircleFill } from 'react-icons/bs'

export function ResultPanel({ result }) {
  if (!result) return null

  return (
    <div className="fade-up" style={{ marginTop: '32px' }}>
      {/* Summary banner */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <BsCheckCircleFill color="var(--success)" size={18} />
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          {result.message}
        </p>
      </div>

      {/* Module cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ClassificationCard classification={result.classification} hasDamage={result.has_damage} />
        {result.has_damage && <LocalizationCard localization={result.localization} />}
        {result.has_damage && result.severity && <SeverityCard severity={result.severity} />}
      </div>
    </div>
  )
}