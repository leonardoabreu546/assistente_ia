import { createContext, useContext, useState, type ReactNode } from 'react';
// Estrutura de uma mensagem individual
interface Message {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Estrutura de uma sessão de chat (o que aparece na lateral)
interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
}

// Definição das funções e estados que o contexto disponibiliza
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
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Função para iniciar um novo chat
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

  // Função para enviar mensagem do utilizador
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

  // Função para adicionar a resposta da IA ao chat atual
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

// Hook personalizado para usar o contexto
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat deve ser usado dentro de um ChatProvider");
  }
  return context;
};