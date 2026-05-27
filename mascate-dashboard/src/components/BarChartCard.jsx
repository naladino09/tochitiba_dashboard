import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { mes: 'Ene', usuarios: 120 },
  { mes: 'Feb', usuarios: 210 },
  { mes: 'Mar', usuarios: 180 },
  { mes: 'Abr', usuarios: 300 },
]

function BarChartCard() {
  return (
    <div
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        height: '350px',
        flex: 1
      }}
    >
      <h2>Usuarios por mes</h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="usuarios"
            fill="#e8a800"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartCard