import express from 'express'
import bookRoutes from './books.js'
import authRoutes from './auth.js'


const router = express.Router()

router.use(authRoutes)
router.use(bookRoutes)

export default router
