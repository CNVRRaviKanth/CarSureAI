import { BsArrowDown } from 'react-icons/bs'

const STEPS = [
  { num: '01', label: 'Upload Image',          desc: 'Drag & drop or select a vehicle photo' },
  { num: '02', label: 'Damage Classification', desc: 'MobileNetV3 checks for visible damage' },
  { num: '03', label: 'Damage Localisation',   desc: 'YOLOv8 draws bounding boxes on the damage' },
  { num: '04', label: 'Region Crop',           desc: 'Largest damage region is cropped out' },
  { num: '05', label: 'Severity Prediction',   desc: 'EfficientNet-B0 rates Minor / Moderate / Severe' },
  { num: '06', label: 'Assessment Report',     desc: 'Full results with confidence scores returned' },
]

export function PipelineSection() {
  return (
    <section id="pipeline" style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>How It Works</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '56px' }}>
          From photo upload to damage report in one request.
        </p>

        {STEPS.map((step, i) => (
          <div key={i}>
            <div
              className="card-surface"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px 24px',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '22px',
                  color: 'var(--accent-blue)',
                  minWidth: '42px',
                  opacity: 0.7,
                }}
              >
                {step.num}
              </span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px' }}>
                  {step.label}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
                  {step.desc}
                </div>
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0', color: 'var(--border)' }}>
                <BsArrowDown size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}