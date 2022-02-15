const router = require('express').Router()
const mongoose = require('mongoose')
const url = process.env.MONGO_URL
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT", result)
}).catch((err) => {
    console.log("LOGIN MONGO ERR", err)
})

router.post('/logincheck', async (req, res) => {
    let currentUser = await userModel.findOne({id: req.body.id}).exec()    
    console.log("cureentUser", currentUser)
    if(currentUser != null) {
        if(currentUser.pw != req.body.pw) {
            return res.status(200).json({'status': 'wrong password'})
        }        
        const userId = currentUser.id
        const userPw = currentUser.pw

        let token = jwt.sign({'userId': userId}, process.env.TOKEN_SECRET_KEY, {expiresIn: 100000})
        res.cookie('userCookie', token)

        return res.status(200).json({'status': process.env.STATUS_REGITERED})    
    } else {
        return res.status(200).json({'status': process.env.STATUS_NO_REGITERED})
    }    
})

router.post('/join', async (req, res) => {
    console.log('JOIN', req.body)
    const userJoin = new userModel({id: req.body.id, pw: req.body.password, email: req.body.email})

    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: 100000})
    res.cookie('userCookie', token)
    console.log(req.body.id, token)
    await userJoin.save()
    return res.status(200).json({'status': process.env.STATUS_JOIN, 'token': token})
})

router.patch('/modify', async (req, res) => {

    console.log("MODIFY", req.body)
    await userModel.updateOne({id: req.body.id}, {$set: {id: req.body.id, pw: req.body.pw, email: req.body.email}}).exec()

    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: 100000})
    res.cookie('userCookie', token)
    console.log(req.body.id, token)

    return res.status(200).json({'status': process.env.STATUS_MODIFY, 'token': token})
    
})

router.delete('/delete', async (req, res) => {
    console.log('DELETE', req.body)
    await userModel.deleteOne({'id': req.body.id})

    //추후 구현
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: 0})
    console.log(req.signedCookies)

    return res.status(200).json({'status': process.env.STATUS_DELETE, 'token': token})
})

module.exports = router