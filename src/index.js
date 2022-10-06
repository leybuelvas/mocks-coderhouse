import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import services from "../src/dao/config.js";

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("Error", error => console.log(`Error en servidor ${error}`));

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(__dirname+'/public'));

app.engine(
    "handlebars",
    handlebars.engine()
);

app.set('views', './views');
app.set('view engine', 'handlebars');

io.on('connection', async(socket) => {
    let id = 0;
    console.log('Un cliente nuevo se ha conectado');
    socket.emit('mensajes', await services.mensajesService.muestroChats());
    socket.emit('productos', {productos : await services.productosService.getAll()});
    socket.on('new-mensaje', async(data) => {
        try {
            let author = await services.authorsService.getIdAuthor(data.author);
            let mensaje = {
                author: author,
                text: data.text
            }
            await services.mensajesService.save(mensaje);
            io.sockets.emit('mensajes', [data]);
        } catch (error) {
            console.error("new-producto",error);
        }
    });

    socket.on('new-producto', async(data) => {
        try {
            await services.productosService.save(data);
            try {
                let productosAll = await services.productosService.getAll();
                io.sockets.emit('productos', {productos : productosAll});
            } catch (error) {
                console.error("productos-socket-emit",error);
            }
        } catch (error) {
            console.error("new-producto",error);
        }
    });
})


app.get("/", async(req, res) => {
    try {
        let productosAll = await services.productosService.getAll();
        res.render('indexForm');
    } catch (error) {
        console.error("/",error)
    }
});


app.get("/api/productos-test", async(req, res) => {
    let testproductos = await services.productosService.populate(5);
    res.send(testproductos);
});


app.get("/api/chat-normalizado", async(req, res) => {
    let chat = await services.mensajesService.chatsNormalized();
    res.send(chat);
});


app.get("/api/chat-denormalizado", async(req, res) => {
    let chat = await services.mensajesService.chatsDenormalized();
    res.send(chat);
});


app.get('/api/chats',async(req,res) => {
    let result = await services.mensajesService.muestroChats()
    let mensajes = {
      id: 'mensajes',
      mensajes: result
    }
    res.send(mensajes)
  })

  