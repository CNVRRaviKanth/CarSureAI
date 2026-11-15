import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120_000,   // 2 min — model inference can be slow on CPU
})

/**
 * Send image file to the full pipeline.
 * @param {File} file
 * @returns {Promise<AnalysisResult>}
 */
export async function analyzeImage(file) {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post('/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

/**
 * Health-check the backend.
 * @returns {Promise<HealthResult>}
 */
export async function healthCheck() {
  const { data } = await api.get('/health')
  return data
}

export default api