import express from 'express'
import { createServer } from 'http'
import { PORT } from './config/config.js'
import connectDB from './db.js'
import startSocketIo from './socket.js'
import configureApp from './config/configureApp.js'
import configureRoutes from './config/configureRoutes.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()
const server = createServer(app)

const startServer = async () => {
  await connectDB()

  configureApp(app)
  configureRoutes(app)

  app.use(notFoundHandler)
  app.use(errorHandler)

  startSocketIo(server)

  server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

startServer()
