const express = require('express')
const dotenv = require('dotenv').config({ path: '../.env' })
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const url = process.env.MONGO_URL

const taskRouter = require('./routes/taskRouter')
const userTaskRouter = require('./routes/userTaskRouter')
const loginRouter = require('./routes/loginRouter')

mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT")
}).catch((err) => {
    console.log("LOGIN MONGO ERR")
})

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.urlencoded( {extended : true } ))
app.use('/api/v1/task', taskRouter)
app.use('/api/v1/userTask', userTaskRouter)
app.use('/api/v1/login', loginRouter)

app.listen(process.env.PORT, () => {
    console.log("SERVER ON")
})

