import 'reflect-metadata'
import { injectable } from 'inversify'
import Book from '../models/books'
import BookInterface from '../interfaces/BookInterface'

@injectable()
class BookRepository {
  id: string
  books: BookInterface[]

  async getBookById(id: string): Promise<BookInterface | undefined> {
    return await Book.findById(id).select('-__v -mimetype')
  }
}

export { BookRepository }
