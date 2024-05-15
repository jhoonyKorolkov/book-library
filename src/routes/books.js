import express from 'express'
import {
  getAllBooks,
  getTargetBook,
  setNewBook,
  updateBook,
  deleteBook
} from '../controllers/booksControllers.js'

const booksRouter = express.Router()

booksRouter.get('/books', getAllBooks)
booksRouter.get('/books/:id', getTargetBook)
booksRouter.post('/books', setNewBook)
booksRouter.put('/books/:id', updateBook)
booksRouter.delete('/books/:id', deleteBook)

export { booksRouter }
