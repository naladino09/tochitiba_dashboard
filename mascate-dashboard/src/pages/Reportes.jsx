import { useEffect, useMemo, useState } from "react";
import { mascateApi } from "../services/mascateApi";
import "../App.css";

function BarChart({ data, labelKey, valueKey }) {
  const maxValue = Math.max(...data.map((item) => Number(item[valueKey]) || 0), 1);

  if (!data.length) {
    return <p className="mascate-empty">No hay datos disponibles.</p>;
  }

  return (
    <div className="mascate-bar-chart">
      {data.map((item, index) => {
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
      })}
    </div>
  );
}

function ReportCard({ title, description, children, onMoveUp, onMoveDown }) {
  return (
    <article className="mascate-report-card">
      <div className="mascate-report-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="mascate-report-actions">
          <button onClick={onMoveUp}>↑</button>
          <button onClick={onMoveDown}>↓</button>
        </div>
      </div>

      {children}
    </article>
  );
}

function Reportes() {
  const [resumen, setResumen] = useState(null);
  const [dispositivos, setDispositivos] = useState([]);
  const [actividadesPorTipo, setActividadesPorTipo] = useState([]);
  const [beneficiariosLocalidad, setBeneficiariosLocalidad] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [reportesOrden, setReportesOrden] = useState(() => {
    const guardados = localStorage.getItem("mascate_reportes_orden");
    return guardados
      ? JSON.parse(guardados)
      : [
          "actividades_tipo",
          "beneficiarios_localidad",
          "capacidad_dispositivos",
          "usuarios_rol",
          "resumen_general",
        ];
  });

  const [reportesVisibles, setReportesVisibles] = useState(() => {
    const guardados = localStorage.getItem("mascate_reportes_visibles");
    return guardados
      ? JSON.parse(guardados)
      : {
          actividades_tipo: true,
          beneficiarios_localidad: true,
          capacidad_dispositivos: true,
          usuarios_rol: true,
          resumen_general: true,
        };
  });

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
        console.error("Error cargando reportes:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  useEffect(() => {
    localStorage.setItem("mascate_reportes_orden", JSON.stringify(reportesOrden));
    localStorage.setItem(
      "mascate_reportes_visibles",
      JSON.stringify(reportesVisibles)
    );
  }, [reportesOrden, reportesVisibles]);

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

  const reportesDisponibles = {
    actividades_tipo: {
      titulo: "Actividades por tipo",
      descripcion: "Cantidad de actividades agrupadas por categoría.",
      componente: (
        <BarChart
          data={actividadesPorTipo}
          labelKey="tipo"
          valueKey="total"
        />
      ),
    },

    beneficiarios_localidad: {
      titulo: "Beneficiarios por localidad",
      descripcion: "Distribución territorial de beneficiarios registrados.",
      componente: (
        <BarChart
          data={beneficiariosLocalidad}
          labelKey="localidad"
          valueKey="total"
        />
      ),
    },

    capacidad_dispositivos: {
      titulo: "Capacidad por dispositivo",
      descripcion: "Capacidad disponible en cada dispositivo comunitario.",
      componente: (
        <BarChart
          data={capacidadDispositivos}
          labelKey="nombre"
          valueKey="capacidad"
        />
      ),
    },

    usuarios_rol: {
      titulo: "Usuarios por rol",
      descripcion: "Cantidad de usuarios según su rol dentro del sistema.",
      componente: <BarChart data={usuariosPorRol} labelKey="rol" valueKey="total" />,
    },

    resumen_general: {
      titulo: "Resumen general del sistema",
      descripcion: "Indicadores principales del dashboard MASCATE.",
      componente: (
        <div className="mascate-report-summary">
          <article>
            <span>Usuarios</span>
            <strong>{resumen?.total_usuarios || 0}</strong>
          </article>
          <article>
            <span>Dispositivos</span>
            <strong>{resumen?.total_dispositivos || 0}</strong>
          </article>
          <article>
            <span>Beneficiarios</span>
            <strong>{resumen?.total_beneficiarios || 0}</strong>
          </article>
          <article>
            <span>Actividades</span>
            <strong>{resumen?.total_actividades || 0}</strong>
          </article>
          <article>
            <span>Inscripciones</span>
            <strong>{resumen?.total_inscripciones || 0}</strong>
          </article>
          <article>
            <span>Seguimientos</span>
            <strong>{resumen?.total_seguimientos || 0}</strong>
          </article>
        </div>
      ),
    },
  };

  function cambiarVisibilidad(id) {
    setReportesVisibles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function moverReporte(id, direccion) {
    setReportesOrden((prev) => {
      const nuevoOrden = [...prev];
      const index = nuevoOrden.indexOf(id);
      const nuevoIndex = direccion === "arriba" ? index - 1 : index + 1;

      if (nuevoIndex < 0 || nuevoIndex >= nuevoOrden.length) {
        return prev;
      }

      [nuevoOrden[index], nuevoOrden[nuevoIndex]] = [
        nuevoOrden[nuevoIndex],
        nuevoOrden[index],
      ];

      return nuevoOrden;
    });
  }

  function restaurarReportes() {
    setReportesOrden([
      "actividades_tipo",
      "beneficiarios_localidad",
      "capacidad_dispositivos",
      "usuarios_rol",
      "resumen_general",
    ]);

    setReportesVisibles({
      actividades_tipo: true,
      beneficiarios_localidad: true,
      capacidad_dispositivos: true,
      usuarios_rol: true,
      resumen_general: true,
    });
  }

  function exportarVista() {
    window.print();
  }

  if (cargando) {
    return (
      <main className="mascate-page">
        <h1>Reportes</h1>
        <p>Cargando reportes...</p>
      </main>
    );
  }

  return (
    <main className="mascate-page">
      <section className="mascate-page-header">
        <div>
          <span className="mascate-badge">Reportes dinámicos</span>
          <h1>Reportes de analítica</h1>
          <p>
            Selecciona qué reportes quieres ver y organiza el orden de
            visualización.
          </p>
        </div>

        <div className="mascate-header-actions">
          <button onClick={restaurarReportes}>Restaurar</button>
          <button className="primary" onClick={exportarVista}>
            Exportar / imprimir
          </button>
        </div>
      </section>

      <section className="mascate-report-config">
        <h2>Seleccionar reportes visibles</h2>

        <div className="mascate-report-options">
          {reportesOrden.map((id) => (
            <label key={id}>
              <input
                type="checkbox"
                checked={reportesVisibles[id]}
                onChange={() => cambiarVisibilidad(id)}
              />
              {reportesDisponibles[id].titulo}
            </label>
          ))}
        </div>
      </section>

      <section className="mascate-report-grid">
        {reportesOrden
          .filter((id) => reportesVisibles[id])
          .map((id) => (
            <ReportCard
              key={id}
              title={reportesDisponibles[id].titulo}
              description={reportesDisponibles[id].descripcion}
              onMoveUp={() => moverReporte(id, "arriba")}
              onMoveDown={() => moverReporte(id, "abajo")}
            >
              {reportesDisponibles[id].componente}
            </ReportCard>
          ))}
      </section>
    </main>
  );
}

export default Reportes;