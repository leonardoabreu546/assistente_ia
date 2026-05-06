import React from "react";
import { useChat } from "../context/ChatContext"; // Importamos o nosso Hook

interface ChatInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ prompt, setPrompt, isLoading }: ChatInputProps) {
  const { sendMessage } = useChat(); // Ligação ao Contexto

  const handleLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      sendMessage(prompt); // Envia para o estado global (Contexto)
      setPrompt(""); // Limpa o input local
    }
  };

  return (
    <form onSubmit={handleLocalSubmit}>
      <div className="input-group">
        <input
          className="form-control"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Pensando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}