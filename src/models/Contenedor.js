import fs from 'fs';

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
        this.listaContenedor = [];
        this.id = 0;
        this.main()
    }

    save(object) {
        this.id++;
        object['id'] = this.id;
        this.listaContenedor.push(object);
        return this.id;
    }

    getById(numberId) {
        let object = this.listaContenedor.filter((object) => {
            return object.id == numberId;
        });
        return object.length != 0 ? object[0] : null;
    }


    getAll() {
        return this.listaContenedor;
    }


    deleteById(numberId) {
            this.listaContenedor = this.listaContenedor.filter((object) => {
            return object.id != numberId;
        })
    }


    deleteAll() {
        for (let i = this.listaContenedor.length; i > 0; i--) {
            this.listaContenedor.pop();
        }
    }


    async main() {
        try {
            const contenido = await fs.promises.readFile(this.nombre);
            this.listaContenedor = JSON.parse(contenido);
            for(let contenedor of this.listaContenedor) {
                if (contenedor.id > this.id) {
                    this.id = contenedor.id;
                }
            }
        } catch (error) {
            console.log(`Actualmente no existe un archivo con el nombre: ${this.nombre}`);
        }
    }


    updateById(numberId, object) {
        let posicion = this.listaContenedor.findIndex((objectI) => {
            return objectI.id == numberId;
        });
        if(posicion != -1) {
            object.id = this.listaContenedor[posicion].id;
            this.listaContenedor[posicion] = object; 
            return object;
        }
        return null        
    }
}

export default Contenedor;
