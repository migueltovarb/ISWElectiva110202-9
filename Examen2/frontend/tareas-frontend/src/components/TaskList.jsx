import { useState } from 'react'
import axios from 'axios'

function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tareas/${id}/`)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const startEditing = (task) => {
    setEditingId(task.id)
    setEditingText(task.titulo)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  const saveEditing = async (id) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/tareas/${id}/`, {
        titulo: editingText
      })
      setTasks(tasks.map(task => task.id === id ? response.data : task))
      setEditingId(null)
      setEditingText('')
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const toggleCompleted = async (task) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/tareas/${task.id}/`, {
        estado: !task.estado  
      })
      setTasks(tasks.map(t => t.id === task.id ? response.data : t))
    } catch (error) {
      console.error('Error toggling completion:', error)
    }
  }

  return (
    <div className="mt-6">
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No hay tareas aún.</p>
      )}
      <ul className="space-y-4">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white shadow-sm rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={task.estado}  
                onChange={() => toggleCompleted(task)}
                className="w-5 h-5 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <div>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                ) : (
                  <span className={`text-lg block ${
                    task.estado ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}>
                    {task.titulo}
                  </span>
                )}
                <span className={`text-sm font-medium ${
                  task.estado ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {task.estado ? 'Completado' : 'Pendiente'}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0">
              {editingId === task.id ? (
                <>
                  <button
                    onClick={() => saveEditing(task.id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
