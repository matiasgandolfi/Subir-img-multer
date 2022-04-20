const express = require('express');
const path = require('path');
//Iniciar express
const app = express();
const multer = require('multer');







//Setting en el puerto
app.set('port', 4000);
    //Donde esta views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Storage: Almacenar img con el nombre original del arch
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img-uploads'),
    //cb = callback
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }

})


//Middlewares: Codigos antes de llegar a las Rutas
//Multer: Procesador de imagen
app.use(multer({
    storage: storage,
    //Destino de imagen subida
    dest: path.join(__dirname, '../public/img-uploads'),
    //Tamaño maximo del archivo
    limits: {fileSize: 5000000},
    //Validar que tipo de imagen esta subiendo el usuario
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        //Comprobar si es un tipo de imagen valida
        const mimetype = filetypes.test(file.mimetype);
        //Comprobar si es uno de estas extensiones de archivos
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }cb("Error: Archivo debe ser una imagen")
    }
}).single('image'));


//Routes
app.use(require('./routes/index.routes'))




//Archivos statics
app.use(express.static(path.join(__dirname, 'public')));



//Correr server
app.listen(app.get('port'), () =>{
    console.log(`El server esta en el puerto ${app.get('port')}`);
})