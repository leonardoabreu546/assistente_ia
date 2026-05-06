import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebaseConfig"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import LoadingScreen from "../components/layout/LoadingScreen"
import EmptyHistory from "../components/history/EmptyHistory"
import HistoryHeader from "../components/history/HistoryHeader"
import HistoryList from "../components/history/HistoryList"

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
      <HistoryHeader />
      <HistoryList chats={chats} />
    </div>
  )
}