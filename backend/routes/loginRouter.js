const router = require('express').Router()
const mongoose = require('mongoose')
const url = process.env.MONGO_URL
const userModel = require('../models/userModel')

mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT", result)
}).catch((err) => {
    console.log("LOGIN MONGO ERR", err)
})

router.post('/', (req, res) => {
    console.log('LOGIN', req.body)
})

router.post('/join', async (req, res) => {
    console.log('JOIN', req.body)
    const userJoin = new userModel({id: req.body.id, pw: req.body.password})
    await userJoin.save()
})

module.exports = router