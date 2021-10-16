const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now())
        // cb(null, file.originalname)
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

module.exports.upload = multer({ storage: storage });