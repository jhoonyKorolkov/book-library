import books from '../models/booksModel.js'
import uniqid from 'uniqid'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

const getAllBooks = () => {
  return books
}

const getBookById = id => {
  return books.find(book => book.id === id)
}

const createBook = (bookData, file) => {
  const newBook = { ...bookData, id: uniqid(), fileBook: file.filename }

  books.push(newBook)
  return newBook
}

const updateBook = async (id, updatedData, file) => {
  const idx = books.findIndex(book => book.id === id)
  const book = books.find(book => book.id === id)

  if (idx === -1) {
    console.error(`Book with ID ${id} not found.`)
    return null
  }

  try {
    if (file && updatedData.fileName === book.fileName) {
      const filePath = path.resolve('uploads', book.fileBook)
      await unlink(filePath)
      console.log(`Successfully updated ${filePath}`)
      books[idx] = { ...books[idx], ...updatedData, fileBook: file.filename }
    } else {
      books[idx] = { ...books[idx], ...updatedData }
    }

    return books[idx]
  } catch (error) {
    console.error('There was an error:', error.message)
    return null
  }
}

const deleteBook = async id => {
  const idx = books.findIndex(book => book.id === id)
  const book = books.find(book => book.id === id)
  if (idx === -1) {
    return null
  }

  const filePath = path.resolve('uploads', book.fileBook)
  try {
    await unlink(filePath)
    console.log(`Successfully deleted ${filePath}`)
  } catch (error) {
    console.error('There was an error:', error.message)
  }

  books.splice(idx, 1)
  return true
}

const downloadBookById = id => {
  const book = books.find(book => book.id === id)
  const filePath = path.resolve('uploads', book.fileBook)
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  downloadBookById
}
