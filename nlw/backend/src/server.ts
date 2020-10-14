import express from 'express';
import './database/connection';

import routes from './routes';

const app = express();

app.use(express.json()); // para entender json
app.use(routes); // para usar as rotas

app.listen(3333); 