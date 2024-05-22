import express from 'express'

import {
  getAllBooks,
  getCreatFormBook,
  getBookById,
  createBook,
  updateBook,
  getUpdateFormBook,
} from '../controllers/booksControllers.js'

const booksRouter = express.Router()

booksRouter.get('/', getAllBooks)
booksRouter.get('/books/create', getCreatFormBook)
booksRouter.post('/books/create', createBook)
booksRouter.get('/books/:id', getBookById)
booksRouter.get('/books/edit/:id', getUpdateFormBook)
booksRouter.post('/books/edit/:id', updateBook)

export { booksRouter }
