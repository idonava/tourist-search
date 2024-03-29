const routing  = require('./routing/index.js')
const db = require('./db')
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
  const server = express()
  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  server.use('/routing', routing);
  server.use('/db', db);



  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3100, (err) => {
    if (err) throw err
  })
  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})