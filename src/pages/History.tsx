import { useChat } from "../components/context/ChatContext";
import EmptyHistory from "../components/history/EmptyHistory";
import HistoryHeader from "../components/history/HistoryHeader";
import HistoryList from "../components/history/HistoryList";

export default function History() {
  // Consumimos as sessões diretamente do nosso Contexto (LocalStorage)
  const { sessions } = useChat();

  // Se não houver sessões, mostra o estado vazio
  if (sessions.length === 0) {
    return (
      <div className="container mt-4">
        <HistoryHeader />
        <EmptyHistory />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <HistoryHeader />
      {/* Passamos as sessões do contexto para a lista */}
      <HistoryList chats={sessions} />
    </div>
  );
}