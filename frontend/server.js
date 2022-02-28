const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config({ path: './.env.local' })
const url = process.env.MONGO_URL

const taskRouter = require('./server/routes/taskRouter')
const userTaskRouter = require('./server/routes/userTaskRouter')
const loginRouter = require('./server/routes/loginRouter')
const searchLogicRouter = require('./server/routes/searchLogicRouter')

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser())
  server.use(express.json())
  server.use(cors({
      origin: true,
      credentials: true
    }))
  server.use(express.urlencoded( {extended : true } ))
  server.use('/api/v1/task', taskRouter)
  server.use('/api/v1/userTask', userTaskRouter)
  server.use('/api/v1/login', loginRouter)
  server.use('/api/v1/logic', searchLogicRouter)

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  mongoose.connect(url).then((result) => {
    console.log("LOGIN MONGO CONNECT")
  }).catch((err) => {
    console.log("LOGIN MONGO ERR")
  })

  server.get("/test", (req, res) => {
    return app.render(req, res, "/test");
  });

  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("listening to 3000");
  });
});