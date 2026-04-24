import Home from './pages/Home'
import About from './pages/About'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <>
      <Home description="Assistente de IA" />
      <About description="Este é um assistente de inteligência artificial desenvolvido para ajudar os usuários a obter informações e realizar tarefas de forma eficiente." />
    </>
  )
}

export default App