const options = require('./options/mysql.config.js')
const knex = require('knex')

const database = knex(options)

database.from('products').where('price', '>', 0).del()
    .then( () => console.log('Product deleted!'))
    .catch(err => console.log(err))
    .finally(() => database.destroy())