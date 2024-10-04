import path from 'path';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/temp'));
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname); 
    }
});

const upload = multer({ storage });

export default upload;