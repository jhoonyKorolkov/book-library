const notFoundHandler = (req, res, next) => {
  res.status(404).render('errors/404')
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).render('errors/error', { message: err.message, stack: err.stack });
}


export {notFoundHandler, errorHandler}
