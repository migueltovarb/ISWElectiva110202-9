// src/api/auditlog.api.js

import axios from "axios";

const AUDITLOG_API_URL = "http://127.0.0.1:8000/auditlogs/";

export async function getAuditLogs() {
  try {
    const response = await axios.get(AUDITLOG_API_URL);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error detallado del backend:", error.response.data);
    } else if (error.request) {
      console.error("No hubo respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    return [];
  }
}
