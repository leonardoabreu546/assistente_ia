import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const { sessions, currentSessionId, setCurrentSessionId, createNewChat } = useChat();

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: "280px", height: "100vh" }}>
      <div className="p-3">
        <button 
          className="btn btn-outline-primary w-100 mb-3" 
          onClick={createNewChat}
        >
          + Novo Chat
        </button>
      </div>

      <div className="list-group list-group-flush overflow-auto">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => setCurrentSessionId(session.id)}
            className={`list-group-item list-group-item-action py-3 lh-sm ${
              currentSessionId === session.id ? "active" : ""
            }`}
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1 text-truncate" style={{ maxWidth: "180px" }}>
                {session.title}
              </strong>
              <small className={currentSessionId === session.id ? "text-white" : "text-muted"}>
                {new Date(session.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </small>
            </div>
            <div className="small text-truncate" style={{ maxWidth: "200px" }}>
              {session.messages[session.messages.length - 1]?.text || "Sem mensagens"}
            </div>
          </button>
        ))}

        {sessions.length === 0 && (
          <div className="p-3 text-center text-muted small">
            Nenhuma conversa iniciada.
          </div>
        )}
      </div>
    </div>
  );
}