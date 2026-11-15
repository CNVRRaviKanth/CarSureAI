import { DropZone } from '../components/upload/DropZone'
import { ImagePreview } from '../components/upload/ImagePreview'
import { AnalyzeButton } from '../components/upload/AnalyzeButton'
import { ResultPanel } from '../components/results/ResultPanel'
import { useAnalysis } from '../hooks/useAnalysis'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { analyzeImage } from '../services/api'

export function AnalyzePage() {
  const { file, preview, loading, result, error, selectFile, reset, analyze } = useAnalysis()

  return (
    <main style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: '10px' }}>
            Vehicle Damage <span style={{ color: 'var(--accent-blue)' }}>Analysis</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Upload a photo of the vehicle and our AI pipeline will assess damage instantly.
          </p>
        </div>

        {/* Upload zone — hide when result is shown */}
        {!result && (
          <>
            {!preview ? (
              <DropZone onFile={selectFile} disabled={loading} />
            ) : (
              <ImagePreview preview={preview} file={file} onReset={reset} />
            )}

            <AnalyzeButton onClick={analyze} loading={loading} disabled={!file} />
          </>
        )}

        {/* Error state */}
        {error && (
          <div
            style={{
              marginTop: '20px',
              background: 'var(--danger-bg)',
              border: '1px solid var(--danger)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <BsExclamationCircleFill color="var(--danger)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--danger)', marginBottom: '4px' }}>Analysis failed</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            <ResultPanel result={result} />

            {/* Analyse another button */}
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button className="btn-primary-custom" onClick={reset}>
                Analyse Another Image
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
export default AnalyzePage