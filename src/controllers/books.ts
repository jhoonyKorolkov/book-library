import container from '../container'
import { BookRepository } from '../entity/BooksRepository'
import { Request, Response, NextFunction } from 'express'

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const repo = container.get(BookRepository)
    const book = await repo.getBookById(id)
    res.render('view', { book })
  } catch (error) {
    next(error)
  }
}

export { getBookById }
