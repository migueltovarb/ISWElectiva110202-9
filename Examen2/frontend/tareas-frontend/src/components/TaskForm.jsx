import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function TaskForm({ onTaskCreated }) {
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState(false);  // ¡Usa estado, no completado!

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = { titulo, estado };  // envía "estado"
      console.log('Enviando tarea:', newTask);  // para debug
      const response = await axios.post(API_URL, newTask);
      onTaskCreated(response.data);
      setTitulo('');
      setEstado(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          placeholder="Escribe una nueva tarea"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={estado}
          onChange={(e) => setEstado(e.target.checked)}
          id="estado"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="estado" className="text-sm text-gray-700">¿Completado?</label>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Agregar Tarea
      </button>
    </form>
  );
}

export default TaskForm;
