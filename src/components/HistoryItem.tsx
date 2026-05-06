import { Link } from "react-router-dom";

interface HistoryItemProps {
  id: string;
  createdAt: any;
  lastMessage?: string;
}

export default function HistoryItem({ id, createdAt, lastMessage }: HistoryItemProps) {
  return (
    <div className="list-group-item shadow-sm mb-2 border-0 rounded">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0">Conversa</h6>
          <small className="text-muted">
            {createdAt?.toDate?.().toLocaleString() || "Data desconhecida"}
          </small>
        </div>
        <Link to={`/chat?id=${id}`} className="btn btn-sm btn-outline-primary">
          Abrir
        </Link>
      </div>
      {lastMessage && (
        <div className="mt-2 text-muted small text-truncate" style={{ maxWidth: '90%' }}>
          {lastMessage.slice(0, 60)}...
        </div>
      )}
    </div>
  );
}