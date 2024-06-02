import express from 'express'
import upload from '../middlewares/uploadHandler.js'

import {
  getAllBooks,
  getCreatFormBook,
  getBookById,
  createBook,
  updateBook,
  getUpdateFormBook,
  downloadBook,
  deleteBook
} from '../controllers/books.js'

const bookRoutes = express.Router()

bookRoutes.get('/', getAllBooks)
bookRoutes.get('/books/create', getCreatFormBook)
bookRoutes.post('/books/create', upload.single('file'), createBook)
bookRoutes.get('/books/:id', getBookById)
bookRoutes.get('/books/edit/:id', getUpdateFormBook)
bookRoutes.post('/books/edit/:id', upload.single('file'), updateBook)
bookRoutes.get('/books/:id/download', downloadBook)
bookRoutes.get('/books/delete/:id', deleteBook)

export default bookRoutes
