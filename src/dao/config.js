const persistence = "MONGO";
let productosService, cartsService, mensajesService, authorsService;

switch(persistence) {
    case "MEMORY":
        const {default:Memoryproductos} = await import('./memory/productos.js.js');
        const {default:MemoryCars} = await import('./memory/Carts.js');
        productosService = new Memoryproductos();
        cartsService = new MemoryCars();
        break;
    case "MONGO":
        const {default:Mongoproductos} = await import('./mongo/productos.js');
        const {default:MongoCarts} = await import('./mongo/Carts.js');
        const {default:Mongomensajes} = await import('./mongo/mensajes.js');
        const {default:MongoAuthors} = await import('./mongo/Authors.js');
        productosService = new Mongoproductos();
        cartsService = new MongoCarts();
        mensajesService = new Mongomensajes();
        authorsService = new MongoAuthors();
        break;
    case "FILES":
        const {default:archivosProductos} = await import('./archivos/productos.js');
        const {default:archivosCarts} = await import('./archivos/Carts.js');
        productosService = new archivosProductos();
        cartsService = new archivosCarts();
        break;
};

const services = {
    productosService,
    cartsService,
    mensajesService,
    authorsService
};

export default services;
