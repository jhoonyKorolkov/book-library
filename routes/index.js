import express from 'express'
import { authRouter } from './authRouter.js'
import { booksRouter } from './booksRouter.js'

const router = express.Router()

router.use('/api', authRouter)
router.use('/api', booksRouter)

export default router
