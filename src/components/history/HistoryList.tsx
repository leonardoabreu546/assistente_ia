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
          createdAt={chat.createdAt}
          lastMessage={chat.messages?.at(-1)?.text}
        />
      ))}
    </div>
  );
}