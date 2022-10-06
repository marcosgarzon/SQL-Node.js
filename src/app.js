const express = require('express')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const productRouter = require('./routes/product.router')
const chatRouter = require('./routes/chat.router')
const options1 = require('./options/mysql.config.js')
const options2 = require('./options/sqlite3.config.js')
const knex = require('knex')

const ProductManager = require('./controllers/product.manager')
const ChatManager = require('./controllers/chat.manager')

const productManager = new ProductManager()
const chatManager = new ChatManager()


const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/content', express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views') // app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('create-product')
})

app.use('/products', productRouter)
app.use('/chat', chatRouter)

io.on('connection', socket => {
    console.log(`Client ${socket.id} connected...`)

    productManager.findAll().then( result => socket.emit('history', result))
                                .catch(err => console.log(err))
           
    chatManager.findAll().then(result => socket.emit('chatHistory', result))
                                .catch(err => console.log(err))

    socket.on('products', data => {
        io.emit('history', data)
    })
    socket.on('chat', data => {
        io.emit('chatHistory', data)
    })
})