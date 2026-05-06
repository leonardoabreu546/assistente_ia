import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface ChartData {
  name: string;
  messages: number;
}

const TinyBarChart = ({ data }: { data: ChartData[] }) => {
  const chartData = data && data.length > 0 ? data : [
    { name: 'Sem dados', messages: 0 }
  ]

  return (
    // Removendo o ResponsiveContainer e usando largura fixa para teste
    <div className="d-flex justify-content-center w-100">
      <BarChart
        width={500} // Largura fixa para garantir que renderize
        height={250}
        data={chartData}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="messages" fill="#0d6efd" radius={[4, 4, 0, 0]} />
      </BarChart>
    </div>
  );
};

export default TinyBarChart;