import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useTheme } from '../../hooks/useTheme'

function Header() {
  const [user, setUser] = useState(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Assistente IA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">Chat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">Histórico</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            {user && (
              <li className="nav-item me-2">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
            <li className="nav-item">
              <button 
                className={`btn btn-sm ${theme === 'dark' ? 'btn-warning' : 'btn-primary'}`}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header