import HistoryItem from "./HistoryItem";

interface HistoryListProps {
  chats: any[];
}

export default function HistoryList({ chats }: HistoryListProps) {
  return (
    <div className="list-group list-group-flush">
      {chats.map((chat) => (
        <HistoryItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          createdAt={chat.lastActivity} // No nosso contexto usamos lastActivity
          lastMessage={chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1].text : "Sem mensagens"}
        />
      ))}
    </div>
  );
}