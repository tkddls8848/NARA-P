const router = require('express').Router()

const searchListModel = require('../models/searchListModel')


router.get('/', async (req, res) => {
    searchListModel.find({}, (err, data) => {
        if(err) {
            res.send('error')
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

module.exports = router