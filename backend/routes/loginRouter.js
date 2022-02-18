const router = require('express').Router()
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.get('/logincheck/:UserId', async (req, res) => {
    let currentUser = await userModel.findOne({id: req.params.UserId}).exec()    
    console.log("cureentUser", currentUser)
    if(currentUser != null) {
        const userId = currentUser.id
        const userPw = currentUser.pw
        let token = jwt.sign({'userId': userId}, process.env.TOKEN_SECRET_KEY)
        res.cookie('userCookie', token, {maxAge: 100000})
        return res.status(200).json({'status': process.env.STATUS_REGITERED, 'data': token})    
    } else {
        return res.status(200).json({'status': process.env.STATUS_NO_REGITERED})
    }    
})

router.post('/join', async (req, res) => {
    console.log('JOIN', req.body)
    const userJoin = new userModel({id: req.body.id, pw: req.body.password, email: req.body.email})
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
    res.cookie('userCookie', token, {maxAge: 1000000})
    console.log(res.getHeaderNames())
    console.log(res.getHeader('set-cookie'))
    await userJoin.save()
    return res.status(200).json({'status': process.env.STATUS_JOIN, 'token': token})
})

router.patch('/modify', async (req, res) => {

    console.log("MODIFY", req.body)
    await userModel.updateOne({id: req.body.id}, {$set: {id: req.body.id, pw: req.body.pw, email: req.body.email}}).exec()

    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY)
    res.cookie('userCookie', token, {maxAge: 12345})
    console.log(res.getHeaderNames())
    console.log(res.getHeader('set-cookie'))
    return res.status(200).json({'status': process.env.STATUS_MODIFY, 'token': token})
    
})

//cookie header 확인필요 후 DELETE메소드 적용
router.post('/delete', async (req, res) => {
    console.log('DELETE', req.body.id)
    await userModel.deleteOne({'id': req.body.id})
    let token = jwt.sign({'userId': req.body.id}, process.env.TOKEN_SECRET_KEY, {expiresIn: '1s'})
    res.cookie('userCookie', token, {maxAge: 0})
    console.log(res.getHeaderNames())
    console.log(res.getHeader('set-cookie'))
    return res.status(200).json({'status': process.env.STATUS_DELETE, 'token': token})
})

module.exports = router