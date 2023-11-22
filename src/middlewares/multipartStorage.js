const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tempUploadsFolder = 'uploads/';
if (!fs.existsSync(tempUploadsFolder)) {
    fs.mkdirSync(tempUploadsFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempUploadsFolder);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no permitido'));
    }
};

const upload = multer({ storage, fileFilter });

const handleImageUpload = (req, res, next) => {
    upload.single('imagen')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ fecha: new Date().toISOString(), error: 'Error en la carga de la imagen' });
        } else if (err) {
            return res.status(500).json({ fecha: new Date().toISOString(), error: 'Error en el servidor al cargar la imagen' });
        }
        next();
    });
};

module.exports = {
    handleImageUpload,
};
