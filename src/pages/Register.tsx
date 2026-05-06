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

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("As passwords não coincidem")
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/chat")
    } catch (err) {
      console.error(err)
      setError("Erro ao criar conta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Mesma largura do Login */}
        <div className="col-12 col-md-10 col-lg-8">
          <div className="shadow-sm p-4 p-md-5 bg-white rounded">
            <h2 className="mb-4 fw-bold">Registo</h2>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <input
                  className="form-control py-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Confirmar Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              <button 
                className="btn btn-primary w-100 py-2" 
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" />
                ) : null}
                {loading ? "A criar..." : "Criar conta"}
              </button>
            </form>

            <p className="mt-4 text-center text-muted">
              Já tens conta? <Link to="/login" className="text-decoration-none">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register