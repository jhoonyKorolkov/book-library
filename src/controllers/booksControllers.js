import {
  getAllBooks as getAllBooksFromService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  updateBook as updateBookInService,
  deleteBook as deleteBookInService
} from '../service/bookService.js'

const getAllBooks = (req, res) => {
  try {
    const books = getAllBooksFromService()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getBookById = (req, res) => {
  try {
    const { id } = req.params
    const book = getBookByIdService(id)

    if (!book) {
      res.status(404).send('not found')
      return
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createBook = async (req, res) => {
  try {
    const file = req.file
    const newBook = await createBookService(req.body, file)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateBook = async (req, res) => {
  try {
    const file = req.file
    const { id } = req.params
    const updatedBook = await updateBookInService(id, req.body, file)

    if (!updatedBook) {
      res.status(404).send('not found')
      return
    }

    console.log(updatedBook)

    res.json(updatedBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteBook = (req, res) => {
  try {
    const deleted = deleteBookInService(req.params.id)

    if (!deleted) {
      res.status(404).send('not found')
      return
    }

    res.send('ok')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook }
