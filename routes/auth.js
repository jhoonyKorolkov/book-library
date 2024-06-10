import express from 'express'

import {getLogin} from '../controllers/auth.js'

const authRoutes = express.Router()

authRoutes.get('/login', getLogin)