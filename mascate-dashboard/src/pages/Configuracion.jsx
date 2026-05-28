import { useEffect, useState } from "react";
import "../App.css";

function Configuracion() {
  const [estadoApi, setEstadoApi] = useState("validando");
  const [ultimaRevision, setUltimaRevision] = useState("");
  const [tema, setTema] = useState(() => localStorage.getItem("mascate_tema") || "claro");
  const [actualizacion, setActualizacion] = useState(
    () => localStorage.getItem("mascate_actualizacion") || "manual"
  );
  const [registrosTabla, setRegistrosTabla] = useState(
    () => localStorage.getItem("mascate_registros_tabla") || "10"
  );

  const apiUrl = import.meta.env.VITE_API_URL || "Proxy local /api";

  async function validarConexion() {
    try {
      setEstadoApi("validando");

      const response = await fetch("/api/dashboard/resumen");

      if (!response.ok) {
        throw new Error("No responde la API");
      }

      setEstadoApi("conectado");
    } catch (error) {
      console.error(error);
      setEstadoApi("desconectado");
    } finally {
      setUltimaRevision(new Date().toLocaleString());
    }
  }

  useEffect(() => {
    validarConexion();
  }, []);

  useEffect(() => {
    localStorage.setItem("mascate_tema", tema);
    localStorage.setItem("mascate_actualizacion", actualizacion);
    localStorage.setItem("mascate_registros_tabla", registrosTabla);
  }, [tema, actualizacion, registrosTabla]);

  return (
    <main className="mascate-page">
      <section className="mascate-page-header">
        <div>
          <span className="mascate-badge">Ajustes del sistema</span>
          <h1>Configuración</h1>
          <p>
            Ajustes generales del dashboard, conexión con la API y preferencias
            de visualización.
          </p>
        </div>
      </section>

      <section className="mascate-config-grid">
        <article className="mascate-panel">
          <div className="mascate-panel-header">
            <div>
              <h2>Conexión con la API</h2>
              <p>Estado actual de comunicación entre React y FastAPI.</p>
            </div>
          </div>

          <div className="mascate-config-list">
            <div>
              <span>URL de API</span>
              <strong>{apiUrl}</strong>
            </div>

            <div>
              <span>Estado</span>
              <strong className={`mascate-api-status ${estadoApi}`}>
                {estadoApi}
              </strong>
            </div>

            <div>
              <span>Última revisión</span>
              <strong>{ultimaRevision || "Sin revisar"}</strong>
            </div>
          </div>

          <button className="mascate-button primary" onClick={validarConexion}>
            Probar conexión
          </button>
        </article>

        <article className="mascate-panel">
          <div className="mascate-panel-header">
            <div>
              <h2>Preferencias visuales</h2>
              <p>Opciones básicas para personalizar la vista del dashboard.</p>
            </div>
          </div>

          <div className="mascate-form">
            <label>
              Tema visual
              <select value={tema} onChange={(e) => setTema(e.target.value)}>
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
                <option value="morado">Morado institucional</option>
              </select>
            </label>

            <label>
              Cantidad de registros por tabla
              <select
                value={registrosTabla}
                onChange={(e) => setRegistrosTabla(e.target.value)}
              >
                <option value="5">5 registros</option>
                <option value="10">10 registros</option>
                <option value="20">20 registros</option>
                <option value="50">50 registros</option>
              </select>
            </label>

            <label>
              Actualización de datos
              <select
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
              >
                <option value="manual">Manual</option>
                <option value="30">Cada 30 segundos</option>
                <option value="60">Cada 1 minuto</option>
                <option value="300">Cada 5 minutos</option>
              </select>
            </label>
          </div>
        </article>

        <article className="mascate-panel mascate-wide">
          <div className="mascate-panel-header">
            <div>
              <h2>Alertas recomendadas</h2>
              <p>
                Estas alertas pueden activarse cuando el backend ya consulte la
                base de datos real.
              </p>
            </div>
          </div>

          <div className="mascate-alert-list">
            <article>
              <strong>Usuarios pendientes</strong>
              <p>Detectar usuarios registrados que aún no han sido aprobados.</p>
            </article>

            <article>
              <strong>Actividades sin inscritos</strong>
              <p>Identificar actividades activas que todavía no tienen beneficiarios.</p>
            </article>

            <article>
              <strong>Dispositivos sin actividades</strong>
              <p>Detectar dispositivos creados que aún no tienen programación.</p>
            </article>

            <article>
              <strong>Beneficiarios sin seguimiento</strong>
              <p>Ubicar beneficiarios que no tienen registros recientes.</p>
            </article>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Configuracion;