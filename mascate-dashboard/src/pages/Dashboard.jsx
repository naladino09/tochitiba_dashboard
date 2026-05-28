import { useEffect, useMemo, useState } from "react";
import { mascateApi } from "../services/mascateApi";
import "../App.css";

function StatCard({ icon, title, value, detail }) {
  return (
    <article className="mascate-stat-card">
      <div className="mascate-stat-icon">{icon}</div>
      <div>
        <p className="mascate-stat-title">{title}</p>
        <h3>{value}</h3>
        <span>{detail}</span>
      </div>
    </article>
  );
}

function BarChart({ title, data, labelKey, valueKey }) {
  const maxValue = Math.max(...data.map((item) => Number(item[valueKey]) || 0), 1);

  return (
    <article className="mascate-panel">
      <div className="mascate-panel-header">
        <div>
          <h2>{title}</h2>
          <p>Distribución según los registros actuales</p>
        </div>
      </div>

      <div className="mascate-bar-chart">
        {data.length === 0 ? (
          <p className="mascate-empty">No hay datos disponibles.</p>
        ) : (
          data.map((item, index) => {
            const value = Number(item[valueKey]) || 0;
            const percentage = Math.round((value / maxValue) * 100);

            return (
              <div className="mascate-bar-row" key={index}>
                <div className="mascate-bar-info">
                  <span>{item[labelKey] || "Sin dato"}</span>
                  <strong>{value}</strong>
                </div>
                <div className="mascate-bar-track">
                  <div
                    className="mascate-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}

function DonutChart({ title, data, labelKey, valueKey }) {
  const total = data.reduce((acc, item) => acc + (Number(item[valueKey]) || 0), 0);

  const gradient = useMemo(() => {
    if (!data.length || total === 0) {
      return "conic-gradient(#e5e7eb 0deg 360deg)";
    }

    const colors = ["#7c3aed", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899"];
    let current = 0;

    const parts = data.map((item, index) => {
      const value = Number(item[valueKey]) || 0;
      const degrees = (value / total) * 360;
      const start = current;
      const end = current + degrees;
      current = end;

      return `${colors[index % colors.length]} ${start}deg ${end}deg`;
    });

    return `conic-gradient(${parts.join(", ")})`;
  }, [data, total, valueKey]);

  return (
    <article className="mascate-panel">
      <div className="mascate-panel-header">
        <div>
          <h2>{title}</h2>
          <p>Participación por categoría</p>
        </div>
      </div>

      <div className="mascate-donut-content">
        <div className="mascate-donut" style={{ background: gradient }}>
          <div className="mascate-donut-center">
            <strong>{total}</strong>
            <span>Total</span>
          </div>
        </div>

        <div className="mascate-legend">
          {data.length === 0 ? (
            <p className="mascate-empty">No hay datos disponibles.</p>
          ) : (
            data.map((item, index) => (
              <div className="mascate-legend-item" key={index}>
                <span
                  className="mascate-legend-dot"
                  style={{
                    backgroundColor: [
                      "#7c3aed",
                      "#22c55e",
                      "#f59e0b",
                      "#ef4444",
                      "#06b6d4",
                      "#ec4899",
                    ][index % 6],
                  }}
                />
                <p>{item[labelKey] || "Sin dato"}</p>
                <strong>{item[valueKey]}</strong>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}

function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [dispositivos, setDispositivos] = useState([]);
  const [actividadesPorTipo, setActividadesPorTipo] = useState([]);
  const [beneficiariosLocalidad, setBeneficiariosLocalidad] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [
          resumenData,
          dispositivosData,
          actividadesTipoData,
          beneficiariosLocalidadData,
          usuariosData,
        ] = await Promise.all([
          mascateApi.getResumen(),
          mascateApi.getDispositivos(),
          mascateApi.getActividadesPorTipo(),
          mascateApi.getBeneficiariosPorLocalidad(),
          mascateApi.getUsuarios(),
        ]);

        setResumen(resumenData);
        setDispositivos(dispositivosData);
        setActividadesPorTipo(actividadesTipoData);
        setBeneficiariosLocalidad(beneficiariosLocalidadData);
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  const usuariosPorRol = useMemo(() => {
    const conteo = {};

    usuarios.forEach((usuario) => {
      const rol = usuario.rol || "sin_rol";
      conteo[rol] = (conteo[rol] || 0) + 1;
    });

    return Object.entries(conteo).map(([rol, total]) => ({
      rol,
      total,
    }));
  }, [usuarios]);

  const capacidadDispositivos = dispositivos.map((item) => ({
    nombre: item.nombre,
    capacidad: item.capacidad || 0,
  }));

  const promedioInscripciones =
    resumen?.total_beneficiarios > 0
      ? (resumen.total_inscripciones / resumen.total_beneficiarios).toFixed(1)
      : 0;

  if (cargando) {
    return (
      <main className="mascate-dashboard">
        <div className="mascate-loading-card">
          <h1>Cargando dashboard MASCATE...</h1>
          <p>Estamos consultando los datos de la API.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mascate-dashboard">
        <div className="mascate-loading-card">
          <h1>Dashboard MASCATE</h1>
          <p className="mascate-error">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mascate-dashboard">
      <section className="mascate-hero">
        <div>
          <span className="mascate-badge">Analítica de datos</span>
          <h1>Dashboard MASCATE</h1>
          <p>
            Resumen visual de usuarios, dispositivos, beneficiarios,
            actividades, inscripciones y seguimientos.
          </p>
        </div>

        <div className="mascate-hero-card">
          <span>Promedio de inscripciones</span>
          <strong>{promedioInscripciones}</strong>
          <p>inscripciones por beneficiario</p>
        </div>
      </section>

      <section className="mascate-stats-grid">
        <StatCard
          icon="👥"
          title="Usuarios"
          value={resumen?.total_usuarios || 0}
          detail="Registrados en el sistema"
        />
        <StatCard
          icon="🏘️"
          title="Dispositivos"
          value={resumen?.total_dispositivos || 0}
          detail="Espacios comunitarios"
        />
        <StatCard
          icon="🌱"
          title="Beneficiarios"
          value={resumen?.total_beneficiarios || 0}
          detail="Participantes registrados"
        />
        <StatCard
          icon="🎯"
          title="Prescriptores"
          value={resumen?.total_prescriptores || 0}
          detail="Facilitadores activos"
        />
        <StatCard
          icon="📋"
          title="Actividades"
          value={resumen?.total_actividades || 0}
          detail="Actividades disponibles"
        />
        <StatCard
          icon="✅"
          title="Inscripciones"
          value={resumen?.total_inscripciones || 0}
          detail="Participaciones registradas"
        />
        <StatCard
          icon="📝"
          title="Seguimientos"
          value={resumen?.total_seguimientos || 0}
          detail="Registros de acompañamiento"
        />
      </section>

      <section className="mascate-grid-two">
        <BarChart
          title="Actividades por tipo"
          data={actividadesPorTipo}
          labelKey="tipo"
          valueKey="total"
        />

        <DonutChart
          title="Beneficiarios por localidad"
          data={beneficiariosLocalidad}
          labelKey="localidad"
          valueKey="total"
        />
      </section>

      <section className="mascate-grid-two">
        <BarChart
          title="Capacidad por dispositivo"
          data={capacidadDispositivos}
          labelKey="nombre"
          valueKey="capacidad"
        />

        <BarChart
          title="Usuarios por rol"
          data={usuariosPorRol}
          labelKey="rol"
          valueKey="total"
        />
      </section>

      <section className="mascate-panel">
        <div className="mascate-panel-header">
          <div>
            <h2>Dispositivos registrados</h2>
            <p>Detalle general de los dispositivos conectados al dashboard</p>
          </div>
        </div>

        <div className="mascate-table-wrapper">
          <table className="mascate-table">
            <thead>
              <tr>
                <th>Dispositivo</th>
                <th>Localidad / lugar</th>
                <th>Tipo de servicio</th>
                <th>Capacidad</th>
                <th>Actividades</th>
              </tr>
            </thead>

            <tbody>
              {dispositivos.map((dispositivo) => (
                <tr key={dispositivo.id}>
                  <td>
                    <strong>{dispositivo.nombre}</strong>
                  </td>
                  <td>
                    {dispositivo.localidad ||
                      dispositivo.lugar_actividades ||
                      "Sin dato"}
                  </td>
                  <td>{dispositivo.tipo_servicio || "Sin dato"}</td>
                  <td>{dispositivo.capacidad || 0}</td>
                  <td>{dispositivo.actividades || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;