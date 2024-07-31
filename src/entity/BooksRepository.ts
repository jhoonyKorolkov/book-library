import 'reflect-metadata'
import { injectable } from 'inversify'
import Book from '../models/books'

@injectable()
class BookRepository {
  id: string
  books: Array<{ name: string; id: string }>

  constructor() {
    this.books = [
      { name: 'hello', id: '1' },
      { name: 'hi', id: '2' }
    ]
  }

  async getBookById(id: string): Promise<object | undefined> {
    return await Book.findById(id).select('-__v -mimetype')
  }
}

export { BookRepository }
