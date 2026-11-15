const STATS = [
  { value: '71.4%',      label: 'Severity Accuracy'    },
  { value: 'mAP 0.40',   label: 'YOLO Localisation'   },
  { value: '3 Modules',  label: 'AI Pipeline Stages'  },
  { value: '<2s',        label: 'Inference Time (GPU)' },
]

export function StatsSection() {
  return (
    <section style={{ padding: '72px 24px' }}>
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        {STATS.map((s, i) => (
          <div key={i} className="card-surface" style={{ padding: '28px 16px' }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '32px',
                fontWeight: 800,
                color: 'var(--accent-blue)',
                marginBottom: '6px',
              }}
            >
              {s.value}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}