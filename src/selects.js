// const options = require('./options/mysql.config.js')
const options = require('./options/sqlite3.config.js')
const knex = require('knex')

const database = knex(options)

//SELECT ALL
database.from('chat').select('*')
    .then(data => console.log(JSON.parse(JSON.stringify(data))))
    .catch(err => console.log(err))
    .finally(() => database.destroy())

// SELECT WHERE (FILTRO)    
// database.from('products').select('*').where('price', '>=', 75)
//     .then(data => console.log(JSON.parse(JSON.stringify(data))))
//     .catch(err => console.log(err))
//     .finally(() => database.destroy())
    
//  SELECT BY ID
// database.from('products').select('*').where('id', '1')
//     .then(data => console.log(JSON.parse(JSON.stringify(data))))
//     .catch(err => console.log(err))
//     .finally(() => database.destroy())


//SELECT AND ORDER
// database.from('products').select('title', 'price').orderBy('price') // forma ascendente ('price', 'desc') para forma descendente
//     .then(data => console.log(JSON.parse(JSON.stringify(data))))
//     .catch(err => console.log(err))
//     .finally(() => database.destroy())