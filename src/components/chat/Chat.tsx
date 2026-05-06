import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useChat } from "../context/ChatContext"; // Importar Contexto
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_AI);

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Pegamos os dados e a função de adicionar resposta do contexto
  const { sessions, currentSessionId, addAIResponse } = useChat();

  // Encontrar a sessão atual para mostrar as mensagens no ChatHistory
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const chatHistory = currentSession ? currentSession.messages : [];

  async function sendToAI(messageText: string) {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Criamos um histórico simples para a IA entender o contexto da conversa atual
      const contextHistory = chatHistory.map(m => m.text).join("\n");
      const input = `${contextHistory}\n${messageText}`;
      
      const result = await model.generateContent(input);
      const text = result.response.text();
      
      // Guardar resposta da IA no Contexto
      addAIResponse(text);
    } catch (error: any) {
      console.error("Erro na IA:", error);
      const isQuotaError = error.message?.includes("429") || error.message?.includes("quota");
      const errorMessage = isQuotaError 
        ? "Limite diário atingido." 
        : "Erro ao contactar a IA.";
      
      addAIResponse(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Monitorizar quando uma nova mensagem do utilizador entra no contexto para disparar a IA
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage && lastMessage.type === 'user' && !loading) {
      sendToAI(lastMessage.text);
    }
  }, [chatHistory]);

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