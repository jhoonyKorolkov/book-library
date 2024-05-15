import express from 'express'
import router from './routes/index.js'

const app = express()

app.use(router)
app.use(express.json())

app.listen(8000, () => {
  console.log('Server is ready')
})
