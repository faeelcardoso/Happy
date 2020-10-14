import express from 'express';

import './database/connection';

const app = express();

app.use(express.json()); // para entender json

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

app.post('/users', (req, res) => {
    /*console.log(req.query); // normal
    console.log(req.params); // :id
    console.log(req.body); // em JSON
    
    return res.json({
        message: 'Hello World!'
    });*/
});

app.listen(3333); 