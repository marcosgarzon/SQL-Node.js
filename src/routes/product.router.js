const express = require('express')
const router = express.Router()
const options = require('../options/mysql.config.js')

const Manager = require('../controllers/product.manager')
const manager = new Manager(options, 'products')



router.get('/', (req, res) => {
    
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, descripcion: err}))
        .finally(() => database.destroy())
})


router.post('/', (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
    manager.create(req.body)
     .then(result => res.send(result))
     .catch(err => res.send({error: 0, descripcion: err}))
     


})

// router.put('/:id', (req, res) => {
//     if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
//     let result = manager.update(req.params.id, req.body)
//     if (!result) return res.send({error: 'product was not found'})
//     res.send(result)
// })

// router.delete('/:id', (req, res) => {
//     let result = manager.delete(req.params.id)
//     res.send(result)
// })

module.exports = router