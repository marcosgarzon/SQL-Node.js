const knex = require('knex')
const options = require('../options/mysql.config.js')
const database = knex(options)

class ProductManager {

create = async (product) => {
    let existTable = await database.schema.hasTable('products')
    if (existTable) {
      await database('products').insert(product)
      let data = await database.from('products').select('*')
      let products = JSON.parse(JSON.stringify(data))
      return products
    } else {
      await database.schema.createTable('products', table => {
        table.increments('id')
        table.string('title', 15).nullable(false)
        table.float('price').nullable(false)
        table.string('thumbnail', 128).nullable(false)
      })  
      await database('productos').insert(product)
      let data = await database.from('productos').select('*')
      let products = JSON.parse(JSON.stringify(data))
      return products 
    }
  }

  findAll = async () => {
    let existTable = await database.schema.hasTable('products')
    if (!existTable) return "No se encontraron productos"
    let data = await database.from('products').select('*')
    let products = JSON.parse(JSON.stringify(data))
    return products
  }
}


module.exports = ProductManager