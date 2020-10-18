import Image from '../models/Image';
import Orphanage from '../models/Image';

export default {
    renderOne(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.2.106:3333/uploads/${image.path}`, // mudar para variáveis ambientes dps, tem um post da Rocketseat top sobre
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.renderOne(image));
    }
};