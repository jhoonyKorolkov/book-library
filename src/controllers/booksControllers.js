import { errorHandler } from '../middlewares/errorMiddleware.js'
import {
  getAllBooks as getAllBooksFromService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  updateBook as updateBookInService
} from '../service/bookService.js'

const getAllBooks = (req, res) => {
  try {
    const books = getAllBooksFromService()
    res.render('index', { books })
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const getCreatFormBook = (req, res) => {
  try {
    res.render('create')
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const getUpdateFormBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = getBookByIdService(id)
    res.render('edit', { book })
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const getBookById = (req, res) => {
  try {
    const { id } = req.params
    const book = getBookByIdService(id)
    res.render('view', { book })
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const createBook = (req, res) => {
  try {
    console.log(req)
    createBookService(req.body)
    res.redirect('/')
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const updateBook = (req, res) => {
  try {
    const { id } = req.params
    updateBookInService(id, req.body)
    res.redirect(`/books/${id}`)
  } catch (error) {
    errorHandler(error, req, res)
  }
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  getUpdateFormBook,
  getCreatFormBook
}
