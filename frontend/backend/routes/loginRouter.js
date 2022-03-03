const router = require('express').Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userTaskModel = require('../models/userTaskModel')

router.use(cookieParser())

router.post('/signin', async (req, res) => {
    const signinUser = await userModel.findOne({user_id: req.body.user_id}).exec()    
    if(signinUser != null) {
        if(signinUser.user_pw == req.body.user_pw){
            const userId = signinUser.user_id
            const userPw = signinUser.user_pw
            const token = jwt.sign({'userId': userId}, process.env.TOKEN_SECRET_KEY)
            res.cookie('userCookie', token, {maxAge: 8640000})
            return res.status(200).json({'state': process.env.STATUS_REGITERED, 'data': token})    
        } else {
            return res.status(200).json({'state': process.env.STATUS_WRONG_PASSWORD})    
        }
    } else {
        return res.status(200).json({'state': process.env.STATUS_NO_REGITERED})
    }    
})

router.get('/:userId', (req, res) => {
    console.log('LOGOUT')
    const token = jwt.sign({'userId': req.params.userId}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})
    res.cookie('userCookie', token, {maxAge: 0})
    return res.status(200).json({'message': 'cookie del complete'})
})

router.post('/', async (req, res) => {    
    console.log("POST", req.body)
    const userCheck = await userModel.findOne({user_id:req.body.user_id})
    if(userCheck == '' || userCheck == null) {
        const userJoin = await new userModel({user_id: req.body.user_id, user_pw: req.body.user_pw, e_mail: req.body.e_mail})
        const token = jwt.sign({'userId': req.body.user_id}, process.env.TOKEN_SECRET_KEY)
        res.cookie('userCookie', token, {maxAge: 8640000})
        await userJoin.save()
        return res.status(200).json({'state': process.env.STATUS_JOIN, 'token': token})
    } else {
        return res.status(200).json({'state': process.env.STATUS_ALREADY_JOIN})
    }
})

router.patch('/', async (req, res) => {
    await userModel.updateOne({user_id: req.body.user_id}, {$set: {user_id: req.body.user_id, user_pw: req.body.user_pw, e_mail: req.body.e_mail}}).exec()
    const token = jwt.sign({'userId': req.body.user_id}, process.env.TOKEN_SECRET_KEY)
    res.cookie('userCookie', token, {maxAge: 8640000})
    return res.status(200).json({'state': process.env.STATUS_MODIFY, 'token': token})    
})

router.delete('/:userId', async (req, res) => {
    await userModel.deleteOne({'user_id': req.params.userId})
    await userTaskModel.deleteMany({'user_id': req.params.userId})    
    const token = jwt.sign({'userId': req.params.userId}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})
    res.cookie('userCookie', token, {maxAge: 0})
    return res.status(200).json({'state': process.env.STATUS_DELETE, 'token': token})
})

module.exports = router