const router = require('express').Router()
const mongoose = require('mongoose')
const url = process.env.MONGO_URL
const userModel = require('../models/userModel')

mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT", result)
}).catch((err) => {
    console.log("LOGIN MONGO ERR", err)
})

router.post('/', async (req, res) => {
    console.log('/', req.body, typeof(req.body.id))
    const currentUser = await userModel.findOne({id: req.body.id}).exec()
    if (currentUser == null) {
        return res.json({id: 'TESTNULL', pw: 'TESTNULL', 'status': process.env.STATUS_NO_REGITERED})
    } else {
        const userId = currentUser.id
        const userPw = currentUser.pw
        return res.json({id: userId, pw: userPw, 'status': process.env.STATUS_REGITERED})
    }
})

router.post('/join', async (req, res) => {
    console.log('JOIN', req.body)
    const userJoin = new userModel({id: req.body.id, pw: req.body.password, email: req.body.email})
    await userJoin.save()
    return res.json({'status': process.env.STATUS_JOIN})
})

router.patch('/modify', async (req, res) => {
    if(req.body.status == process.env.STATUS_NO_REGITERED) {
        console.log('not register')
        return res.status(404)
    } else if(req.body.status == process.env.STATUS_REGITERED) {
        console.log("MODIFY", req.body)
        await userModel.updateOne({id: req.body.id}, {$set: {id: req.body.id, pw: req.body.pw, email: req.body.email}}).exec()
        return res.json({'message':'user update complete'})
    }
})

router.delete('/delete', async (req, res) => {
    console.log('DELETE', req.body)
    const uid = req.body.id
    await userModel.deleteOne({'id': req.body.id})
    return res.json({'message': uid + ' ' + 'delete comlpete'})
})

module.exports = router