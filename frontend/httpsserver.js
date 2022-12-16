const express = require("express")
const next = require("next")
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env.https.local' })
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const url = process.env.MONGO_URL

const fs = require('fs')
const key = fs.readFileSync('./localhost-key.pem')
const cert = fs.readFileSync('./localhost.pem')

const taskRouter = require('./customserver/routes/taskRouter')
const userTaskRouter = require('./customserver/routes/userTaskRouter')
const loginRouter = require('./customserver/routes/loginRouter')
const searchLogicRouter = require('./customserver/routes/searchLogicRouter')
const listSearchRouter = require('./customserver/routes/listSearchRouter')

app.prepare().then(() => {
  const server = express()
  const https = require('https')
  const httpsServer = https.createServer({key: key, cert: cert }, server)

  server.use(cookieParser())
  server.use(express.json())
  server.use(cors({
      origin: true,
      credentials: true
  }))
  server.use(express.urlencoded( {extended : true } ))  
  server.use('/api/v1/task', taskRouter)
  server.use('/api/v1/usertask', userTaskRouter)
  server.use('/api/v1/login', loginRouter)
  server.use('/api/v1/logic', searchLogicRouter)
  server.use('/api/v1/list', listSearchRouter)

  mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT")
  }).catch((err) => {
    console.log("LOGIN MONGO ERR")
  })

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.get("/test", (req, res) => {
    console.log('TEST')
    return app.render(req, res, "/test")
  })

  httpsServer.listen(process.env.PORT, (err) => {
    //자체 발급 localhost용 인증서에 대해 유효성 검증 안함
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    if (err) throw err
    console.log("listening to https server")
  })


})