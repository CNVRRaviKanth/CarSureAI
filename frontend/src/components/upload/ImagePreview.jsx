import { BsXCircleFill } from 'react-icons/bs'

export function ImagePreview({ preview, file, onReset }) {
  if (!preview) return null

  return (
    <div className="card-surface" style={{ padding: '16px', position: 'relative' }}>
      <button
        onClick={onReset}
        aria-label="Remove image"
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--danger)',
          fontSize: '22px',
          zIndex: 2,
          lineHeight: 1,
        }}
      >
        <BsXCircleFill />
      </button>

      <img
        src={preview}
        alt="Uploaded vehicle"
        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '10px' }}
      />

      <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          📄 {file?.name}
        </span>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {file ? (file.size / 1024).toFixed(1) + ' KB' : ''}
        </span>
      </div>
    </div>
  )
}