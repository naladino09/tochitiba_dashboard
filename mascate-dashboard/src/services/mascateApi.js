async function request(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Error al consultar ${endpoint}`);
  }

  return response.json();
}

export const mascateApi = {
  getResumen: () => request("/api/dashboard/resumen"),
  getDispositivos: () => request("/api/dashboard/dispositivos"),
  getActividades: () => request("/api/dashboard/actividades"),
  getActividadesPorTipo: () => request("/api/dashboard/actividades-por-tipo"),
  getBeneficiariosPorLocalidad: () =>
    request("/api/dashboard/beneficiarios-localidad"),
  getSeguimientos: () => request("/api/dashboard/seguimientos"),
  getUsuarios: () => request("/api/dashboard/usuarios"),
};