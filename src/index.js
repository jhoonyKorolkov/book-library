import express from 'express'
import router from './routes/index.js'
import { PORT } from './config.js'

const app = express()

app.use(express.json())
app.use(router)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
})

app.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`)
})
