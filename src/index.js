import express from 'express'
import router from './routes/index.js'
import { PORT } from './config.js'
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js'

const app = express()

app.use(express.json())
app.use(router)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`)
})
