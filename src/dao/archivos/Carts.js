import archivosContenedor from "./archivosContenedor.js";
import __dirname from "../../utils.js";

const archivosCarts = __dirname + "/files/carts.txt";

export default class Carts extends archivosContenedor {
    constructor() {
        super(archivosCarts);
    }
};

