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

abstract class UserBook {
  constructor(
    public title: string,
    public description: string,
    public authors: string,
    public favorites: boolean,
    public file: {
      fileCover: string
      fileName: string
      mimeType: string
      originalName: string
    }
  ) {}

  abstract getAllBooks(): string[]
  abstract getBookById(): object
  abstract createBook(): boolean
  abstract updateBook(): void
  abstract deleteBook(): void
  abstract downLoadBook(): object
}
