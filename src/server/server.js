import bodyParser from 'body-parser'
import browserSync from 'browser-sync'
import config from './kog/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import path from 'path'

const app = new express
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(7000, (err) => {
  if (err) {
    console.log(err)
  }
  if (!config.isProduction) {
    browserSync({
      proxy: 'http://localhost:7000',
      files: ['src/client/**/*.{js,scss,html}'],
      open: false
    })
  }
  console.log('🌍 listening at http://%s:%s', config.host, config.port)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src', 'client', 'index.html'))
})
