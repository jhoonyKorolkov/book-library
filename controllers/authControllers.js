const getUserLoginHandler = (req, res) => {
  try {
    res.status(201).json({ id: 1, mail: 'test@mail.ru' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getUserLoginHandler }
