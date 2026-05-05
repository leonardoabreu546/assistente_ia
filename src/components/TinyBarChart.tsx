import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TinyBarChart = ({ data }) => {
  const chartData = data && data.length > 0 ? data : [
    { name: 'Sem dados', messages: 0 }
  ]

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarChart
        width={300}
        height={150}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="messages" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TinyBarChart;