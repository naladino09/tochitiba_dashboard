import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Ene', ventas: 400 },
  { name: 'Feb', ventas: 700 },
  { name: 'Mar', ventas: 500 },
  { name: 'Abr', ventas: 900 },
  { name: 'May', ventas: 1200 },
]

function ChartCard() {
  return (
    <div
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        marginTop: '2rem',
        height: '400px'
      }}
    >
      <h2>Ventas mensuales</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#7c5cbf"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartCard