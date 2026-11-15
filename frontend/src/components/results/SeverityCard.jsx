import { ConfidenceBar } from './ConfidenceBar'

const SEVERITY_CONFIG = {
  minor: {
    label: '🟢 Minor Damage',
    color: 'var(--success)',
    bg: 'var(--success-bg)',
    desc: 'Light surface damage. Low repair cost expected.',
  },
  moderate: {
    label: '🟠 Moderate Damage',
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
    desc: 'Visible structural damage. Moderate repair likely.',
  },
  severe: {
    label: '🔴 Severe Damage',
    color: 'var(--danger)',
    bg: 'var(--danger-bg)',
    desc: 'Significant damage detected. High repair cost expected.',
  },
}

export function SeverityCard({ severity }) {
  if (!severity) return null

  const cfg = SEVERITY_CONFIG[severity.level] || SEVERITY_CONFIG.minor

  return (
    <div className="card-surface" style={{ padding: '24px' }}>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
        Module 3 · Severity Prediction
      </p>

      <div
        style={{
          background: cfg.bg,
          borderRadius: '12px',
          padding: '18px 20px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: cfg.color, marginBottom: '6px' }}>
          {cfg.label}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{cfg.desc}</p>
      </div>

      <ConfidenceBar value={severity.confidence} color={cfg.color} />
    </div>
  )
}