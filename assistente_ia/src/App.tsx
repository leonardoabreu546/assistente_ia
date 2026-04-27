import Home from './pages/Home'
import About from './pages/About'
import Footer from './components/Footer'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home description="Assistente de IA"/>} />
        <Route path="/about" element={<About description="Este é um assistente de inteligência artificial desenvolvido para ajudar os usuários a obter informações e realizar tarefas de forma eficiente."/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App