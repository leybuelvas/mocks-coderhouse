const socket = io.connect();
let productos = [];


socket.on('mensajes', data => {
    render(data);
});


socket.on('productos', data => {
    rendertable(data.productos);
});



function render(data) {
    console.log("render",data)
    if(data.compr != undefined) {
        $("#compr").append(`(Comprensión ` + `${data.compr}` + `%)`);
    }
   data.forEach((elem) => {
        $("#mensajes").append(`
            <div> 
                <strong class="text-primary">${elem.author.email}</strong>
                <em class="text-brown">[${elem.date}]: </em> 
                <em class="fst-italic text-success">${elem.text}</em>
                <em><img src="${elem.author.avatar}" width="40px"></em>
            </div>
        `)
    });
}


async function rendertable(productosData) {
    const response = await fetch("/tableproductos.handlebars");
    const source = await response.text();
    const template = Handlebars.compile(source);
    const context = { productos: productosData };
    let html = template(context);
    $("#tableproductos").empty();
    $("#tableproductos").append(html);
}
$("#formChat").submit((e) => {
    e.preventDefault();
    const menssage = {
        author: {
            email: $('#email').val(),
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            edad: $('#edad').val(),
            alias: $('#alias').val(),
            avatar: $('#avatar').val() 
        },
        date: new Date().toLocaleString(),
        text: $('#mensaje').val()
    };
    socket.emit('new-mensaje', menssage);
    emptyInput('#mensaje');
});
$("#formproducto").submit(async(e) => {
    e.preventDefault();
    const producto = {
        title: $('#title').val(),
        price: $('#price').val(),
        thumbnail: $('#thumbnail').val(),
    };
    await socket.emit('new-producto', producto);
    emptyInput('#title');
    emptyInput('#price');
    emptyInput('#thumbnail');
});


function emptyInput(value) {
    $(value).val("");
}

