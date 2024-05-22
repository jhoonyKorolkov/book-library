import express from 'express'
import bookRoutes from './books.js'

const router = express.Router()

router.use(bookRoutes)

export default router
