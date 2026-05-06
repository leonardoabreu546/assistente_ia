import { Link } from "react-router-dom";

export default function EmptyHistory() {
  return (
    <div className="container mt-4 text-center">
      <p>Nenhuma conversa encontrada.</p>
      <Link to="/chat" className="btn btn-primary">Iniciar nova conversa</Link>
    </div>
  );
}