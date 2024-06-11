import express from 'express'

import {
  getLogin,
  getSignUp,
  userSignIn,
  userSignUp,
  userLogout,
  getProfile
} from '../controllers/auth.js'

const authRoutes = express.Router()

authRoutes.get('/user/login', getLogin)
authRoutes.get('/user/signup', getSignUp)
authRoutes.get('/user/me', getProfile)
authRoutes.get('/user/logout', userLogout)
authRoutes.post('/user/login', userSignIn)
authRoutes.post('/user/signup', userSignUp)

export default authRoutes
