import { Container } from 'inversify'
import { BookRepository } from './entity/BooksRepository.js'

const container = new Container()

container.bind(BookRepository).toSelf()

export default container
