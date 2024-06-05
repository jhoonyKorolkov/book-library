import express from 'express'
import upload from '../middlewares/uploadMiddleware.js'

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  downloadBookById
} from '../controllers/booksControllers.js'

const booksRouter = express.Router()

booksRouter.get('/books', getAllBooks)
booksRouter.get('/books/:id', getBookById)
booksRouter.get('/books/:id/download', downloadBookById)
booksRouter.post('/books', upload.single('file'), createBook)
booksRouter.put('/books/:id', upload.single('file'), updateBook)
booksRouter.delete('/books/:id', deleteBook)

export { booksRouter }
