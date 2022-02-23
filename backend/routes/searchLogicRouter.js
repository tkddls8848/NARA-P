const router = require('express').Router()

const searchLogicModel = require('../models/searchLogicModel')


router.get('/', async (req, res) => {
    searchLogicModel.find({}, (err, data) => {
        if(err) {
            res.send('error')
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

module.exports = router