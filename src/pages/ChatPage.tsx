import Sidebar from "../components/chat/Sidebar";
import Chat from "../components/chat/Chat";

export default function ChatPage() {
  return (
    <div className="d-flex" style={{ height: "calc(100vh - 56px)" }}> 
      {/* 56px é a altura média do Header do Bootstrap. Ajusta se necessário */}
      
      {/* Barra Lateral fixa à esquerda */}
      <Sidebar />

      {/* Área principal do Chat que ocupa o resto do espaço */}
      <div className="flex-grow-1 overflow-hidden d-flex flex-column">
        <div className="p-3 border-bottom bg-white">
          <h5 className="mb-0">Chat com Assistente IA</h5>
        </div>
        
        <div className="flex-grow-1 overflow-auto p-3">
          <Chat />
        </div>
      </div>
    </div>
  );
}