const getUserLoginHandler = (req, res) => {
  res.statusCode = 201
  res.json({ id: 1, mail: 'test@mail.ru' })
}

export { getUserLoginHandler }
