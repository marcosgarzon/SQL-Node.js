const options = require('./options/mysql.config.js')
const knex = require('knex')

const database = knex(options)
const products = [
    {title: "Calculadora", price: 100, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'},
    {title: "Lápiz", price: 25, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-256.png'},
    {title: "Reloj", price: 75, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-256.png'},
]

database('products').insert(products)
    .then( (result) => console.log(result))
    .catch(err => console.log(err))
    .finally(() => database.destroy())