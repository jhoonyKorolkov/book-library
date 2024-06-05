import {
  getAllBooks as getAllBooksFromService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  updateBook as updateBookInService,
  deleteBook as deleteBookInService,
  downloadBook as downloadBookByIdService
} from '../service/bookService.js'

const getAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooksFromService()

    res.json(books)
  } catch (error) {
    next(error)
  }
}

const getBookById = async (req, res) => {
  try {
    const { id } = req.params
    const book = await getBookByIdService(id)

    res.json(book)
  } catch (error) {
    next(error)
  }
}

const createBook = async (req, res, next) => {
  try {
    const file = req.file
    const { title, description, authors, favorite } = req.body
    await createBookService(title, description, authors, favorite, file)

    res.json({ message: 'Book saved' })
  } catch (error) {
    next(error)
  }
}

const updateBook = async (req, res, next) => {
  try {
    const file = req.file
    const { title, description, authors, favorite } = req.body
    const { id } = req.params
    await updateBookInService(id, title, description, authors, favorite, file)

    res.status(200).json({ message: 'Book updated' })
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    await deleteBookInService(req.params.id)

    res.send('ok')
  } catch (error) {
    next(error)
  }
}

const downloadBookById = async (req, res, next) => {
  try {
    const { id } = req.params
    const file = await downloadBookByIdService(id)

    res.download(file)
  } catch (error) {
    next(error)
  }
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  downloadBookById
}
