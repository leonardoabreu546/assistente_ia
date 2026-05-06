// src/components/StatCard.tsx
interface StatCardProps {
  title: string;
  value: string | number;
  variant?: "primary" | "success" | "info" | "warning";
}

export default function StatCard({ title, value, variant = "primary" }: StatCardProps) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card text-center h-100 shadow-sm border-0">
        <div className="card-body d-flex flex-column justify-content-center p-4">
          <h6 className="text-muted mb-2 text-uppercase small fw-bold">{title}</h6>
          <div className={`fs-4 fw-bold text-${variant}`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}