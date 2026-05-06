import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from "../firebase/firebaseConfig";
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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const input = history.map((m) => m.text).join("\n");
      const result = await model.generateContent(input);
      const text = result.response.text();
      
      setChatHistory((prev) => [
        ...prev,
        { type: "ia", text },
      ]);
    } catch (error) {
      console.error("Erro na IA:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "error", text: "Erro ao contactar a IA." },
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