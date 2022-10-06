const knex = require('knex')


class ProductManager {
    constructor(options, tableName) {
        const database = knex(options)
        if (!database.schema.hasTable(tableName)) {
            database.schema.createTable(tableName, table => {
                table.increments('id')
                table.string('title', 15).nullable(false)
                table.float('price').nullable(false)
                table.string('thumbnail', 128).nullable(false)
            })
                .then(() => console.log('Table created!'))
                .catch(err => console.log(err))
                .finally(() => database.destroy())
        }
        this.database = database
        this.table = tableName
    }
  

//   create = async (product) => {
//     return await this.database(this.table).insert(product)
//     .then(() => {
//         console.log('Product inserted')
//         this.findAll()
//     })
//   } 

create = async (product) => {
    
    await this.database(this.table).insert(product)
    let productos = this.database(this.table)
    return productos
}




findAll = async () => {

    let data = await this.database.from(this.table).select('*')
    let products = JSON.parse(JSON.stringify(data))
    return products
  }
}

module.exports = ProductManager