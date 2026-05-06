// src/pages/Home.tsx
import Hero from "../components/layout/Hero";

interface HomeProps {
  description?: string; // O "?" significa que a descrição é opcional
}

export default function Home({ description }: HomeProps) {
  return (
    <div className="container mt-4">
      <Hero 
        title="Assistente IA" 
        description={description || "Bem-vindo ao futuro da conversação inteligente."} 
      />
    </div>
  );
}