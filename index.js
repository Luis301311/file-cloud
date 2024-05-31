import express, { response } from 'express';
import multer from 'multer';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';
import constroller from './constroller.js'
import dotenv from 'dotenv';
dotenv.config()
const PORT = 3000 || process.env.PORT;
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, './uploads'),
        filename: (req, file, cb) => {
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${fileName.replace(/\s+/g, '')}-${Date.now()}${fileExtension}`);
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
    try{
        const fileNameWithoutExt = req.file.filename.split('.').slice(0, -1).join('.');
        const timestamp = fileNameWithoutExt.split('-').pop();
        const serverUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`;
        req.file.Url = serverUrl; 
        req.file.Id_file = timestamp;   
        const item = await constroller.add(req.file)
        if(item){
            res.status(200).json(item);
        }
    }catch(err){
        res.status(500).json(err);
    }
});
//Middleware
expressApp.use('/public', express.static(join(CURRENT_DIR, './uploads')));

expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

