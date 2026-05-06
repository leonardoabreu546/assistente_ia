import { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"

function Login() {
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8"> 
          <div className="shadow-sm p-4 p-md-5 bg-white rounded">
            <h2 className="mb-4 fw-bold">Login</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  className="form-control py-2" // Removido o -sm e adicionado py-2 para mais altura vertical
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control py-2" // Removido o -sm e adicionado py-2 para mais altura vertical
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100 py-2">
                Entrar
              </button>
            </form>

            <p className="mt-4 text-center text-muted">
              Não tens conta? <Link to="/register" className="text-decoration-none">Registar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login