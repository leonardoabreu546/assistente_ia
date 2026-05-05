import Home from './pages/Home'
import About from './pages/About'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import History from './pages/History'
import Dashboard from './pages/Dashboard'
import Footer from './assets/components/Footer'
import Header from './assets/components/Header'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './styles/responsive.css'

function App() {
  return (
    <>
      <Header/>
      <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home description="Assistente de IA"/>} />
        <Route 
          path="/about" 
          element={
            <About description="Este é um assistente de inteligência artificial desenvolvido para ajudar os usuários a obter informações e realizar tarefas de forma eficiente."/>}/>
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App