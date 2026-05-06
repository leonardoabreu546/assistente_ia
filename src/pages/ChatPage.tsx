import React from "react";
import Chat from "../components/Chat"; // Certifique-se que o componente Chat está nesta pasta
import ChatContainer from "../components/ChatContainer";

export default function ChatPage() {
  return (
    <ChatContainer title="Chat com Assistente IA">
      <Chat />
    </ChatContainer>
  );
}