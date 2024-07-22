import express from 'express'
import session from 'express-session'
import passport from './passport.js'
import flash from 'connect-flash'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, '../public/img')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const configureApp = app => {
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
  
  app.use(flash())
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
  })
}

export default configureApp
