import AppError from './AppError.js'

const notFoundHandler = (req, res, next) => {
  const err = new AppError('Page Not Found', 404)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`ERROR 💥: ${message}`, { stack: err.stack })

  if (statusCode === 404) {
    return res.status(404).render('errors/404', {
      title: 'Page Not Found',
      message: message
    })
  }

  res.status(statusCode).render('errors/error', {
    title:
      statusCode === 500 ? 'Internal Server Error' : 'Something went wrong!',
    message: message
  })
}
export { notFoundHandler, errorHandler }
