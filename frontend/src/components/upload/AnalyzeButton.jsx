import { BsSearch } from 'react-icons/bs'
import { Spinner } from '../ui/Spinner'

export function AnalyzeButton({ onClick, loading, disabled }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {loading ? (
        <Spinner message="Running AI pipeline… this may take a few seconds." />
      ) : (
        <button
          className="btn-primary-custom"
          onClick={onClick}
          disabled={disabled || loading}
          style={{ fontSize: '16px', padding: '14px 36px' }}
        >
          <BsSearch /> Detect Damage
        </button>
      )}
    </div>
  )
}