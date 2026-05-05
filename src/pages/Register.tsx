import { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("Passwords não coincidem")
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/chat")
    } catch (err) {
      console.error(err)
      setError("Erro ao criar conta")
    }

    setLoading(false)
  }

  return (
    <div className="container mt-4">
      <h2>Registo</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleRegister}>
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

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Confirmar Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "A criar..." : "Criar conta"}
        </button>
      </form>

      <p className="mt-3">
        Já tens conta? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register