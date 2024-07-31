import { Request, Response, NextFunction } from 'express'
import container from '../container'
import { BookRepository } from '../entity/BooksRepository'

const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const repo = container.get(BookRepository)
    const books = await repo.getAllBooks()
    res.render('index', { books })
  } catch (error) {
    next(error)
  }
}

const getCreatFormBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.render('create')
  } catch (error) {
    next(error)
  }
}

const getUpdateFormBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const repo = container.get(BookRepository)
    const book = await repo.getBookById(id)
    res.render('edit', { book })
  } catch (error) {
    next(error)
  }
}

const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const repo = container.get(BookRepository)
    const book = await repo.getBookById(id)
    res.render('view', { book })
  } catch (error) {
    next(error)
  }
}

const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file
    const { title, description, authors, favorite } = req.body
    const repo = container.get(BookRepository)
    await repo.createBook(title, description, authors, favorite, file)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file = req.file
    const { title, description, authors, favorite } = req.body
    const { id } = req.params
    const repo = container.get(BookRepository)
    await repo.updateBook(id, title, description, authors, favorite, file)
    res.redirect(`/books/${id}`)
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const repo = container.get(BookRepository)
    await repo.deleteBook(id)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const downloadBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params
    const repo = container.get(BookRepository)
    const { filePath, originalName } = await repo.downloadBook(id)
    res.download(filePath, originalName, error => {
      if (error) {
        next(error)
      } else {
        console.log('File sent:', filePath)
      }
    })
  } catch (error) {
    next(error)
  }
}

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  getUpdateFormBook,
  getCreatFormBook,
  downloadBook,
  deleteBook
}
