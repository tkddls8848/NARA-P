const router = require('express').Router()

const archiveModel = require('../models/archive/archiveDataModel')


router.get('/', async (req, res) => {
    archiveModel.find({}, (err, data) => {
        if(err) {
            res.send('error')
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

module.exports = router