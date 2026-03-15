import { CheckCircle2, Circle, Trash2, Sparkles } from 'lucide-react'

const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className='group flex flex-col gap-3 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Durum Butonu */}
          <button onClick={() => onToggle(task)} className='focus:outline-none'>
            {task.status === 'completed' ? (
              <CheckCircle2 className='text-emerald-400 w-6 h-6' />
            ) : (
              <Circle className='text-slate-500 w-6 h-6 hover:text-blue-400' />
            )}
          </button>

          <div>
            <h3
              className={`text-lg font-semibold ${
                task.status === 'completed'
                  ? 'line-through text-slate-500'
                  : 'text-slate-100'
              }`}
            >
              {task.title}
            </h3>
            <p className='text-slate-400 text-sm'>{task.description}</p>
          </div>
        </div>

        {/* Silme Butonu */}
        <button
          onClick={() => onDelete(task._id)}
          className='p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all'
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* AI Özet Bölümü */}
      {task.aiNote && (
        <div className='mt-2 flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl'>
          <Sparkles className='text-blue-400 shrink-0 mt-0.5' size={16} />
          <p className='text-xs text-blue-200 leading-relaxed italic'>
            <span className='font-bold not-italic'>AI İpucu:</span>{' '}
            {task.aiNote}
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskCard
