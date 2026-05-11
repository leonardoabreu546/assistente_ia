import React, { type ReactNode } from "react"; 

type ChatLineProps = {
  text: ReactNode // Alterado de string para ReactNode
  userName: string
  align?: "start" | "end"
}

export default function ChatLine({
  text,
  userName,
  align = "start",
}: ChatLineProps) {
  const isEnd = align === "end"

  return (
    <div
      className={`d-block text-break ${
        isEnd ? "ms-auto text-end" : "me-auto text-start"
      }`}
      style={{ maxWidth: "70%" }}
    >
      <strong>{userName}:</strong> <div>{text}</div>
    </div>
  )
}