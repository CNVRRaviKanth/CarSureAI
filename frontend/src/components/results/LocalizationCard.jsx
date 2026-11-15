import { BsBoundingBox } from 'react-icons/bs'

export function LocalizationCard({ localization }) {
  if (!localization) return null

  return (
    <div className="card-surface" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span
          style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(245,166,35,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <BsBoundingBox size={24} color="var(--accent-amber)" />
        </span>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>Module 2 · Localisation</p>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
            {localization.boxes_count} Region{localization.boxes_count !== 1 ? 's' : ''} Detected
          </h3>
        </div>
      </div>

      {localization.annotated_image && (
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', alignSelf: 'flex-start' }}>Annotated image</p>
          <img
            src={localization.annotated_image}
            alt="Damage localisation with bounding boxes"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
          />
        </div>
      )}

      {localization.cropped_image && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', alignSelf: 'flex-start' }}>Largest damage region (crop)</p>
          <img
            src={localization.cropped_image}
            alt="Cropped damage region"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
          />
        </div>
      )}
    </div>
  )
}