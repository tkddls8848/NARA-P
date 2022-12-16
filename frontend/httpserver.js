const express = require("express")
const next = require("next")
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env.http.local' })
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const url = process.env.MONGO_URL

const taskRouter = require('./customserver/routes/taskRouter')
const userTaskRouter = require('./customserver/routes/userTaskRouter')
const loginRouter = require('./customserver/routes/loginRouter')
const searchLogicRouter = require('./customserver/routes/searchLogicRouter')
const listSearchRouter = require('./customserver/routes/listSearchRouter')

app.prepare().then(() => {
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
  server.use('/api/v1/list', listSearchRouter)

  mongoose.set('strictQuery', true);  
  mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT")
  }).catch((err) => {
    console.log("LOGIN MONGO ERR", err)
  })

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.get("/test", (req, res) => {
    console.log('TEST')
    return app.render(req, res, "/test")
  })
  
  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log("listening to http server")
  })

})