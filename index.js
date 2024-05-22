import express from 'express'
import router from './routes/index.js'
import { PORT } from './config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(router)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`)
})
