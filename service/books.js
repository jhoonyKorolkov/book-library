import AppError from '../middlewares/AppError.js'
import books from '../models/books.js'
import path from 'path'
import { unlink } from 'fs/promises'
import { BASE_URL } from '../config.js'
import Book from '../models/books.js'

const getAllBooks = async () => {
  const books = await Book.find().select('-__v -mimetype -fileName')
  if (!books) {
    throw new AppError('Books not found', 404)
  }
  return books
}
const getBookById = id => {
  const book = books.find(book => book.id === id)
  if (!book) {
    throw new AppError('Book not found', 404)
  }
  return book
}

const createBook = (bookData, file) => {
  const newBook = {
    ...bookData,
    fileName: file.filename,
    fullPath: `${BASE_URL}/img/${file.filename}`,
    path: file.path,
    originalName: file.originalname
  }

  books.push(newBook)
  return newBook
}

const updateBook = async (id, updatedData, file) => {
  const idx = books.findIndex(book => book.id === id)

  if (idx === -1) {
    throw new AppError('Book not found', 404)
  }

  const book = books[idx]

  console.log(book)

  try {
    if (file && book.id === id) {
      const filePath = path.resolve('public/img', book.fileName)
      await unlink(filePath)

      console.log(filePath)
      books[idx] = {
        ...books[idx],
        ...updatedData,
        fileName: file.filename,
        fullPath: `${BASE_URL}/img/${file.filename}`,
        path: file.path,
        originalName: file.originalname
      }
    } else {
      books[idx] = { ...books[idx], ...updatedData }
    }

    return books[idx]
  } catch (error) {
    throw new AppError('Internal Server Error', 500)
  }
}

const deleteBook = async id => {
  const idx = books.findIndex(book => book.id === id)

  const book = books[idx]

  if (!book.fileName) {
    throw new AppError('Book file not found', 404)
  }

  const filePath = path.resolve('public/img', book.fileName)
  try {
    await unlink(filePath)
    console.log(`Successfully deleted ${filePath}`)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`File not found: ${filePath}`)
      throw new AppError('File not found', 404)
    } else {
      console.error(`Error deleting file: ${error.message}`)
      throw new AppError('Internal Server Error', 500)
    }
  }

  books.splice(idx, 1)
}

const downloadBook = id => {
  const book = books.find(book => book.id === id)
  if (!book) {
    throw new AppError('Book not found', 404)
  }

  return book
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  downloadBook,
  deleteBook
}
