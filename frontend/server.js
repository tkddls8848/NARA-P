const express = require("express")
const next = require("next")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config({ path: './.env.local' })
const url = process.env.MONGO_URL

//const fs = require('fs');
//const key = fs.readFileSync('./localhost-key.pem');
//const cert = fs.readFileSync('./localhost.pem');

const taskRouter = require('./server/routes/taskRouter')
const userTaskRouter = require('./server/routes/userTaskRouter')
const loginRouter = require('./server/routes/loginRouter')
const searchLogicRouter = require('./server/routes/searchLogicRouter')

app.prepare().then(() => {
  const https = require('https')
  const server = express()
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

    server.get("*", (req, res) => {
    return handle(req, res)
    })
    
    server.all('/_next/webpack-hmr', (req, res) => {
      nextjsRequestHandler(req, res)
    })
  
  mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT")
  }).catch((err) => {
    console.log("LOGIN MONGO ERR")
  })

  server.get("/test", (req, res) => {
    console.log('TEST')
    return app.render(req, res, "/test")
  })

  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log("listening to http server")
  })
/*
  const httpsServer = https.createServer({key: key, cert: cert}, server)

  httpsServer.listen(process.env.PORT, (err) => {
    //자체 발급 localhost용 인증서에 대해 유효성 검증 안함
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    if (err) throw err
    console.log("listening to https server")
  })
*/

})