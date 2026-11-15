import { BsCameraFill } from 'react-icons/bs'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <BsCameraFill color="var(--accent-blue)" size={16} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
          DamageVision AI
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
        AI-powered vehicle damage assessment · Built with PyTorch, YOLOv8 &amp; FastAPI
      </p>
    </footer>
  )
}

export default Footer