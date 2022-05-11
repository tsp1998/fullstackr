//@ts-nocheck
const multer = require('multer')

const multerMiddleware = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, 'uploads/images')
        },
        filename: (req, file, done) => {
            const extension = `.${file.mimetype.split('/')[1]}` || '.jpg'
            done(null, Math.random().toString().replace(/\./g, '') + extension)
        },
    }),
    fileFilter: (req, file, done) => {
        const isValidFile = true // FIXME: check for mime types
        let error = isValidFile ? null : new Error('Invalid File Type')
        done(error, isValidFile)
    },
})

module.exports = multerMiddleware