import React from "react";

interface ChatContainerProps {
  title: string;
  children: React.ReactNode; // Isso permite colocar componentes dentro dele
}

export default function ChatContainer({ title, children }: ChatContainerProps) {
  return (
    <div className="container mt-4">
      <h2>{title}</h2>
      {children}
    </div>
  );
}