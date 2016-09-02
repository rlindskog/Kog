// this shit should be abstracted...
/********************/

/********************/

import http from 'http'
import express from 'express'
import path from 'path'
import config from './fade/config'

const app = express()
const server = http.createServer(app)

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('🌍 listening at http://%s:%s', config.host, config.port)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src', 'client', 'index.html'))
})
