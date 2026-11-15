import { useTheme } from '../../hooks/useTheme'
import { BsSun, BsMoon } from 'react-icons/bs'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'var(--toggle-track)',
        border: 'none',
        borderRadius: '20px',
        width: '52px',
        height: '28px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: 'var(--accent-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)',
          color: '#fff',
          fontSize: '11px',
        }}
      >
        {theme === 'dark' ? <BsMoon /> : <BsSun />}
      </span>
    </button>
  )
}