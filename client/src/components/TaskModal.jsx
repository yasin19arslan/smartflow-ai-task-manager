import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'


const TaskModal = ({ isOpen, onClose, newTask, setNewTask, onAdd }) => {
  if (!isOpen) return null 
  const [category, setCategory] = useState('İş')

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      <div className='bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-8 shadow-2xl'>
        <h2 className='text-2xl font-bold mb-6 text-white'>
          Yeni Görev Oluştur
        </h2>
        <form onSubmit={onAdd} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-400 mb-1'>
              Başlık
            </label>
            <input
              type='text'
              required
              className='w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500'
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-400 mb-1'>
              Açıklama
            </label>
            <textarea
              className='w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white h-24 focus:outline-none'
              value={newTask.description}
              onChange={e =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className='bg-slate-700 text-white p-2 rounded-lg mb-4'
          >
            <option value='İş'>İş</option>
            <option value='Ders'>Ders</option>
            <option value='Hobi'>Hobi</option>
          </select>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition'
            >
              İptal
            </button>
            <button
              type='submit'
              className='flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-500 transition'
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
