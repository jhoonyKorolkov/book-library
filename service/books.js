import AppError from '../middlewares/AppError.js'
import path from 'path'
import { unlink, rename } from 'fs/promises'
import Book from '../models/books.js'

import { fileURLToPath } from 'url'
import { isUndefined } from 'util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getAllBooks = async () => {
  const books = await Book.find().select('-__v -mimetype')
  if (!books) {
    throw new AppError('Books not found', 404)
  }
  return books
}

const getBookById = async id => {
  const book = await Book.findById(id).select('-__v -mimetype')
  if (!book) {
    throw new AppError('Book not found', 404)
  }
  return book
}

const createBook = async (title, description, authors, favorite, file) => {
  
  try {
    const newBook = new Book({
      title,
      description,
      authors,
      favorite: favorite ? true : false,
      mimetype: file.mimetype,
      fileName: file.filename,
      originalName: file.originalname,
      fileCover: path.join('/img', file.filename)
    })
    await newBook.save()
    return true
  } catch (error) {
    if (file) {
      await unlink(path.join(__dirname, 'public/img', file.filename)),
        err => {
          if (err) console.error('Error deleting file:', err)
        }
    }
    throw new AppError('Error creating book', 500)
  }
}

const updateBook = async (id, title, description, authors, favorite, file) => {
  const book = await Book.findById(id).select('-__v -mimetype')
  if (!book) {
    throw new AppError('Book not found', 404)
  }

  try {
    if (file) {
      const oldFilePath = path.join(__dirname, '../public/img', book.fileName)
      await unlink(oldFilePath)

      book.mimetype = file.mimetype
      book.fileName = file.filename
      book.originalName = file.originalname
      book.fileCover = `/img/${file.filename}`
    }

    book.title = title
    book.description = description
    book.authors = authors
    book.favorite = favorite === 'on'

    await book.save()
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AppError('File not found', 404)
    } else {
      throw new AppError('Error updating book', 500)
    }
  }
}

const deleteBook = async id => {
  const book = await Book.findById(id).select('-__v -mimetype -fileName')
  if (!book) {
    throw new AppError('Book not found', 404)
  }




  try {
    const filePath = path.join(__dirname, '../public', book.fileCover)
    console.log(`Deleting file at path: ${filePath}`)
    await unlink(filePath)
    await Book.deleteOne({ _id: id })
    console.log(`Book with ID ${id} deleted successfully`)
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AppError('File not found', 404)
    } else {
      console.error(`Error deleting file: ${error.message}`)
      throw new AppError('Error deleting book', 500)
    }
  }
}

const downloadBook = async id => {
  const book = await Book.findById(id).select('-__v')

  if (!book) {
    throw new AppError('Book not found', 404)
  }
  const filePath = path.join(__dirname, '../public', book.fileCover)
  return {
    filePath,
    originalName: book.originalName
  }
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  downloadBook,
  deleteBook
}
