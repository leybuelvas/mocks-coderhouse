export default class ContenedorMem {
    constructor() {
        this.data = [];
        this.id = 0;
    }
    

    getAll = () => {
        return this.data;
    }


    save = (element) => {
        this.id++;
        element['id'] = this.id;
        element['timestamp'] = Date.now();
        this.data.push(element);
        return element.id;
    }



    getById = (numberId) => {
        let object = this.data.filter((object) => {
            return object.id == numberId;
        });
        return object.length != 0 ? object[0] : null;
    }



    deleteById = (numberId) => {
        this.data = this.data.filter((object) => {
            return object.id != numberId;
        })
    }



    deleteAll = () => {
        for (let i = this.data.length; i > 0; i--) {
            this.data.pop();
        }
    }



    updateById = (numberId, object) => {
        let position = this.data.findIndex((objectI) => {
            return objectI.id == numberId;
        });
        if(position != -1) {
            object.id = this.data[position].id;
            this.data[position] = object;  
            return object;
        }
        return null        
    }



    isExist = (code) => {
        let element = this.data.filter((object) => {
            return object.code == code;
        });
        return element.length != 0 ? true : false;
    }



    deleteproductoById = (numberIdCart, numberIdproducto) => {
        this.data.filter((cart) => {
            return cart.id == numberIdCart;
        })[0].productos = this.data.filter((cart) => {
            return cart.id == numberIdCart;
        })[0].productos.filter((producto) => {
            return producto.id != numberIdproducto;
        });
    }



    saveproductoById = (numberIdCart, numberIdproducto) => {    
        let cartIndex = this.data.findIndex((object) => {
            return object.id == numberIdCart;
        });
        let productoIndex = this.data[cartIndex].productos.findIndex((object) => {
            return object.id == numberIdproducto;
        });
        if(productoIndex != -1) {
            this.data[cartIndex].productos[productoIndex].quantity = this.data[cartIndex].productos[productoIndex].quantity + 1;
        }
        else {
            this.data[cartIndex].productos.push({ "id": numberIdproducto, "quantity": 1 });
        }
    }



    getproductosById = (numberId, productosList) => {        
        let productos = this.data.filter((object) => {
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

