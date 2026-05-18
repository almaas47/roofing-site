import express from 'express'
import cors from 'cors'
import { processContactForm } from './agent.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ error: 'Name, email, phone, and service are required.' })
  }

  try {
    await processContactForm({ name, email, phone, service, message: message || '' })
    res.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Failed to process your request. Please try again.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Roofing agent server running on http://localhost:${PORT}`))
