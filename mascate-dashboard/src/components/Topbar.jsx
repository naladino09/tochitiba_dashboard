function Topbar() {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1.2rem 2rem',
        borderBottom:
          '1.5px solid var(--outline-variant)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: '900',
            color: 'var(--on-surface)',
            fontSize: '2rem'
          }}
        >
          Dashboard General
        </h1>

        <p
          style={{
            color: 'var(--on-bg-muted)',
            marginTop: '0.3rem'
          }}
        >
          Mesa Autónoma SPA y Cannábica
        </p>
      </div>

      <div
        style={{
          background: 'var(--surface-mid)',
          padding: '0.8rem 1rem',
          borderRadius: 'var(--radius-md)',
          color: 'var(--violet)',
          fontWeight: '700'
        }}
      >
        👤 Nicolás
      </div>
    </div>
  )
}

export default Topbar