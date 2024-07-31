import session from 'express-session'
import passport from './passport.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, '../public/img')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const configureApp = (app: express.Express): void => {
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '../views'))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(
    session({
      secret: 'SECRET',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
  })
}

export default configureApp
