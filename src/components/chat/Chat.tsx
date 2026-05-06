import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_AI);

interface Message {
  type: string;
  text: string;
}

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendToAI(history: Message[]) {
    try {
      // Alterado para 1.5-flash para evitar o limite restrito de 20/dia do 2.0
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const input = history.map((m) => m.text).join("\n");
      const result = await model.generateContent(input);
      const text = result.response.text();
      
      setChatHistory((prev) => [
        ...prev,
        { type: "ia", text },
      ]);
    } catch (error: any) {
      console.error("Erro na IA:", error);
      
      // Verifica se o erro é de quota (429)
      const isQuotaError = error.message?.includes("429") || error.message?.includes("quota");
      const errorMessage = isQuotaError 
        ? "Limite diário atingido. Tenta novamente mais tarde ou muda o modelo." 
        : "Erro ao contactar a IA.";

      setChatHistory((prev) => [
        ...prev,
        { type: "error", text: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function saveToFirestore(messages: Message[]) {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(
        doc(db, "chats", user.uid),
        {
          userId: user.uid,
          messages,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Erro Firestore:", err);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!prompt.trim() || loading) return;

    const updated = [...chatHistory, { type: "user", text: prompt }];
    
    setChatHistory(updated);
    setPrompt("");
    setLoading(true);

    sendToAI(updated);
    saveToFirestore(updated);
  }

  return (
    <>
      <ChatHistory messages={chatHistory} isLoading={loading} />
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </>
  );
}