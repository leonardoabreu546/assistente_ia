import React from "react";

interface ChatInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function ChatInput({ prompt, setPrompt, onSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          className="form-control"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
        />
        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Pensando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}