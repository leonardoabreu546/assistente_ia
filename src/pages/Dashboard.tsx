import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebaseConfig"
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore"
import type { User } from "firebase/auth"
import StatCard from "../components/StatCard"
import ActivityCard from "../components/ActivityCard"
import LoginPrompt from "../components/LoginPrompt"
import DashboardHeader from "../components/DashboardHeader"
import DashboardStatsGrid from "../components/DashboardStatsGrid"
import LoadingScreen from "../components/LoadingScreen"

interface ChatDoc {
  userId: string;
  messages: { type: string; text: string }[];
  createdAt?: any; 
}

interface ChartData {
  name: string;
  messages: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalChats: 0,
    totalMessages: 0,
    lastActivity: null as Date | null
  })

  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
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

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map(doc => doc.data() as ChatDoc)
        const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
        const messagesByDay: Record<string, number> = Object.fromEntries(days.map(d => [d, 0]))

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

        setChartData(days.map(day => ({ name: day, messages: messagesByDay[day] })))
        setLoading(false)
      })

      return () => unsubscribeSnapshot()
    })

    return () => unsubscribeAuth()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="container mt-4">
      <DashboardHeader />

      <DashboardStatsGrid>
        <StatCard title="Conversas" value={stats.totalChats} variant="primary" />
        <StatCard title="Mensagens" value={stats.totalMessages} variant="success" />
        <StatCard 
          title="Última atividade" 
          value={stats.lastActivity ? stats.lastActivity.toLocaleString() : "Sem atividade"} 
          variant="info" 
        />
        <ActivityCard data={chartData} />
      </DashboardStatsGrid>

      {!user && <LoginPrompt />}
    </div>
  )
}