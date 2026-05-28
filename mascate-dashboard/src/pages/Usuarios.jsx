import { useEffect, useMemo, useState } from "react";
import { mascateApi } from "../services/mascateApi";
import "../App.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const data = await mascateApi.getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarUsuarios();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const texto = `${usuario.email || ""} ${usuario.rol || ""} ${
        usuario.estado || ""
      }`.toLowerCase();

      const coincideBusqueda = texto.includes(busqueda.toLowerCase());
      const coincideRol = filtroRol === "todos" || usuario.rol === filtroRol;
      const coincideEstado =
        filtroEstado === "todos" || usuario.estado === filtroEstado;

      return coincideBusqueda && coincideRol && coincideEstado;
    });
  }, [usuarios, busqueda, filtroRol, filtroEstado]);

  const totalActivos = usuarios.filter((u) => u.estado === "activo").length;
  const totalPendientes = usuarios.filter((u) => u.estado === "pendiente").length;
  const totalVerificados = usuarios.filter((u) => u.email_verificado).length;

  const roles = [...new Set(usuarios.map((u) => u.rol).filter(Boolean))];
  const estados = [...new Set(usuarios.map((u) => u.estado).filter(Boolean))];

  if (cargando) {
    return (
      <main className="mascate-page">
        <h1>Usuarios</h1>
        <p>Cargando usuarios...</p>
      </main>
    );
  }

  return (
    <main className="mascate-page">
      <section className="mascate-page-header">
        <div>
          <span className="mascate-badge">Gestión de usuarios</span>
          <h1>Usuarios registrados</h1>
          <p>
            Consulta general de usuarios, roles, estados y verificación de
            correo.
          </p>
        </div>
      </section>

      <section className="mascate-mini-stats">
        <article>
          <span>Total usuarios</span>
          <strong>{usuarios.length}</strong>
        </article>

        <article>
          <span>Activos</span>
          <strong>{totalActivos}</strong>
        </article>

        <article>
          <span>Pendientes</span>
          <strong>{totalPendientes}</strong>
        </article>

        <article>
          <span>Correos verificados</span>
          <strong>{totalVerificados}</strong>
        </article>
      </section>

      <section className="mascate-panel">
        <div className="mascate-filters">
          <input
            type="text"
            placeholder="Buscar por correo, rol o estado..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
            <option value="todos">Todos los roles</option>
            {roles.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div className="mascate-table-wrapper">
          <table className="mascate-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Email verificado</th>
                <th>Fecha registro</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    <strong>{usuario.email}</strong>
                  </td>
                  <td>{usuario.rol || "Sin rol"}</td>
                  <td>
                    <span className={`mascate-status ${usuario.estado || ""}`}>
                      {usuario.estado || "Sin estado"}
                    </span>
                  </td>
                  <td>{usuario.email_verificado ? "Sí" : "No"}</td>
                  <td>{usuario.fecha_registro || "Sin dato"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <p className="mascate-empty">No se encontraron usuarios.</p>
        )}
      </section>
    </main>
  );
}

export default Usuarios;