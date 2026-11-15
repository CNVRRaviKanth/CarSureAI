import { Link } from 'react-router-dom'
import { BsCameraFill } from 'react-icons/bs'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'var(--text-primary)',
        }}
      >
        <img
          src="/logo.png"
          alt="DamageVision Logo"
          style={{ height: '36px', width: 'auto' }}
        />
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', marginLeft: '2px' }}>
          DamageVision
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/analyze" style={{ fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>
          Analyze
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar