const getLogin = async (req, res, next) => {
  try {
    console.log(books)
    res.render('/auth/signin')
  } catch (error) {
    next(error)
  }
}