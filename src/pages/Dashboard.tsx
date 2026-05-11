import { useState, useEffect } from "react"
import { auth } from "../firebase/firebaseConfig"
import { useChat } from "../components/context/ChatContext"
import type { User } from "firebase/auth"
import StatCard from "../components/dashboard/StatCard"
import ActivityCard from "../components/dashboard/ActivityCard"
import LoginPrompt from "../components/auth/LoginPrompt"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import DashboardStatsGrid from "../components/dashboard/DashboardStatsGrid"

interface ChartData {
  name: string;
  messages: number;
}

export default function Dashboard() {
  const { sessions } = useChat();
  const [user, setUser] = useState<User | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const messagesByDay: Record<string, number> = Object.fromEntries(days.map(d => [d, 0]))

    sessions.forEach(session => {
      const date = session.lastActivity;
      const day = days[date.getDay()]
      
      // Filtro consistente: apenas mensagens do utilizador
      const userMessagesCount = session.messages.filter(m => m.type === "user").length
      messagesByDay[day] += userMessagesCount
    })

    setChartData(days.map(day => ({ name: day, messages: messagesByDay[day] })))
  }, [sessions])

  // --- CÁLCULOS CORRIGIDOS ---
  
  const totalChats = sessions.length

  // Agora o Card também filtra apenas as mensagens do utilizador (igual ao gráfico)
  const totalMessages = sessions.reduce((acc, s) => 
    acc + s.messages.filter(m => m.type === "user").length, 0
  )

  const lastActivityDate = sessions.length > 0 
    ? new Date(Math.max(...sessions.map(s => s.lastActivity.getTime())))
    : null

  return (
    <div className="container mt-4">
      <DashboardHeader />

      <DashboardStatsGrid>
        <StatCard title="Conversas" value={totalChats} variant="primary" />
        
        {/* Este valor agora bate certo com a soma das barras do gráfico */}
        <StatCard title="Mensagens Enviadas" value={totalMessages} variant="success" />
        
        <StatCard 
          title="Última atividade" 
          value={lastActivityDate ? lastActivityDate.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Sem atividade"} 
          variant="info" 
        />
        
        <ActivityCard data={chartData} />
      </DashboardStatsGrid>

      {!user && <LoginPrompt />}
    </div>
  )
}