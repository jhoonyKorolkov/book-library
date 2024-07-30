import container from '../container'
import { BookRepository } from '../entity/BooksRepository'

const repo = container.get()

console.log(container)
