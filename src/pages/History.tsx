import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebaseConfig"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"

export default function History() {
  const [chats, setChats] = useState([])
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
      }))

      setChats(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
      </div>
    )
  }

  if (chats.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <p>Nenhuma conversa encontrada.</p>
        <a href="/chat" className="btn btn-primary">
          Iniciar nova conversa
        </a>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2>Histórico</h2>

      <div className="list-group">

        {chats.map(chat => (
          <div key={chat.id} className="list-group-item">

            <div className="d-flex justify-content-between">
              <div>
                <h6>Conversa</h6>

                <small className="text-muted">
                  {chat.createdAt?.toDate?.().toLocaleString()}
                </small>
              </div>

              <a
                href={`/chat?id=${chat.id}`}
                className="btn btn-sm btn-outline-primary"
              >
                Abrir
              </a>
            </div>

            {chat.messages?.length > 0 && (
              <div className="mt-2 text-muted small">
                {chat.messages.at(-1)?.text?.slice(0, 60)}
              </div>
            )}

          </div>
        ))}

      </div>

      <div className="text-center mt-4">
        <a href="/chat" className="btn btn-primary">
          Nova conversa
        </a>
      </div>
    </div>
  )
}