import multer from 'multer'

export default (multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/upload/users')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname)
    }
  }),
  fileFilter: (req, file, cb) => {
    const extensoes = ['imagem/png', 'image/jpg', 'image/jpeg', 'image/gif'].find(formato => formato == file.mimetype)
    if (extensoes) {
      return cb(null, true)
    } else {
      return cb(null, false)
    }
  }
}))