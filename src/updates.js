const options = require('./options/mysql.config.js')
const knex = require('knex')

const database = knex(options)

database.from('products').where('title', 'Calculadora').update({price: 95})
    .then( () => console.log('Product updated!'))
    .catch(err => console.log(err))
    .finally(() => database.destroy())