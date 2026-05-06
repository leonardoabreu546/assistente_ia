import { Link } from "react-router-dom";

interface LoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({ email, setEmail, password, setPassword, onSubmit }: LoginFormProps) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            className="form-control py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 py-2">Entrar</button>
      </form>
      <p className="mt-4 text-center text-muted">
        Não tens conta? <Link to="/register" className="text-decoration-none">Registar</Link>
      </p>
    </>
  );
}