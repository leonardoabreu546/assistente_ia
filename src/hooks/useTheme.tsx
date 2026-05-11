import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    // Aplica as classes do Bootstrap diretamente para não teres de configurar CSS
    if (theme === 'dark') {
      document.body.classList.remove('bg-light', 'text-dark')
      document.body.classList.add('bg-dark', 'text-white')
    } else {
      document.body.classList.remove('bg-dark', 'text-white')
      document.body.classList.add('bg-light', 'text-dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}