import fs from 'fs';

export default class archivosContenedor {
    constructor(name) {
        this.name = name;
        this.list = [];
        this.id = 0;
        this.main();
    }



    save = async (object) => {
        this.id++;
        object['id'] = this.id;
        object['timestamp'] = Date.now();
        let list = await this.getAll();
        list.push(object);
        await this.writeFile(list);
        return this.id;
    }



    getById = async(numberId) => {
        let list = await this.getAll();
        let object = list.filter((object) => {
            return object.id == numberId;
        });
        return object.length != 0 ? object[0] : null;
    }



    getAll = async() => {
        this.main();
        return this.list;
    }



    deleteById = async(numberId) => {
        let list = await this.getAll();
        list = list.filter((object) => {
            return object.id != numberId;
        });
        await this.writeFile(list);
    }



    deleteAll = async() => {
        let list = await this.getAll();
        for (let i = list.length; i > 0; i--) {
            list.pop();
        }
        await this.writeFile(list);
    }

    main = async() => {
        try {
            const elements = await fs.promises.readFile(this.name);
            this.list = JSON.parse(elements);
            for(let element of this.list) {
                if (element.id > this.id) {
                    this.id = element.id;
                }
            }
        } catch (error) {
            console.log(`Actualmente no existe un archivo de productos con el nombre: ${this.name}`);
        }
    }



    updateById = async(numberId, object) => {
        let list = await this.getAll();
        let position = list.findIndex((objectI) => {
            return objectI.id == numberId;
        });
        if(position != -1) {
            object.id = list[position].id;
            list[position] = object; 
            await this.writeFile(list);
            return object;
        }
        return null        
    }



    isExist = async(code) => {
        let list = await this.getAll();
        let producto = list.filter((object) => {
            return object.code == code;
        });
        return producto.length != 0 ? true : false;
    }
    


    writeFile = async(list) => {
        await fs.promises.writeFile(
            this.name,
            JSON.stringify(list, null, 2)
        );
    }

    deleteproductoById = async(numberIdCart, numberIdproducto)=> {
        let list = await this.getAll();
        list.filter((cart) => {
            return cart.id == numberIdCart;
        })[0].productos = list.filter((cart) => {
            return cart.id == numberIdCart;
        })[0].productos.filter((producto) => {
            return producto.id != numberIdproducto;
        });
        await this.writeFile(list);
    }



    saveproductoById = async(numberIdCart, numberIdproducto) => {
        let list = await this.getAll();
        let cartIndex = list.findIndex((object) => {
            return object.id == numberIdCart;
        });
        let productoIndex = list[cartIndex].productos.findIndex((object) => {
            return object.id == numberIdproducto;
        });
        if(productoIndex != -1) {
            list[cartIndex].productos[productoIndex].quantity = list[cartIndex].productos[productoIndex].quantity + 1;
        }
        else {
            list[cartIndex].productos.push({ "id": numberIdproducto, "quantity": 1 });
        }
        await this.writeFile(list);
    }



    getproductosById = async(numberId, productosList) => {
        let list = await this.getAll();
        let productos = list.filter((object) => {
            return object.id == numberId;
        })[0].productos;
        if(productos.length != 0){
            let p =  productos.map((pCart) => {
                let productoIndex = productosList.filter((object) => {
                    return object.id == pCart.id;
                });
                if(productoIndex.length != 0){
                    productoIndex[0].quantity = pCart.quantity;
                    return productoIndex[0];
                }
            })
            return p;
        }
        return productos;    
    }
}
