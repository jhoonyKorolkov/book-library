import 'reflect-metadata'
import { injectable, inject } from 'inversify'

@injectable()
class BookRepository {
  id: string
  constructor(id: string) {
    id: this.id
  }
  getBookById(id: string): string {
    return id
  }
}

export { BookRepository }
