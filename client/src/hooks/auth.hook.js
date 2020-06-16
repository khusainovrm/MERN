import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.set(storageName, JSON.stringify(userId, token))
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data) {
      login(data.token, data.userId)
    }
  }, [login])
  return { login, logout, token, userId }
}
