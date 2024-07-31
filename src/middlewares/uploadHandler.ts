import multer, { FileFilterCallback } from 'multer'
import path from 'node:path'
import { Request } from 'express'
import AppError from './AppError.js'

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    cb(null, 'public/img')
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    const fileExtension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + fileExtension)
  }
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const fileTypes = /jpeg|jpg|png|gif/

  const extname = fileTypes.test(file.originalname.toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new AppError('Доступен формат jpeg, jpg, png, gif', 400))
  }
}

const upload = multer({ storage: storage, fileFilter })

export default upload
