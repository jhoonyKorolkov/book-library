import AppError from '../middlewares/AppError.js'
import path from 'path'
import { unlink, rename } from 'fs/promises'
import Book from '../models/bookModel.js'

const getAllBooks = async () => {
  const books = await Book.find().select('-__v -mimetype -fileName')
  if (!books) {
    throw new AppError('Books not found', 404)
  }
  return books
}

const getBookById = async id => {
  const book = await Book.findById(id).select('-__v -mimetype -fileName')
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
      favorite,
      mimetype: file.mimetype,
      fileName: file.filename,
      originalName: file.originalname
    })
    await newBook.save()
    return true
  } catch (error) {
    if (file) {
      await unlink(path.join('public/img', file.filename), err => {
        if (err) console.error('Error deleting file:', err)
      })
    }
    throw new AppError('Error creating book', 500)
  }
}

const updateBook = async (id, title, description, authors, favorite, file) => {
  const book = await Book.findById(id).select('-__v -mimetype -fileName')
  if (!book) {
    throw new AppError('Book not found', 404)
  }

  const filePath = path.resolve('public/img', book.fileName)
  await unlink(filePath)

  await Book.findByIdAndUpdate(id, {
    title,
    description,
    authors,
    favorite,
    mimetype: file.mimetype,
    fileName: file.filename,
    originalName: file.originalname
  })

  return true
}

const deleteBook = async id => {
  const book = await Book.findById(id).select('-__v -mimetype -fileName')
  if (!book) {
    throw new AppError('Book not found', 404)
  }

  try {
    const filePath = path.resolve('public/img', book.fileName)
    await unlink(filePath)
    await Book.deleteOne({ _id: id })
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AppError('File not found', 404)
    }
  }
}

const downloadBook = async id => {
  const book = await Book.findById(id).select('-__v')

  if (!book) {
    throw new AppError('Book not found', 404)
  }

  return `public/img/${book.fileName}`
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  downloadBook,
  deleteBook
}
