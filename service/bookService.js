import books from '../models/booksModel.js'
import uniqid from 'uniqid'

const getAllBooks = () => {
  return books
}

const getBookById = id => {
  return books.find(book => book.id === id)
}

const createBook = bookData => {
  const newBook = { ...bookData, id: uniqid() }

  books.push(newBook)
  return newBook
}

const updateBook = async (id, updatedData) => {
  const idx = books.findIndex(book => book.id === id)

  if (idx === -1) {
    console.error(`Book with ID ${id} not found.`)
    return null
  }

  try {
    books[idx] = { ...books[idx], ...updatedData }
    return books[idx]
  } catch (error) {
    console.error('There was an error:', error.message)
    return null
  }
}

export { getAllBooks, getBookById, createBook, updateBook }
