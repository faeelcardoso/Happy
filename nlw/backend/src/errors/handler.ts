import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErros {
    [key: string]: string[];
}

// validando os erros
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErros = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return res.status(400).json({ message: 'Validation fails', errors });
    }

    console.log(error); // para aparecer o erro pra mim

    return res.status(500).json({ message: 'Internal server error' }); // para o usuário
}

export default errorHandler;