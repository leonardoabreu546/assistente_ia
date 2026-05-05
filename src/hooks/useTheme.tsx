import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme === 'dark' 
      ? 'bg-dark text-white' 
      : 'bg-light text-dark'
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}
