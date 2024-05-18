const notFoundHandler = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

export { notFoundHandler, errorHandler }
