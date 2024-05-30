const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Configura Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/docs'); // Directorio donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Utiliza el nombre original del archivo
    }
});
const upload = multer({ storage: storage });

// Ruta para subir archivos
/* app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido correctamente');
});
 */
app.post('/upload', upload.single('file'), (req, res) => {
    // Obtenemos la ruta del archivo subido
    const rutaArchivo = path.join(__dirname, req.file.path);
    
    // Enviamos la ruta del archivo como parte de la respuesta
    res.send(`Archivo subido correctamente. Ruta: ${rutaArchivo}`);
});


// Configura Express para servir archivos estáticos desde el directorio '/ruta/del/archivo/subido'
app.use('/archivos', express.static('/docs'));

// Inicia el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
