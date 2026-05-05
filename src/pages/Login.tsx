import { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/chat")
    } catch {
      // Pode mostrar mensagem de erro se quiser, mas não obrigatório
    }
  }

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Entrar</button>
      </form>

      <p className="mt-3">
        Não tens conta? <Link to="/register">Registar</Link>
      </p>
    </div>
  )
}

export default Login