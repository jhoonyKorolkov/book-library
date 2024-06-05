import multer from 'multer'
import path from 'node:path'
import uniqid from 'uniqid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqid() + fileExtension)
  }
})

const upload = multer({ storage: storage })

export default upload
