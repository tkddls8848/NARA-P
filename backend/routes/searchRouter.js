const router = require('express').Router()

const naraDataModel = require('../models/naraDataModel')
const searchListModel = require('../models/searchListModel')
const mongoose = require('mongoose')
const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
    console.log("MONGO CONNECT")
}).catch((err) => {
    console.log("MONGO ERR", err)
})

router.get('/', (req, res) => {
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