import express from 'express'
import router from './routes/index.js'
import { PORT } from './config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, 'public/img')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}
const app = express()

const startServer = async () => {
  await connectDB()

  app.use(express.static('public'))
  app.set('view engine', 'ejs')

  app.use(express.urlencoded({ extended: true }))
  app.use(router)

  app.use(notFoundHandler)
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

startServer()
