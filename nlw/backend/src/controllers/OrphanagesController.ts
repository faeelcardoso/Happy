import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanages_view from '../views/orphanages_view';

export default {
    async index(req: Request, res: Response) { // Para listar os orfanatos
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanages_view.renderMany(orphanages));
    },

    async show(req: Request, res: Response) { // Para listar um orfanato
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.renderOne(orphanage));    
    },

    async create(req: Request, res: Response) {
    /*console.log(req.query); // normal
    console.log(req.params); // :id
    console.log(req.body); // em JSON
    */

    const {
        name, 
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);
    // a partir daqui já tenho tudo liberado, create, delete...

    // console.log(req.files); as imagens vem nesse req.files, tudo da img está salva nisso
    const requestImages = req.files as Express.Multer.File[]; // isso é um array de arq do Multer. Probleminha do multer resolvido!
    const images =  requestImages.map(image => {
        return { path: image.filename }
    })

    const data = {
        name, 
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends: open_on_weekends == 'true', // por causa do boolean, dá um b.ozinho a mais
        images,
    };

    const schema = Yup.object().shape({ // schema de validação do orfanato
        name: Yup.string().required(), // se quiser colcoar em português o erro só escrever dentro do required
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        images: Yup.array(
            Yup.object().shape({
                path: Yup.string().required()
            })
        )
    });

    await schema.validate(data, {
        abortEarly: false, // para retornar TODOS os erros
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
    }
}