import { Link } from "react-router-dom";

export default function HistoryHeader() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold m-0">Histórico</h2>
      <Link to="/chat" className="btn btn-primary btn-sm">Nova conversa</Link>
    </div>
  );
}
