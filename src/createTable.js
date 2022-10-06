// const options = require('./options/mysql.config.js')
const options = require('./options/sqlite3.config.js')
const knex = require('knex')

const database = knex(options)



database.schema.createTable('chat', table => {
    // table.increments('id')
    // table.string('title', 20) 
    // table.float('price')
    // table.string('thumbnail', 150)
    table.increments('id')
    table.string('email', 50).nullable(false)
    table.date('date')
    table.string('message', 200).nullable(false)
})
    .then( () => console.log('Table created!'))
    .catch( err => console.log(err))
    .finally(() => database.destroy())