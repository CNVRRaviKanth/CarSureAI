export function Spinner({ size = 40, message = 'Analysing…' }) {
  return (
    <div className="text-center py-4">
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid var(--border)`,
          borderTopColor: 'var(--accent-blue)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
          margin: '0 auto 12px',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{message}</p>
    </div>
  )
}