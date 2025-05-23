// components/AuditLogs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/audit-logs/')
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error fetching audit logs:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registros de Auditoría</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Usuario</th>
            <th className="border px-4 py-2">Acción</th>
            <th className="border px-4 py-2">Producto</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{log.user}</td>
              <td className="border px-4 py-2">{log.action}</td>
              <td className="border px-4 py-2">{log.product ? log.product.name : '—'}</td>
              <td className="border px-4 py-2">
                {(log.action === 'ENTRADA_PRODUCTO' || log.action === 'SALIDA_PRODUCTO') ? log.quantity : '—'}
              </td>
              <td className="border px-4 py-2">{log.description}</td>
              <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;
