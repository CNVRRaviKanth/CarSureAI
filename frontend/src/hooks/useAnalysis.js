import { useState, useCallback } from 'react'
import { analyzeImage } from '../services/api'

/**
 * Manages the full upload → analyze → result state cycle.
 */
export function useAnalysis() {
  const [file, setFile]         = useState(null)
  const [preview, setPreview]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)

  const selectFile = useCallback((acceptedFile) => {
    setFile(acceptedFile)
    setPreview(URL.createObjectURL(acceptedFile))
    setResult(null)
    setError(null)
  }, [])

  const reset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }, [preview])

  const analyze = useCallback(async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeImage(file)
      setResult(data)
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'An unexpected error occurred. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [file])

  return { file, preview, loading, result, error, selectFile, reset, analyze }
}