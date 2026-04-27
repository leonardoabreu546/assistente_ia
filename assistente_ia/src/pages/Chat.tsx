import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBN-YG91Omvf17HH10ZjvHor82xZno30PA");

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Adicionar pergunta do usuário ao histórico
    const userMessage = { type: 'user', text: prompt };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    
    setLoading(true);
    setPrompt("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const result = await model.generateContent(prompt);
      const iaResponse = result.response.text();
      
      // Adicionar resposta da IA ao histórico
      const iaMessage = { type: 'ia', text: iaResponse };
      setChatHistory([...newHistory, iaMessage]);
    } catch (error) {
      const errorMessage = { type: 'ia', text: "Error generating content. Check your API key." };
      setChatHistory([...newHistory, errorMessage]);
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="container mt-4">
      <h2>Chat com Assistente IA</h2>
      
      <div className="border p-3 mb-3" style={{height: '300px', overflowY: 'auto'}}>
        {chatHistory.map((message, index) => (
          <div key={index} className="mb-2 d-flex">
            {message.type === 'user' ? (
              <>
                <div className="flex-grow-1"></div>
                <div className="text-end" style={{maxWidth: '70%'}}>
                  <strong>Você:</strong> {message.text}
                </div>
              </>
            ) : (
              <>
                <div style={{maxWidth: '70%'}}>
                  <strong>IA:</strong> {message.text}
                </div>
                <div className="flex-grow-1"></div>
              </>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="mb-2 d-flex">
            <div style={{maxWidth: '70%'}}>
              <strong>IA:</strong> <em>Pensando...</em>
            </div>
            <div className="flex-grow-1"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Pensando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;