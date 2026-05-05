import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebaseConfig"
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
import TinyBarChart from "../components/TinyBarChart"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalChats: 0,
    totalMessages: 0,
    lastActivity: null
  })

  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = auth.currentUser
    setUser(currentUser)

    if (!currentUser) {
      setLoading(false)
      return
    }

    const q = query(
      collection(db, "chats"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => doc.data())

      const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
      const messagesByDay = Object.fromEntries(days.map(d => [d, 0]))

      let totalMessages = 0

      chats.forEach(chat => {
        const messages = chat.messages || []
        totalMessages += messages.length

        const date = chat.createdAt?.toDate?.() || new Date()
        const day = days[date.getDay()]

        messagesByDay[day] += messages.filter(m => m.type === "user").length
      })

      setStats({
        totalChats: chats.length,
        totalMessages,
        lastActivity: chats[0]?.createdAt?.toDate?.() || null
      })

      setChartData(
        days.map(day => ({
          name: day,
          messages: messagesByDay[day]
        }))
      )

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

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Conversas</h5>
              <h3 className="text-primary">{stats.totalChats}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Mensagens</h5>
              <h3 className="text-success">{stats.totalMessages}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Última atividade</h5>
              <p className="text-info">
                {stats.lastActivity
                  ? new Date(stats.lastActivity).toLocaleString()
                  : "Sem atividade"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="card">
            <div className="card-body text-center">
              <h5>Atividade semanal</h5>
              <TinyBarChart data={chartData} />
            </div>
          </div>
        </div>

      </div>

      {/* Botões de login e registo no fim da página */}
      {!user && (
        <div className="text-center mt-5">
          <p>Para aceder ao Dashboard, faça login ou registe-se:</p>
          <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link to="/register" className="btn btn-success mx-2">Registo</Link>
        </div>
      )}

    </div>
  )
}