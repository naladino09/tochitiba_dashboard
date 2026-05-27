import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import BarChartCard from '../components/BarChartCard'
import PieChartCard from '../components/PieChartCard'
import TableCard from '../components/TableCard'

function Dashboard() {
  return (
    <div>
      {/* KPI CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        <StatCard
          title="Usuarios activos"
          value="12,847"
          color="var(--violet)"
        />

        <StatCard
          title="Ingresos"
          value="$84K"
          color="var(--secondary)"
        />

        <StatCard
          title="Conversión"
          value="68%"
          color="var(--primary)"
        />

        <StatCard
          title="Alertas"
          value="23"
          color="var(--pink)"
        />
      </div>

      {/* GRAFICA PRINCIPAL */}
      <ChartCard />

      {/* SEGUNDA FILA */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1rem',
          marginTop: '2rem'
        }}
      >
        <BarChartCard />
        <PieChartCard />
      </div>

      {/* ACTIVIDAD Y PROGRESO */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginTop: '2rem'
        }}
      >
        <div
          style={{
            background: 'var(--surface-low)',
            border:
              '1.5px solid var(--outline-variant)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <h2
            style={{
              fontFamily: 'Epilogue',
              color: 'var(--on-surface)',
              marginBottom: '1rem'
            }}
          >
            Actividad reciente
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--on-bg)'
            }}
          >
            <p>🟢 Nuevo usuario registrado</p>
            <p>💰 Nueva venta realizada</p>
            <p>📈 Incremento de tráfico</p>
            <p>⚠️ Alerta del sistema</p>
            <p>🔒 Login detectado</p>
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface-low)',
            border:
              '1.5px solid var(--outline-variant)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem'
          }}
        >
          <h2
            style={{
              fontFamily: 'Epilogue',
              color: 'var(--on-surface)',
              marginBottom: '2rem'
            }}
          >
            Rendimiento mensual
          </h2>

          <Progress
            label="Ventas"
            value="78%"
            color="var(--violet)"
          />

          <Progress
            label="Conversión"
            value="62%"
            color="var(--secondary)"
          />

          <Progress
            label="Usuarios activos"
            value="91%"
            color="var(--primary)"
          />
        </div>
      </div>

      <TableCard />
    </div>
  )
}

function Progress({ label, value, color }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p
        style={{
          marginBottom: '0.5rem',
          color: 'var(--on-bg)'
        }}
      >
        {label}
      </p>

      <div
        style={{
          background: 'var(--surface-mid)',
          height: '12px',
          borderRadius: '999px'
        }}
      >
        <div
          style={{
            width: value,
            background: color,
            height: '100%',
            borderRadius: '999px'
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard