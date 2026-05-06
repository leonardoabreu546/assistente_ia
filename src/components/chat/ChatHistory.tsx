import ReactMarkdown from 'react-markdown';
import ChartLine from "../dashboard/ChartLine";

interface Message {
  type: string;
  text: string;
}

interface ChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatHistory({ messages, isLoading }: ChatHistoryProps) {
  return (
    <div className="border p-3 mb-3 chat-container" style={{ minHeight: "300px", overflowY: "auto" }}>
      {messages.map((msg, i) => (
        <div key={i} className="mb-2 d-flex">
          <ChartLine
            // Se for IA, aplica o Markdown. Se for usuário, envia o texto puro.
            text={msg.type === "ai" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            userName={msg.type === "user" ? "Você" : "IA"}
            align={msg.type === "user" ? "end" : "start"}
          />
        </div>
      ))}

      {isLoading && (
        <div className="mb-2 d-flex">
          <div className="me-auto text-start text-break d-block" style={{ maxWidth: "70%" }}>
            <strong>IA:</strong> <em>Pensando...</em>
          </div>
        </div>
      )}
    </div>
  );
}