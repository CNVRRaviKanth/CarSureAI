import { useNavigate } from 'react-router-dom'
import { BsArrowRight, BsShieldCheck } from 'react-icons/bs'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(42,155,216,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="fade-up" style={{ maxWidth: '720px', position: 'relative' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(42,155,216,0.12)',
            color: 'var(--accent-blue)',
            border: '1px solid rgba(42,155,216,0.25)',
            borderRadius: '20px',
            padding: '5px 14px',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: "'Syne', sans-serif",
            marginBottom: '24px',
          }}
        >
          <BsShieldCheck /> AI-Powered Insurance Automation
        </span>

        <h1
          style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          Detect Vehicle Damage{' '}
          <span style={{ color: 'var(--accent-blue)' }}>Instantly</span>
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          Upload a vehicle photo and our AI pipeline detects damage, localises
          the region, and predicts severity — in seconds.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-primary-custom"
            onClick={() => navigate('/analyze')}
            style={{ fontSize: '16px', padding: '14px 32px' }}
          >
            Detect Damage <BsArrowRight />
          </button>
          <a
            href="#pipeline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '14px 28px',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              transition: 'border-color 0.2s',
            }}
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  )
}