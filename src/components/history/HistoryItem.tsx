import { Link } from "react-router-dom";

interface HistoryItemProps {
  id: string;
  title: string;
  createdAt: Date;
  lastMessage?: string;
}

export default function HistoryItem({ id, title, createdAt, lastMessage }: HistoryItemProps) {
  return (
    <div className="list-group-item shadow-sm mb-2 border-0 rounded sidebar-custom">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0">{title || "Conversa"}</h6>
          <small className="text-muted">
            {createdAt instanceof Date 
              ? createdAt.toLocaleString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) 
              : "Data desconhecida"}
          </small>
        </div>
        <Link to={`/chat?id=${id}`} className="btn btn-sm btn-outline-primary">
          Abrir
        </Link>
      </div>
      
      {lastMessage && (
        <div className="mt-2 text-muted small text-truncate" style={{ maxWidth: '90%' }}>
          {lastMessage}
        </div>
      )}
    </div>
  );
}