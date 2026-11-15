import { useEffect, useRef } from 'react'

export function ConfidenceBar({ value, color = 'var(--accent-blue)' }) {
  const barRef = useRef(null)
  const pct = Math.round(value * 100)

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = '0%'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          barRef.current.style.width = pct + '%'
        })
      })
    }
  }, [pct])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Confidence</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color }}>{pct}%</span>
      </div>
      <div
        style={{
          background: 'var(--bg-input)',
          borderRadius: '6px',
          height: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: color,
            borderRadius: '6px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            width: '0%',
          }}
        />
      </div>
    </div>
  )
}