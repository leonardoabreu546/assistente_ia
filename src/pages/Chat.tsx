import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { db, auth } from "../firebase/firebaseConfig"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
const apiKey = import.meta.env.API_AI

const genAI = new GoogleGenerativeAI(apiKey)

function Chat() {
  const [prompt, setPrompt] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

  async function sendToAI(history) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      })

      const input = history.map(m => m.text).join("\n")

      const result = await model.generateContent(input)
      const text = result.response.text()

      setChatHistory(prev => [...prev, { type: "ia", text }])

    } catch (error) {
      console.error("Erro Gemini:", error)

      setChatHistory(prev => [
        ...prev,
        { type: "error", text: "Erro na IA (ver consola)" }
      ])
    }

    setLoading(false)
  }

  // 🔥 AQUI É A MUDANÇA PRINCIPAL
  async function saveToFirestore(messages) {
    const user = auth.currentUser
    if (!user) return

    await setDoc(doc(db, "chats", user.uid), {
      userId: user.uid,
      messages,
      updatedAt: serverTimestamp()
    }, { merge: true })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!prompt.trim() || loading) return

    const userMessage = { type: "user", text: prompt }
    const updated = [...chatHistory, userMessage]

    setPrompt("")
    setLoading(true)
    setChatHistory(updated)

    sendToAI(updated)

    saveToFirestore(updated).catch(err =>
      console.log("Erro Firestore:", err)
    )
  }

  return (
    <div className="container mt-4">
      <h2>Chat com Assistente IA</h2>

      <div className="border p-3 mb-3 chat-container">

        {chatHistory.map((msg, i) => (
          <div key={i} className="mb-2 d-flex">

            {msg.type === "user" ? (
              <div className="ms-auto text-end text-break d-block" style={{ maxWidth: "70%" }}>
                <strong>Você:</strong> {msg.text}
              </div>
            ) : (
              <div className="me-auto text-start text-break d-block" style={{ maxWidth: "70%" }}>
                <strong>IA:</strong> {msg.text}
              </div>
            )}

          </div>
        ))}

        {loading && (
          <div className="mb-2 d-flex">
            <div className="me-auto text-start text-break d-block" style={{ maxWidth: "70%" }}>
              <strong>IA:</strong> <em>Pensando...</em>
            </div>
          </div>
        )}

      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">

          <input
            className="form-control"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite sua mensagem..."
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Pensando..." : "Enviar"}
          </button>

        </div>
      </form>
    </div>
  )
}

export default Chat

