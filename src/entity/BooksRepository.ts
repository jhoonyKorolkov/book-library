import 'reflect-metadata'
import { injectable } from 'inversify'
import Book from '../models/books'

@injectable()
class BookRepository {
  id: string
  books: Array<{ name: string; id: string }>

  async getBookById(id: string): Promise<object | undefined> {
    return await Book.findById(id).select('-__v -mimetype')
  }
}

export { BookRepository }
