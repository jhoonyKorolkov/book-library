import 'reflect-metadata'
import { injectable } from 'inversify'
import path from 'path'
import { unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import Book from '../models/books'
import AppError from '../middlewares/AppError'
import BookInterface from '../interfaces/BookInterface'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

@injectable()
class BookRepository {
  async getAllBooks(): Promise<BookInterface[]> {
    const books = await Book.find().select('-__v -mimetype')
    if (!books) {
      throw new AppError('Books not found', 404)
    }
    return books as BookInterface[]
  }

  async getBookById(id: string): Promise<BookInterface> {
    const book = await Book.findById(id).select('-__v -mimetype')
    if (!book) {
      throw new AppError('Book not found', 404)
    }
    return book as BookInterface
  }

  async createBook(
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    file: Express.Multer.File
  ): Promise<boolean> {
    try {
      const newBook = new Book({
        title,
        description,
        authors,
        favorite,
        file: {
          mimeType: file.mimetype,
          fileName: file.filename,
          originalName: file.originalname,
          fileCover: path.join('/img', file.filename)
        }
      })
      await newBook.save()
      return true
    } catch (error) {
      if (file) {
        await unlink(path.join(__dirname, 'public/img', file.filename))
      }
      throw new AppError('Error creating book', 500)
    }
  }

  async updateBook(
    id: string,
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    file?: Express.Multer.File
  ): Promise<void> {
    const book = await Book.findById(id).select('-__v -mimetype')
    if (!book) {
      throw new AppError('Book not found', 404)
    }

    try {
      if (file) {
        const oldFilePath = path.join(
          __dirname,
          '../public/img',
          book.file.fileName
        )
        await unlink(oldFilePath)

        book.file.mimeType = file.mimetype
        book.file.fileName = file.filename
        book.file.originalName = file.originalname
        book.file.fileCover = `/img/${file.filename}`
      }

      book.title = title
      book.description = description
      book.authors = authors
      book.favorites = favorite

      await book.save()
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        throw new AppError('File not found', 404)
      } else {
        throw new AppError('Error updating book', 500)
      }
    }
  }

  async deleteBook(id: string): Promise<void> {
    const book = await Book.findById(id).select('-__v -mimetype -fileName')
    if (!book) {
      throw new AppError('Book not found', 404)
    }

    try {
      const filePath = path.join(__dirname, '../public', book.file.fileCover)
      console.log(`Deleting file at path: ${filePath}`)
      await unlink(filePath)
      await Book.deleteOne({ _id: id })
      console.log(`Book with ID ${id} deleted successfully`)
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        throw new AppError('File not found', 404)
      } else {
        console.error(`Error deleting file: ${(error as any).message}`)
        throw new AppError('Error deleting book', 500)
      }
    }
  }

  async downloadBook(
    id: string
  ): Promise<{ filePath: string; originalName: string }> {
    const book = await Book.findById(id).select('-__v')

    if (!book) {
      throw new AppError('Book not found', 404)
    }
    const filePath = path.join(__dirname, '../public', book.file.fileCover)
    return {
      filePath,
      originalName: book.file.originalName
    }
  }
}

export { BookRepository }
