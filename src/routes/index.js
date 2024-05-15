import express from 'express'
import { authRouter } from './auth.js'
import { booksRouter } from './books.js'

const router = express.Router()

router.use('/api', authRouter)
router.use('/api', booksRouter)

export default router
