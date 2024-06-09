import multer from 'multer'
import path from 'node:path'
import AppError from './AppError.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + fileExtension)
  }
})

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/

  const extname = fileTypes.test(file.originalname.toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new AppError('Only images are allowed', 400))
  }
}

const upload = multer({ storage: storage, fileFilter })

export default upload
