import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const upload = multer({ storage: fileStorage });

export default upload;
