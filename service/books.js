import AppError from '../middlewares/AppError.js'
import books from '../models/booksModel.js'
import uniqid from 'uniqid'
import path from 'path'
import { unlink } from 'fs/promises'

const getAllBooks = () => {
  return books
}

const getBookById = id => {
  try {
    const book = books.find(book => book.id === id)
    return book
  } catch (error) {
    throw new AppError('Book not found', 404)
  }
}

const createBook = (bookData, file) => {
  const newBook = {
    ...bookData,
    id: uniqid(),
    path: file.path,
    fileBook: file.filename,
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

  try {
    if (file && book.id === id) {
      console.log(book)
      const filePath = path.resolve('public', book.fileBook)
      await unlink(filePath)
      books[idx] = {
        ...books[idx],
        ...updatedData,
        fileBook: file.filename,
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

  if (idx === -1) {
    throw new AppError('Book not found', 404)
  }

  const book = books[idx]

  const filePath = path.resolve('public', book.fileBook)

  try {
    await unlink(filePath)
    console.log(`Successfully deleted ${filePath}`)
  } catch (error) {
    throw new AppError('Internal Server Error', 500)
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
