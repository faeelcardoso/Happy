// Multer para Upload de imagens
import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'), // para cair os uploads na pasta uploads
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`; // para gerar um novo nome de arq, data + nome do arq original
            
            cb(null, fileName); // callback, erro + resultado = sem erro + arquivo
        },
    })
};