import TinyBarChart from "./TinyBarChart";

interface ActivityCardProps {
  data: any[];
}

export default function ActivityCard({ data }: ActivityCardProps) {
  return (
    <div className="col-12 mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-body text-center p-4">
          <h5 className="card-title mb-4">Atividade semanal</h5>
          <div>
            <TinyBarChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}