const options = require('./options/sqlite3.config.js')
const knex = require('knex')

const database = knex(options)
const products = [
    {title: "Calculadora", price: 100, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'},
    {title: "Lápiz", price: 25, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-256.png'},
    {title: "Reloj", price: 75, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-256.png'},
]


const processDB = async () => {
let existTable = await database.schema.hasTable('products')
if(exisTable) {
    await database.schema.dropTable('products')
}
await database.schema.createTable('products', table => {
    table.increments('id')
    table.string('title', 20).nullable(false) 
    table.float('price').nullable(false) 
    table.string('thumbnail', 150).nullable(false) 
})
await database('products').insert(products)
let results = JSON.parse(JSON.stringify(await database.from('products').select('*')))
console.log(results)
await database.from('products').where('id', 3).del()
await database.from('products').where('id', 2).update({price: 15})
database.destroy()
}

processDB()