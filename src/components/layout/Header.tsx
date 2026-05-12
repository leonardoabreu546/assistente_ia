import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useTheme } from '../../hooks/useTheme'

function Header() {
  const [user, setUser] = useState<User | null>(null)
  const { theme, toggleTheme } = useTheme()
  
  // 1. Criar o estado para o menu (false = fechado)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe() 
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsMenuOpen(false) // Fechar menu ao fazer logout
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Assistente IA</Link>
        
        {/* 2. Alterar o botão: remover data-bs e adicionar onClick */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 3. Adicionar a classe 'show' dinamicamente se isMenuOpen for true */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat" onClick={() => setIsMenuOpen(false)}>Chat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history" onClick={() => setIsMenuOpen(false)}>Histórico</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={() => setIsMenuOpen(false)}>Registar</Link>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-2">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

            <li className="nav-item ms-lg-3">
              <button 
                className={`btn btn-sm ${theme === 'dark' ? 'btn-warning' : 'btn-primary'}`}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header