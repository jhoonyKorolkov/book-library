import AppError from './AppError.js'

// Middleware для обработки 404 ошибок
const notFoundHandler = (req, res, next) => {
  const err = new AppError('Page Not Found', 404)
  next(err)
}

// Основной обработчик ошибок
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).render('errors/404', {
    title: 'Something went wrong!',
    message: err.message,
    stack: err.stack
  })
}

export { notFoundHandler, errorHandler }
