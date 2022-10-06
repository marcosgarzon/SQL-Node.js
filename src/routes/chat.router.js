const express = require('express')
const router = express.Router()
const options = require('../options/sqlite3.config.js')

const Manager = require('../controllers/chat.manager.js')
const manager = new Manager(options, 'chat')

router.get('/', (req, res) => {
    manager.findAll()
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err}))
    .finally(() => database.destroy())
})

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.message) return res.send({error: 'data is required'})
    manager.create(req.body)
         .then(result => res.send(result))
         .catch(err => res.send({error: 0, descripcion: err}))
})

module.exports = router