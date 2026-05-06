import React from "react";
import Chat from "../components/chat/Chat";
import ChatContainer from "../components/chat/ChatContainer";

export default function ChatPage() {
  return (
    <ChatContainer title="Chat com Assistente IA">
      <Chat />
    </ChatContainer>
  );
}