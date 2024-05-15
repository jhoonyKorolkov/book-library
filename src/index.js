import books from './data/books.js'
import express from 'express'
import uniqid from 'uniqid'

const app = express()

app.use(express.json())

app.listen(8000, () => {
  console.log('Server is ready')
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.post('/api/user/login', (req, res) => {
  res.statusCode = 201
  res.json({ id: 1, mail: 'test@mail.ru' })
})

app.get('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === req.params.id)

  if (!book) {
    res.statusCode = 404
    res.send('not found')
    return
  }
  res.json(book)
})

app.post('/api/books', (req, res) => {
  const newBook = req.body
  console.log(newBook)
  newBook.id = uniqid()
  books.push(newBook)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const idx = books.findIndex(book => book.id === req.params.id)

  if (idx === -1) {
    res.statusCode = 404
    res.send('not found')
    return
  }

  const keysToUpdate = Object.keys(req.body)

  keysToUpdate.forEach(key => {
    if (req.body[key] !== undefined) {
      books[idx][key] = req.body[key]
    }
  })

  res.json(books[idx])
})

app.delete('/api/books/:id', (req, res) => {
  const idx = books.findIndex(book => book.id === req.params.id)

  if (idx === -1) {
    res.statusCode = 404
    res.send('not found')
    return
  }

  books.splice(idx, 1)

  res.send('ok')
})
