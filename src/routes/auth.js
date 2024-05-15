import express from 'express'
import { getUserLoginHandler } from '../controllers/auth.js'

const authRouter = express.Router()

authRouter.post('/user/login', getUserLoginHandler)

export { authRouter }
