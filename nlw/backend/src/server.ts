import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors()); // permitir acesso para todos frontends, backend está em 3333 e front 3000 por exemplo
app.use(express.json()); // para entender json
app.use(routes); // para usar as rotas
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // para usar as rotas das imagens
app.use(errorHandler); // para usar a rota de erros validados

app.listen(3333); 