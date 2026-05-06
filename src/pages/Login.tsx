import { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import AuthCard from "../components/auth/AuthCard"
import LoginForm from "../components/auth/LoginForm"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/chat")
    } catch (error) {
      console.error("Erro ao entrar:", error)
    }
  }

  return (
    <AuthCard title="Login">
      <LoginForm 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    </AuthCard>
  )
}