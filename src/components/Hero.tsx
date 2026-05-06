// src/components/Hero.tsx
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  description?: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <div className="row">
      <div className="col-12 text-center py-5">
        <h1 className="display-4 fw-bold">{title}</h1>
        {description && <p className="lead text-muted">{description}</p>}
        <div className="mt-4">
          <Link to="/chat" className="btn btn-primary btn-lg px-5">
            Começar a Conversar
          </Link>
        </div>
      </div>
    </div>
  );
}