function TableCard() {
  const users = [
    {
      nombre: 'Carlos',
      estado: 'Activo'
    },
    {
      nombre: 'Ana',
      estado: 'Pendiente'
    },
    {
      nombre: 'Luis',
      estado: 'Inactivo'
    },
  ]

  return (
    <div
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        marginTop: '2rem'
      }}
    >
      <h2>Usuarios recientes</h2>

      <table
        style={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <thead>
          <tr>
            <th align="left">Nombre</th>
            <th align="left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableCard