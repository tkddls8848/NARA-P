const express = require('express')
const dotenv = require('dotenv').config({ path: '../.env' })
const cors = require('cors')
const cookieParser = require('cookie-parser')

const taskRouter = require('./routes/taskRouter')
const searchRouter = require('./routes/searchRouter')
const loginRouter = require('./routes/loginRouter')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.urlencoded( {extended : true } ))
app.use('/api/v1/task', taskRouter)
app.use('/api/v1/searchList', searchRouter)
app.use('/api/v1/login', loginRouter)

app.listen(process.env.PORT, () => {
    console.log("SERVER ON")
})

app.post('/api/v1/logintask', async (req, res) => {
    //task 1개일 때만 구현됨
    //AWS에서 mongodb로 save안됨
    console.log('logintask_response', req.body, req.body.type)
    const logintask = new naraDataModel({userID: 'logintest', taskType: req.body.type, data: req.body})
    await logintask.save()
})

app.get('/api/v1/multisearch', (req, res) => {
    console.log('multisearch')
})