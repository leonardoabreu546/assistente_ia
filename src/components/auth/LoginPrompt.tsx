import { Link } from "react-router-dom";

export default function LoginPrompt() {
  return (
    <div className="text-center mt-5 p-5 bg-light rounded shadow-sm">
      <p className="text-muted mb-4">Para aceder ao Dashboard completo, faça login ou registe-se:</p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary px-4">Login</Link>
        <Link to="/register" className="btn btn-primary px-4">Registo</Link>
      </div>
    </div>
  );
}