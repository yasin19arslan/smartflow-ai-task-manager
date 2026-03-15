require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api/tasks', taskRoutes)

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Bağlantısı Başarılı! ✅'))
  .catch(err => console.log('Bağlantı Hatası: ❌', err))

// Test Rotası
app.get('/', (req, res) => {
  res.send('SmartFlow API Çalışıyor!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda ayağa kalktı. 🚀`)
})
