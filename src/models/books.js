import { Schema, model } from 'mongoose'

const BookSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  authors: {
    type: String
  },
  favorite: {
    type: String
  },
  fileCover: {
    type: String
  },
  fileName: {
    type: String
  },
  mimetype: {
    type: String
  },
  originalName: {
    type: String
  }
})

const Book = model('Book', BookSchema)

export default Book
