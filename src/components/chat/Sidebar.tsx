import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const { sessions, currentSessionId, setCurrentSessionId, createNewChat, deleteChat } = useChat();

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: "260px", height: "100vh" }}>
      <div className="p-3">
        <button className="btn btn-primary w-100" onClick={createNewChat}>
          + Novo Chat
        </button>
      </div>

      <div className="list-group list-group-flush overflow-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => setCurrentSessionId(session.id)}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
              currentSessionId === session.id ? "active" : ""
            }`}
            style={{ cursor: "pointer", padding: "12px 15px" }}
          >
            <span className="text-truncate" style={{ maxWidth: "80%" }}>
              {session.title}
            </span>
            
            {/* Botão de apagar minimalista */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Apagar?")) deleteChat(session.id);
              }}
              className="btn btn-sm p-0 border-0 opacity-50 hover-opacity-100"
              style={{ color: currentSessionId === session.id ? "white" : "red", fontSize: "1.2rem" }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}