const knex = require('knex')

// class ChatManager {
//     create = async (message) => {
//         try {
//             if (fs.existsSync(pathToFile)) {
//                 console.log('hola?')
//                 let data = await fs.promises.readFile(pathToFile, 'utf-8')
//                 let chat = JSON.parse(data)
//                 let id = chat[chat.length-1].id+1
//                 message = {
//                     id,
//                     email: message.email,
//                     timestamp: new Date().toLocaleString(),
//                     message: message.message
//                 }
//                 chat.push(message)
//                 await fs.promises.writeFile(pathToFile, JSON.stringify(chat, null, 2))
//                 return chat
//             } else {
//                 let id = 1
//                 message = {
//                     id,
//                     email: message.email,
//                     timestamp: new Date().toLocaleString(),
//                     message: message.message
//                 }
//                 await fs.promises.writeFile(pathToFile, JSON.stringify([message], null, 2))
//                 console.log([message])
//                 return [message]
//             }
//         } catch(err) {
//             return {status: "error", message: err.message}
//         }
//     }

class ChatManager {
    constructor(options, tableName) {
        const database = knex(options)
        if (!database.schema.hasTable(tableName)) {
            database.schema.createTable(tableName, table => {
                table.increments('id')
                table.string('email', 50).nullable(false)
                table.date('date')
                table.string('message', 200).nullable(false)
            })
                .then(() => console.log('Table created!'))
                .catch(err => console.log(err))
                .finally(() => database.destroy())
        }
        this.database = database
        this.table = tableName
    }



create = async (chat) => {
    await this.database(this.table).insert(chat)
    let chato = this.database(this.table)
    return chato
}


findAll = async () => {

    let data = await this.database.from(this.table).select('*')
    let chat = JSON.parse(JSON.stringify(data))
    return chat
  }
}

module.exports = ChatManager