import express from 'express'
import { booksRouter } from './booksRouter.js'

const router = express.Router()

router.use(booksRouter)

export default router
