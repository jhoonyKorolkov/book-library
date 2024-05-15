import books from '../models/books.js'
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

const updateBook = (id, updatedData) => {
  const idx = books.findIndex(book => book.id === id)
  if (idx === -1) {
    return null
  }

  books[idx] = { ...books[idx], ...updatedData }
  return books[idx]
}

const deleteBook = id => {
  const idx = books.findIndex(book => book.id === id)
  if (idx === -1) {
    return null
  }

  books.splice(idx, 1)
  return true
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook }
