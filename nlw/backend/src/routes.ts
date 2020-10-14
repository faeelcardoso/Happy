import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// Rota = conjunto
// Recurso = usuário

// Métodos HTTP = GET, POST, PUT, DELETE

/*
GET = Buscar info
POST = Criando uma info
PUT = Editando uma info
DELETE = Deletando uma info
*/

// Parâmetros

/*
 Query Params: http://localhost:3333/users?search=diego
 Route Params: http://localhost:3333/users/1 
 Body: http://localhost:3333 (onde vai as coisas maiores)
*/ 

routes.get('/orphanages', OrphanagesController.index); // listar
routes.get('/orphanages/:id', OrphanagesController.show); // listar UM orfanato
routes.post('/orphanages', upload.array('images'), OrphanagesController.create); // criar

export default routes;