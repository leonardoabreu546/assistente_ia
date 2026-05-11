import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useChat } from "../context/ChatContext";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

// Inicialização da API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_AI);

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Consumo do Contexto
  const { sessions, currentSessionId, addAIResponse } = useChat();

  // Identificação da sessão e histórico atual
  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const chatHistory = currentSession ? currentSession.messages : [];

  /**
   * Envia a mensagem para a API da Google
   */
  async function sendToAI(messageText: string) {
    if (!messageText.trim()) return;

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      // Formatação do histórico para dar contexto à IA
      const contextHistory = chatHistory
        .map((m) => `${m.type === "user" ? "Usuário" : "IA"}: ${m.text}`)
        .join("\n");
      
      const input = `${contextHistory}\nUsuário: ${messageText}`;

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      // Adiciona a resposta da IA ao contexto global
      addAIResponse(text);
    } catch (error: any) {
      console.error("Erro na IA:", error);

      // Tratamento de erros amigável
      const isQuotaError = error.message?.includes("429") || error.message?.includes("quota");
      const errorMessage = isQuotaError
        ? "Limite de mensagens atingido. Tenta novamente em 1 minuto."
        : "Erro ao contactar a IA. Verifica a tua ligação.";

      addAIResponse(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Monitoriza o histórico. 
   * Se a última mensagem for do utilizador, dispara a resposta da IA.
   */
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];

    if (lastMessage && lastMessage.type === "user" && !loading) {
      // Pequeno delay para evitar disparos duplos do StrictMode do React
      const timer = setTimeout(() => {
        sendToAI(lastMessage.text);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [chatHistory.length]); // Dependência pelo comprimento para maior estabilidade

  return (
    <>
      <ChatHistory messages={chatHistory} isLoading={loading} />
      <ChatInput 
        prompt={prompt} 
        setPrompt={setPrompt} 
        isLoading={loading} 
      />
    </>
  );
}