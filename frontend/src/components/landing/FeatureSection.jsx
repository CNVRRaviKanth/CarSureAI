import { BsEyeFill, BsBoundingBox, BsBarChartFill } from 'react-icons/bs'

const FEATURES = [
  {
    icon: <BsEyeFill size={28} />,
    title: 'Damage Classification',
    desc: 'MobileNetV3 instantly classifies whether a vehicle is damaged or intact with high confidence.',
    color: 'var(--accent-blue)',
    bg: 'rgba(42,155,216,0.10)',
  },
  {
    icon: <BsBoundingBox size={28} />,
    title: 'Damage Localisation',
    desc: 'YOLOv8 object detection pinpoints the exact damaged region with bounding-box precision.',
    color: 'var(--accent-amber)',
    bg: 'rgba(245,166,35,0.10)',
  },
  {
    icon: <BsBarChartFill size={28} />,
    title: 'Severity Prediction',
    desc: 'EfficientNet-B0 classifies damage severity as Minor, Moderate, or Severe from the cropped region.',
    color: 'var(--success)',
    bg: 'rgba(39,174,122,0.10)',
  },
]

export function FeaturesSection() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="text-center mb-5">
        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>
          Three-Stage AI Pipeline
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
          Each module is specialised — together they deliver a complete damage report.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '48px',
        }}
      >
        {FEATURES.map((f, i) => (
          <div key={i} className="card-surface" style={{ padding: '32px' }}>
            <div
              style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: f.bg, color: f.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              {f.icon}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection