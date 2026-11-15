const VARIANTS = {
  success: { bg: 'var(--success-bg)', color: 'var(--success)' },
  warning: { bg: 'var(--warning-bg)', color: 'var(--warning)' },
  danger:  { bg: 'var(--danger-bg)',  color: 'var(--danger)'  },
  info:    { bg: 'rgba(42,155,216,0.12)', color: 'var(--accent-blue)' },
  neutral: { bg: 'var(--bg-input)',   color: 'var(--text-secondary)' },
}

export function Badge({ label, variant = 'info', size = 'md' }) {
  const style = VARIANTS[variant] || VARIANTS.info
  const padding = size === 'lg' ? '6px 16px' : '3px 10px'
  const fontSize = size === 'lg' ? '14px' : '12px'

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        padding,
        borderRadius: '20px',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 600,
        fontSize,
        display: 'inline-block',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </span>
  )
}