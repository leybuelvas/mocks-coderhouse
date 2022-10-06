import ContenedorMem from "./ContenedorMem.js";
import faker from 'faker';

faker.locale = 'es';
const {ecommerce, image} = faker;

export default class productos extends ContenedorMem {
    constructor() {
        super();
    }

    populate = (quantity) => {
        this.deleteAll();
        for (let i = 0; i < quantity; i++) {
            this.save({
                title: ecommerce.productoName(),
                price: ecommerce.price(),
                thumbnail: image.imageUrl()        
            });
        }

        return this.getAll();
    }
}

