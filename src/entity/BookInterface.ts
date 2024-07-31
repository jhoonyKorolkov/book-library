interface BookInterface {
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
