import { BsCheckCircleFill, BsExclamationTriangleFill } from 'react-icons/bs'
import { ConfidenceBar } from './ConfidenceBar'

export function ClassificationCard({ classification, hasDamage }) {
  const isDamaged = hasDamage
  const icon = isDamaged
    ? <BsExclamationTriangleFill size={28} color="var(--danger)" />
    : <BsCheckCircleFill size={28} color="var(--success)" />

  const accentColor = isDamaged ? 'var(--danger)' : 'var(--success)'
  const bgColor     = isDamaged ? 'var(--danger-bg)' : 'var(--success-bg)'

  return (
    <div className="card-surface" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span
          style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {icon}
        </span>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>Module 1 · Classification</p>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: accentColor }}>
            {isDamaged ? 'Damage Detected' : 'No Damage Found'}
          </h3>
        </div>
      </div>
      <ConfidenceBar value={classification.confidence} color={accentColor} />
    </div>
  )
}