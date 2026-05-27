import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div
      style={{
        width: '270px',
        background: 'var(--surface-low)',
        borderRight:
          '1.5px solid var(--outline-variant)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <h1
        style={{
          fontFamily: 'Epilogue, sans-serif',
          color: 'var(--violet)',
          fontWeight: '900',
          marginBottom: '2rem'
        }}
      >
        MASCATE
      </h1>

      <Link style={linkStyle} to="/">
        📊 Dashboard
      </Link>

      <Link style={linkStyle} to="/usuarios">
        👥 Usuarios
      </Link>

      <Link style={linkStyle} to="/reportes">
        📈 Reportes
      </Link>

      <Link style={linkStyle} to="/configuracion">
        ⚙️ Configuración
      </Link>
    </div>
  )
}

const linkStyle = {
  background: 'var(--surface-mid)',
  padding: '1rem',
  borderRadius: 'var(--radius-md)',
  textDecoration: 'none',
  color: 'var(--tertiary)',
  fontWeight: '600',
  transition: '0.2s'
}

export default Sidebar