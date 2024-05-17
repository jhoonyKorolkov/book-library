import express from 'express'
import router from './routes/index.js'
import { PORT } from './config.js'
const app = express()

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`)
})
