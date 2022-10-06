import mongoose from "mongoose"; 
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'carts';

const productosSchema = mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'productos'
            },
            quantity: Number
        }
    ]
}, {timestamps: true});

export default class Carts extends MongoDBContainer {
    constructor() {
        super(collection, productosSchema);
    }
}

