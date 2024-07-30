import {
  getAllBooks as getAllBooksFromService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  downloadBook as downloadBookService,
  deleteBook as deleteBookInService,
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
    const book = await getBookByIdService(id)
    res.render('edit', { book })
  } catch (error) {
    next(error)
  }
}

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await getBookByIdService(id)
    res.render('view', { book })
  } catch (error) {
    next(error)
  }
}

const createBook = async (req, res, next) => {
  try {
    const file = req.file
    const { title, description, authors, favorite } = req.body
    await createBookService(title, description, authors, favorite, file)
    res.redirect('/')
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
    res.redirect(`/books/${id}`)
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params
    await deleteBookInService(id)

    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const downloadBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const { filePath, originalName } = await downloadBookService(id)
    res.download(filePath, originalName, error => {
      if (error) {
        next(error)
      } else {
        console.log('File sent:', filePath)
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
