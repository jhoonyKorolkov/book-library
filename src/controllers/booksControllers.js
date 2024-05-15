import {
  getAllBooks as getAllBooksFromService,
  getBookById,
  createBook,
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

const getTargetBook = (req, res) => {
  try {
    const { id } = req.params
    const book = getBookById(id)

    if (!book) {
      res.status(404).send('not found')
      return
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const setNewBook = (req, res) => {
  try {
    const newBook = createBook(req.body)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateBook = (req, res) => {
  try {
    const { id } = req.params
    const updatedBook = updateBookInService(id, req.body)

    if (!updatedBook) {
      res.status(404).send('not found')
      return
    }

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

export { getAllBooks, getTargetBook, setNewBook, updateBook, deleteBook }
