import { useState, useCallback } from 'react'
export const useHttp = () => {
  const [loading, setLoaing] = useState(false)
  const [error, setError] = useState(null)
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoaing(true)
      try {
        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }

        setLoaing(false)

        return data
      } catch (e) {
        setLoaing(false)
        setError(e.message)
        throw e
      }
    },
    []
  )

  const clearError = () => setError(null)

  return { loading, error, request, clearError }
}
