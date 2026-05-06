import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebaseConfig"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { Link } from "react-router-dom"

// Importação dos componentes
import LoadingScreen from "../components/LoadingScreen"
import EmptyHistory from "../components/EmptyHistory"
import HistoryItem from "../components/HistoryItem"

// Interface para corrigir erros de TypeScript
interface ChatHistory {
  id: string;
  userId: string;
  messages: { type: string; text: string }[];
  createdAt?: any;
}

export default function History() {
  const [chats, setChats] = useState<ChatHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = auth.currentUser

    if (!user) {
      setChats([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, "chats"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatHistory[]

      setChats(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <LoadingScreen />
  if (chats.length === 0) return <EmptyHistory />

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Histórico</h2>
        <Link to="/chat" className="btn btn-primary btn-sm">Nova conversa</Link>
      </div>

      <div className="list-group list-group-flush">
        {chats.map(chat => (
          <HistoryItem 
            key={chat.id}
            id={chat.id}
            createdAt={chat.createdAt}
            lastMessage={chat.messages?.at(-1)?.text}
          />
        ))}
      </div>
    </div>
  )
}