import express from 'express'
import session from 'express-session'
import router from './routes/index.js'
import { PORT } from './config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './db.js'
import passport from './config/passport.js'
import flash from 'connect-flash'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, 'public/img')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}
const app = express()

const startServer = async () => {
  await connectDB()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(
    session({
      secret: 'SECRET',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  )
  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
  })

  app.use(router)

  app.use(notFoundHandler)
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

startServer()
