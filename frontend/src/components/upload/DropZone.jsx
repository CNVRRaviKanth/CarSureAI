import { useDropzone } from 'react-dropzone'
import { BsCloudUpload } from 'react-icons/bs'

export function DropZone({ onFile, disabled }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    disabled,
    onDrop: (accepted) => {
      if (accepted.length > 0) onFile(accepted[0])
    },
  })

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? 'var(--accent-blue)' : 'var(--border)'}`,
        borderRadius: '16px',
        background: isDragActive ? 'rgba(42,155,216,0.06)' : 'var(--bg-input)',
        padding: '56px 24px',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input {...getInputProps()} />
      <BsCloudUpload
        size={44}
        style={{ color: isDragActive ? 'var(--accent-blue)' : 'var(--text-muted)', marginBottom: '16px' }}
      />
      <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '16px', marginBottom: '6px' }}>
        {isDragActive ? 'Drop the image here…' : 'Drag & drop a vehicle image'}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
        or <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>click to browse</span> · JPG, PNG, WebP · max 10 MB
      </p>
    </div>
  )
}