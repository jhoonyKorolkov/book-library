import {
  getAllBooks as getAllBooksFromService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  downloadBook as downloadBookService,
  deleteBook as deleteBookService,
  updateBook as updateBookInService
} from '../service/books.js'

const getAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooksFromService()
    res.render('index', { books })
  } catch (error) {
    next(error)
  }
}

const getCreatFormBook = (req, res, next) => {
  try {
    res.render('create')
  } catch (error) {
    next(error)
  }
}

const getUpdateFormBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = getBookByIdService(id)
    res.render('edit', { book })
  } catch (error) {
    next(error)
  }
}

const getBookById = (req, res, next) => {
  try {
    const { id } = req.params
    const book = getBookByIdService(id)
    res.render('view', { book })
  } catch (error) {
    next(error)
  }
}

const createBook = (req, res, next) => {
  try {
    const file = req.file
    const data = req.body
    createBookService(data, file)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const updateBook = (req, res, next) => {
  try {
    const file = req.file
    const data = req.body
    const { id } = req.params
    updateBookInService(id, data, file)
    res.redirect(`/books/${id}`)
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    await deleteBookService(req.params.id)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const downloadBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await downloadBookService(id)

    const filePath = book.path
    const fileName = book.originalName

    res.download(filePath, fileName, error => {
      if (error) {
        next(error)
      } else {
        console.log('File sent:', fileName)
      }
    })
  } catch (error) {
    next(error)
  }
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  getUpdateFormBook,
  getCreatFormBook,
  downloadBook,
  deleteBook
}
