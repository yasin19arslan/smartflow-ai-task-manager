const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function getAISummary (description, category) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    // Kategoriye göre kişilik belirleme
    let personaPrompt = ''
    switch (category) {
      case 'İş':
        personaPrompt =
          'Sen ciddi ve profesyonel bir iş asistanısın. Şu görev için verimlilik odaklı, kısa ve teknik bir tavsiye ver:'
        break
      case 'Ders':
        personaPrompt =
          'Sen bilgili ve motive edici bir öğretmensin. Şu ders görevi için akademik bir ipucu veya öğrenciyi teşvik edecek bir cümle ver:'
        break
      case 'Hobi':
        personaPrompt =
          'Sen neşeli ve kafa dengi bir arkadaşsın. Bu hobi görevi için heyecan verici ve samimi bir yorum yap:'
        break
      default:
        personaPrompt = 'Şu görev için kısa bir ipucu ver:'
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${personaPrompt} ${description}` }]
          }
        ]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('AI CEVABI HATASI:', data)
      return 'AI şu an analiz yapamıyor.'
    }

    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('AI BAĞLANTI HATASI:', error.message)
    return 'AI bağlantısı kurulamadı.'
  }
}
// GÖREV EKLEME (AI Destekli)
router.post('/add', async (req, res) => {
  try {
    const { title, description, priority } = req.body


    const aiSummary = await getAISummary(description)

    const newTask = new Task({
      title,
      description,
      priority,
      aiNote: aiSummary
    })

    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (err) {
    console.error('Ekleme Hatası:', err)
    res.status(500).json({ message: 'Görev eklenirken bir hata oluştu.' })
  }
})


router.get('/all', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }) 
    res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/update/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    )
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json('Görev başarıyla silindi.')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
