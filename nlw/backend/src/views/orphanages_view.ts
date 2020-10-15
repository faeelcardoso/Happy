import Orphanage from '../models/Orphanage';
import imagesView from './imagens_view';

export default {
    renderOne(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images),
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.renderOne(orphanage));
        // percorro todos os orfanatos e para cada um deles eu chamo o método renderOne
    }
};