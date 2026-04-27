import Home from './pages/Home'
import About from './pages/About'
import Chat from './pages/Chat'
import Footer from './assets/components/Footer'
import Header from './assets/components/Header'
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
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App