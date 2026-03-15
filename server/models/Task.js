const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'todo' },
  priority: { type: String, default: 'medium' },
  aiSummary: { type: String },
  aiNote: { type: String },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', TaskSchema)
