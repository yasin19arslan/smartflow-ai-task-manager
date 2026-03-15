import { useState, useEffect } from 'react'
import axios from 'axios'
import { LayoutDashboard, PlusCircle } from 'lucide-react'
import TaskCard from './components/TaskCard.jsx'
import TaskModal from './components/TaskModal.jsx'

function App () {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })

  
  const addTask = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks/add',
        newTask
      )
      setTasks([...tasks, res.data])
      setIsModalOpen(false)
      setNewTask({ title: '', description: '', priority: 'medium' }) 
    } catch (err) {
      console.error('Ekleme hatası:', err)
    }
  }
  //Görev silme kısmı
  const deleteTask = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`)
      setTasks(tasks.filter(task => task._id !== id))
    } catch (error) {
      console.error('Silme hatası:', err)
    }
  }
  //Görev güncelleme kısmı
  const toggleComplete = async task => {
    try {
      const newStatus = task.status === 'completed' ? 'todo' : 'completed'
      const res = await axios.put(
        `http://localhost:5000/api/tasks/update/${task._id}`,
        {
          status: newStatus
        }
      )

      setTasks(tasks.map(t => (t._id === task._id ? res.data : t)))
    } catch (err) {
      console.error('Güncelleme hatası:', err)
    }
  }
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks/all')
      setTasks(res.data)
    } catch (err) {
      console.error('Veri çekme hatası:', err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className='min-h-screen bg-[#0f172a] p-6 md:p-12'>
      <div className='max-w-4xl mx-auto'>
        <header className='flex justify-between items-center mb-12 border-b border-slate-800 pb-6'>
          <div className='flex items-center gap-3'>
            <LayoutDashboard className='text-blue-500' size={32} />
            <h1 className='text-3xl font-extrabold text-white'>
              SmartFlow <span className='text-blue-500'>AI</span>
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition'
          >
            <PlusCircle size={20} /> Yeni Görev
          </button>
        </header>

        <div className='grid gap-4'>
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleComplete}
            />
          ))}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newTask={newTask}
          setNewTask={setNewTask}
          onAdd={addTask}
        />
      </div>
    </div>
  )
}

export default App
