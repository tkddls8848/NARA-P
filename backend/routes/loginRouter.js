const router = require('express').Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userTaskModel = require('../models/userTaskModel')

router.use(cookieParser())

router.post('/logincheck', async (req, res) => {
    let loadedUser = await userModel.findOne({id: req.body.userId}).exec()    
    console.log("cureentUser", loadedUser, req.body.userPw)
    if(loadedUser != null) {
        if(loadedUser.pw == req.body.userPw){
            const userId = loadedUser.id
            const userPw = loadedUser.pw
            let token = jwt.sign({'userId': userId}, process.env.TOKEN_SECRET_KEY)
            res.cookie('userCookie', token, {maxAge: 100000000000})
            return res.status(200).json({'state': process.env.STATUS_REGITERED, 'data': token})    
        } else {
            return res.status(200).json({'state': process.env.STATUS_WRONG_PASSWORD})    
        }
    } else {
        return res.status(200).json({'state': process.env.STATUS_NO_REGITERED})
    }    
})

router.post('/logout', (req, res) => {
    console.log('LOGOUT', req.body.cookie.userCookie)
    let token = jwt.sign({'userId': req.body.cookie.userCookie}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})
    res.cookie('userCookie', token, {maxAge: 0})
    return res.status(200).json({'message': 'cookie del complete'})
})

router.post('/join', async (req, res) => {
    console.log('JOIN',req.body.id)
    const userCheck = await userModel.findOne({id:req.body.id})
    console.log("userCheck", userCheck)

    if(userCheck == '' || userCheck == null) {
        const userJoin = await new userModel({id: req.body.id, pw: req.body.password, email: req.body.email})
        let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
        res.cookie('userCookie', token, {maxAge: 1000000})
        await userJoin.save()
        return res.status(200).json({'state': process.env.STATUS_JOIN, 'token': token})
    } else {
        return res.status(200).json({'state': process.env.STATUS_ALREADY_JOIN})
    }

})

router.patch('/modify', async (req, res) => {
    console.log("MODIFY")
    const result = await userModel.updateOne({id: req.body.id}, {$set: {id: req.body.id, pw: req.body.pw, email: req.body.email}}).exec()
    console.log(result)
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
    res.cookie('userCookie', token, {maxAge: 12345})
    return res.status(200).json({'state': process.env.STATUS_MODIFY, 'token': token})    
})

//cookie header 확인필요 후 DELETE메소드 적용
router.post('/delete', async (req, res) => {
    console.log('DELETE')
    await userModel.deleteOne({'id': req.body.id})
    await userTaskModel.deleteMany({'id': req.body.id})
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})
    res.cookie('userCookie', token, {maxAge: 0})
    return res.status(200).json({'state': process.env.STATUS_DELETE, 'token': token})
})

module.exports = router