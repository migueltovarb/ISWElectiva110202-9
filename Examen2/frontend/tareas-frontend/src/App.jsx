import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState([])

  // TaskForm crea nueva tarea
  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-4xl text-center text-gray-800 font-bold mb-6 pb-2">
        Lista de Tareas
      </h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  )
}

export default App
