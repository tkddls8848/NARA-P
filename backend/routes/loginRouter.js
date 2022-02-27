const router = require('express').Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userTaskModel = require('../models/userTaskModel')

router.use(cookieParser())

router.post('/logincheck', async (req, res) => {

    let loadedUser = await userModel.findOne({id: req.body.userId}).exec()    

    if(loadedUser != null) {
        if(loadedUser.pw == req.body.userPw){
            const userId = loadedUser.id
            const userPw = loadedUser.pw
            let token = jwt.sign({'userId': userId}, process.env.TOKEN_SECRET_KEY)
            res.cookie('userCookie', token, {maxAge: 86400})
            return res.status(200).json({'state': process.env.STATUS_REGITERED, 'data': token})    
        } else {
            return res.status(200).json({'state': process.env.STATUS_WRONG_PASSWORD})    
        }
    } else {
        return res.status(200).json({'state': process.env.STATUS_NO_REGITERED})
    }    
})

router.post('/logout', (req, res) => {

    let token = jwt.sign({'userId': req.body.cookie.userCookie}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})

    res.cookie('userCookie', token, {maxAge: 0})
    return res.status(200).json({'message': 'cookie del complete'})
})

router.post('/join', async (req, res) => {

    const userCheck = await userModel.findOne({id:req.body.id})

    if(userCheck == '' || userCheck == null) {
        const userJoin = await new userModel({id: req.body.id, pw: req.body.password, email: req.body.email})
        let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
        res.cookie('userCookie', token, {maxAge: 86400})
        await userJoin.save()
        return res.status(200).json({'state': process.env.STATUS_JOIN, 'token': token})
    } else {
        return res.status(200).json({'state': process.env.STATUS_ALREADY_JOIN})
    }
})

router.patch('/modify', async (req, res) => {

    const result = await userModel.updateOne({id: req.body.id}, {$set: {id: req.body.id, pw: req.body.pw, email: req.body.email}}).exec()

    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
    res.cookie('userCookie', token, {maxAge: 86400})
    return res.status(200).json({'state': process.env.STATUS_MODIFY, 'token': token})    
})

//cookie header 확인필요 후 DELETE메소드 적용
router.post('/delete', async (req, res) => {

    await userModel.deleteOne({'id': req.body.id})
    await userTaskModel.deleteMany({'id': req.body.id})
    
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})

    return res.status(200).json({'state': process.env.STATUS_DELETE, 'token': token})
})

module.exports = router