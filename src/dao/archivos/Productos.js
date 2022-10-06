import archivosContenedor from "./archivosContenedor.js";
import __dirname from "../../utils.js";
import faker from 'faker';

faker.locale = 'es';
const {ecommerce, image} = faker;
const archivosProductos = __dirname + "/files/productos.txt";

export default class productos extends archivosContenedor {
    constructor() {
        super(archivosProductos);
    }
    
    populate = async(quantity) => {
        await this.deleteAll();
        for (let i = 0; i < quantity; i++) {
            await this.save({
                title: ecommerce.productoName(),
                price: ecommerce.price(),
                thumbnail: image.imageUrl()        
            });
        }
        let data = await this.getAll();
        return data;
    }
}

