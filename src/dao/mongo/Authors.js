import mongoose from "mongoose"; 
import MongoDBContainer from "./MongoDBContainer.js";
import faker from 'faker';

faker.locale = 'es';
const {name, internet} = faker;
const collection = 'authors';

const authorsSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    alias: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    }
});

export default class Authors extends MongoDBContainer {
    constructor() {
        super(collection, authorsSchema);
    }
    
    populate = async(quantity) => {
        await this.deleteAll();
        for (let i = 0; i < quantity; i++) {
            await this.save({
                email: internet.email(),
                nombre: name.firstName(),
                apellido: name.lastName(),
                edad: parseInt(14),
                alias: internet.userName(),
                avatar: internet.avatar()        
            });
        }
        let data = await this.getAll();
        return data;
    }

    createAuthor = (data) => {
        return data.author = {
            email: data.email,
            nombre: data.nombre,
            apellido: data.apellido,
            edad: parseInt(data.edad),
            alias: data.alias,
            avatar: data.avatar        
        }
    }
}

