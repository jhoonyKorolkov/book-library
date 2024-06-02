import { createClient } from 'redis'
import express from 'express'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const PORT = process.env.PORT || 80

const app = express()

const client = createClient({
  url: REDIS_URL
})

client.on('error', err => console.error('Redis Client Error', err))

await client.connect()

app.post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params
  try {
    const count = await client.incr(bookId)
    res.json({ message: `book ${bookId} - count ${count}` })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/counter/:bookId', async (req, res) => {
  const { bookId } = req.params
  try {
    const count = await client.get(bookId)
    res.json({ bookId, count })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server counter is ready on port ${PORT}`)
})
