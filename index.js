import express, { response } from 'express';
import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import constroller from './constroller.js'
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config()
const PORT = 3000 || process.env.PORT;
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ['image/jpeg', 'image/png'];

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, './uploads'),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${fileName}-${Date.now()}${fileExtension}`);
        },
    }),
/*     fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    }, */
    limits: {
        fieldSize: 10000000,
    },
});

const expressApp = express();

expressApp.post('/upload', multerUpload.single('file'), async (req, res) => {
    constroller.add(req.file)
    .then(response =>{
        res.status(200).json(req.file);
    })
    .catch(err =>{
        res.status(500); 
    })
    

});

expressApp.use('/public', express.static(join(CURRENT_DIR, './uploads')));

expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});
