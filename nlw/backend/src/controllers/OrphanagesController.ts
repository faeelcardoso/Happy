import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) { // Para listar os orfanatos
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find();

        return res.json(orphanages);
    },

    async show(req: Request, res: Response) { // Para listar um orfanato
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return res.json(orphanage);    
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

    const orphanage = orphanagesRepository.create({
        name, 
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images,
    });

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
    }
}