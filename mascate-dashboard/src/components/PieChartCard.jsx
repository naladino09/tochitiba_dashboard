import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Activos', value: 400 },
  { name: 'Inactivos', value: 100 },
  { name: 'Pendientes', value: 200 },
]

const COLORS = ['#7c5cbf', '#ff6b9e', '#2a7f62']

function PieChartCard() {
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
      <h2>Estado usuarios</h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartCard