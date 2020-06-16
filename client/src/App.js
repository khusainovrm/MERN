import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'

function App() {
  const { token, userId, login, logout } = useAuth
  const routes = useRoutes(false)
  return (
    <Router>
      <div className="container">{routes}</div>
    </Router>
  )
}

export default App
