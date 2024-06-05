import AppError from './AppError.js'

const notFoundHandler = (req, res, next) => {
  const err = new AppError('Page Not Found', 404)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || '/app/errorMiddleware.js'

  console.error(`ERROR 💥: ${message}`, { stack: err.stack })

  res.status(statusCode).json({
    status: err.status,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export { notFoundHandler, errorHandler }
