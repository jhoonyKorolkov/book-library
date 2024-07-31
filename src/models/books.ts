import { Schema, model } from 'mongoose'
import BookInterface from '../interfaces/BookInterface'

const BookSchema = new Schema<BookInterface>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  favorites: {
    type: Boolean,
    default: false
  },
  file: {
    fileCover: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    }
  }
})

const Book = model<BookInterface>('Book', BookSchema)

export default Book
