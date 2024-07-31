import { Document } from 'mongoose'

interface BookInterface extends Document {
  title: string
  description: string
  authors: string
  favorites: boolean
  file: {
    fileCover: string
    fileName: string
    mimeType: string
    originalName: string
  }
}

export default BookInterface
