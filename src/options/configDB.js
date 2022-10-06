import knex from 'knex';

const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: '../database/ecommerce.sqlite'
    },
    useNullAsDefault: true,
}

const mariaDBOptions = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mibase'
    }
}

let db = knex(mariaDBOptions);
    try {
         let exists = await db.schema.hastable('productos');
         if (exists) {
        //Persistencia
        // await db('productos').del();
        }else {
        await db.schema.createtable('productos', table => {
            table.increments('id');
            table.string('title');
            table.string('thumbnail');
            table.float('price');
        })
            .then(() => console.log("table productos creada."))
            .catch(err => { console.log(err); throw err; });
        }
    } catch (error) {
        console.log(error);
    }

    try {
    let exists = await db.schema.hastable('chat');
    if (exists) {
        //Persistencia
        //  await db('chat').del();
    } else {
        await db.schema.createtable('chat', table => {
            table.increments('id');
            table.string('email', 50);
            table.string('mensaje', 300);
            table.string('date', 30);
        })
            .then(() => console.log("table chat creada."))
            .catch(err => { console.log(err); throw err; });
        }
    } catch (error) {
       console.log(error);
    }

export default db;

