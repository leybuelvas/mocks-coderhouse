import mongoose from "mongoose"; 
import MongoDBContainer from "./MongoDBContainer.js";
import faker from 'faker';

faker.locale = 'es';
const {ecommerce, image} = faker;
const collection = 'productos';

const productosSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price:{
        type:Number,
        require: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    stock: Number,
    description: {
        type: String,
        default: ""
    }
}, {timestamps: true});

export default class productos extends MongoDBContainer {
    constructor() {
        super(collection, productosSchema);
    }

    populate = async(quantity) => {
        await this.deleteAll();
        for (let i = 0; i < quantity; i++) {
            await this.save({
                title: ecommerce.productoName(),
                price: ecommerce.price(),
                thumbnail: image.image()        
            });
        }
        let data = await this.getAll();
        return data;
    }
}