function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: 'var(--surface-low)',
        border:
          '1.5px solid var(--outline-variant)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow:
          '0 2px 12px var(--shadow-surface)'
      }}
    >
      <p
        style={{
          color: 'var(--on-bg-muted)',
          fontSize: '0.9rem',
          marginBottom: '1rem',
          fontWeight: '600'
        }}
      >
        {title}
      </p>

      <h1
        style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: '900',
          fontSize: '2.7rem',
          color: color
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: 'var(--secondary)',
          fontWeight: '600',
          marginTop: '1rem'
        }}
      >
        ↑ +12% este mes
      </p>
    </div>
  )
}

export default StatCard