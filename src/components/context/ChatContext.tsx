import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
}

interface ChatContextType {
  sessions: ChatSession[];
  currentSessionId: string | null;
  createNewChat: () => void;
  sendMessage: (text: string) => void;
  addAIResponse: (text: string) => void;
  setCurrentSessionId: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado tentando carregar do LocalStorage
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("chat_sessions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Converte strings de data de volta para objetos Date (essencial para o TS e Dashboard)
        return parsed.map((s: any) => ({
          ...s,
          lastActivity: new Date(s.lastActivity),
          messages: s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }))
        }));
      } catch (e) {
        console.error("Erro ao carregar sessões:", e);
        return [];
      }
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Salva no LocalStorage sempre que houver mudanças nas sessões
  useEffect(() => {
    localStorage.setItem("chat_sessions", JSON.stringify(sessions));
  }, [sessions]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat: ChatSession = {
      id: newId,
      title: `Conversa ${sessions.length + 1}`,
      messages: [],
      lastActivity: new Date(),
    };
    setSessions([newChat, ...sessions]);
    setCurrentSessionId(newId);
  };

  const sendMessage = (text: string) => {
    const newMessage: Message = { type: 'user', text, timestamp: new Date() };

    if (!currentSessionId) {
      const newId = Date.now().toString();
      const newChat: ChatSession = {
        id: newId,
        title: text.substring(0, 30) + "...", 
        messages: [newMessage],
        lastActivity: new Date(),
      };
      setSessions([newChat, ...sessions]);
      setCurrentSessionId(newId);
    } else {
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage],
            lastActivity: new Date()
          };
        }
        return session;
      }));
    }
  };

  const addAIResponse = (text: string) => {
    const aiMessage: Message = { type: 'ai', text, timestamp: new Date() };

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, aiMessage],
          lastActivity: new Date()
        };
      }
      return session;
    }));
  };

  return (
    <ChatContext.Provider value={{ 
      sessions, 
      currentSessionId, 
      createNewChat, 
      sendMessage, 
      addAIResponse, 
      setCurrentSessionId 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat deve ser usado dentro de um ChatProvider");
  }
  return context;
};