import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
      <div>
        <h1 style={{ fontSize: '80px', fontWeight: 800, color: 'var(--accent-blue)', lineHeight: 1 }}>404</h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', margin: '16px 0 28px' }}>Page not found.</p>
        <button className="btn-primary-custom" onClick={() => navigate('/')}>Go Home</button>
      </div>
    </main>
  )
}

export default NotFound