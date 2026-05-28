const API_URL = import.meta.env.VITE_API_URL || "";

const mockData = {
  resumen: {
    total_usuarios: 25,
    total_dispositivos: 6,
    total_beneficiarios: 14,
    total_prescriptores: 5,
    total_actividades: 10,
    total_inscripciones: 22,
    total_seguimientos: 18,
  },

  dispositivos: [
    {
      id: 1,
      nombre: "Casa Cultural Techotiba",
      localidad: "Kennedy",
      tipo_servicio: "Cultura",
      capacidad: 40,
      actividades: 3,
    },
    {
      id: 2,
      nombre: "Huerta Comunitaria MASCATE",
      localidad: "Bosa",
      tipo_servicio: "Ambiental",
      capacidad: 30,
      actividades: 2,
    },
    {
      id: 3,
      nombre: "Escuela Popular de Artes",
      localidad: "Fontibón",
      tipo_servicio: "Educativo",
      capacidad: 35,
      actividades: 4,
    },
  ],

  actividades: [
    {
      id: 1,
      nombre: "Taller de pintura",
      tipo: "Arte",
      lugar: "Casa Cultural Techotiba",
      dia_semana: "Lunes",
      hora: "3:00 PM",
      activa: true,
    },
    {
      id: 2,
      nombre: "Entrenamiento deportivo",
      tipo: "Deporte",
      lugar: "Parque comunitario",
      dia_semana: "Miércoles",
      hora: "4:00 PM",
      activa: true,
    },
    {
      id: 3,
      nombre: "Huerta urbana",
      tipo: "Ambiental",
      lugar: "Huerta Comunitaria",
      dia_semana: "Sábado",
      hora: "9:00 AM",
      activa: true,
    },
  ],

  actividadesPorTipo: [
    { tipo: "Arte", total: 4 },
    { tipo: "Deporte", total: 3 },
    { tipo: "Ambiental", total: 2 },
    { tipo: "Educación", total: 1 },
  ],

  beneficiariosLocalidad: [
    { localidad: "Kennedy", total: 6 },
    { localidad: "Bosa", total: 4 },
    { localidad: "Fontibón", total: 3 },
    { localidad: "Engativá", total: 1 },
  ],

  seguimientos: [
    {
      id: 1,
      beneficiario: "Laura",
      prescriptor: "Carlos Ramírez",
      tipo_registro: "Asistencia",
      observaciones: "Participó activamente en el taller.",
      fecha: "2026-05-28",
    },
    {
      id: 2,
      beneficiario: "Miguel",
      prescriptor: "Ana Torres",
      tipo_registro: "Proceso",
      observaciones: "Requiere seguimiento en la próxima actividad.",
      fecha: "2026-05-28",
    },
  ],

  usuarios: [
    {
      id: 1,
      email: "admin@mascate.org",
      rol: "admin",
      estado: "activo",
      email_verificado: true,
      fecha_registro: "2026-05-01",
    },
    {
      id: 2,
      email: "prescriptor1@mascate.org",
      rol: "prescriptor",
      estado: "activo",
      email_verificado: true,
      fecha_registro: "2026-05-05",
    },
    {
      id: 3,
      email: "prescriptor2@mascate.org",
      rol: "prescriptor",
      estado: "pendiente",
      email_verificado: false,
      fecha_registro: "2026-05-10",
    },
    {
      id: 4,
      email: "beneficiario1@mascate.org",
      rol: "beneficiario",
      estado: "activo",
      email_verificado: true,
      fecha_registro: "2026-05-12",
    },
    {
      id: 5,
      email: "beneficiario2@mascate.org",
      rol: "beneficiario",
      estado: "activo",
      email_verificado: false,
      fecha_registro: "2026-05-14",
    },
    {
      id: 6,
      email: "dispositivo@mascate.org",
      rol: "dispositivo",
      estado: "activo",
      email_verificado: true,
      fecha_registro: "2026-05-16",
    },
  ],
};

async function request(endpoint, fallback) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error al consultar ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`Usando datos ficticios para ${endpoint}`, error);
    return fallback;
  }
}

export const mascateApi = {
  getResumen: () => request("/api/dashboard/resumen", mockData.resumen),
  getDispositivos: () =>
    request("/api/dashboard/dispositivos", mockData.dispositivos),
  getActividades: () =>
    request("/api/dashboard/actividades", mockData.actividades),
  getActividadesPorTipo: () =>
    request("/api/dashboard/actividades-por-tipo", mockData.actividadesPorTipo),
  getBeneficiariosPorLocalidad: () =>
    request(
      "/api/dashboard/beneficiarios-localidad",
      mockData.beneficiariosLocalidad
    ),
  getSeguimientos: () =>
    request("/api/dashboard/seguimientos", mockData.seguimientos),
  getUsuarios: () => request("/api/dashboard/usuarios", mockData.usuarios),
};