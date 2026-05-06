import { useState, useEffect } from "react"
import { auth } from "../firebase/firebaseConfig"
import { useChat } from "../components/context/ChatContext" // Importar o nosso hook
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
  const { sessions } = useChat(); // Pegar os dados globais
  const [user, setUser] = useState<User | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])

  // Monitorar Autenticação
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribeAuth()
  }, [])

  // Processar dados para o gráfico sempre que as sessões mudarem
  useEffect(() => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const messagesByDay: Record<string, number> = Object.fromEntries(days.map(d => [d, 0]))

    sessions.forEach(session => {
      // Usamos a data da última atividade ou do timestamp da mensagem
      const date = session.lastActivity;
      const day = days[date.getDay()]
      
      // Contamos apenas mensagens do utilizador para o gráfico de produtividade
      const userMessagesCount = session.messages.filter(m => m.type === "user").length
      messagesByDay[day] += userMessagesCount
    })

    setChartData(days.map(day => ({ name: day, messages: messagesByDay[day] })))
  }, [sessions])

  // Cálculos rápidos baseados no contexto
  const totalChats = sessions.length
  const totalMessages = sessions.reduce((acc, s) => acc + s.messages.length, 0)
  const lastActivityDate = sessions.length > 0 
    ? new Date(Math.max(...sessions.map(s => s.lastActivity.getTime())))
    : null

  return (
    <div className="container mt-4">
      <DashboardHeader />

      <DashboardStatsGrid>
        <StatCard title="Conversas" value={totalChats} variant="primary" />
        <StatCard title="Mensagens Total" value={totalMessages} variant="success" />
        <StatCard 
          title="Última atividade" 
          value={lastActivityDate ? lastActivityDate.toLocaleString('pt-PT') : "Sem atividade"} 
          variant="info" 
        />
        <ActivityCard data={chartData} />
      </DashboardStatsGrid>

      {!user && <LoginPrompt />}
    </div>
  )
}