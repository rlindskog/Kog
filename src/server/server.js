import bodyParser from 'body-parser'
import config from './kog/config'
import express from 'express'
import fs from 'fs'
import http from 'http'
import path from 'path'

// React
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../shared/routes'

// TODO: this shit should be abstracted and exported from Kog the framework
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackClientConfig from '../../boilerplate/webpack/webpack.client.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = new express
const server = http.createServer(app)
const compiler = webpack(webpackClientConfig)

// static middleware
app.use(express.static(path.resolve('build', 'client')))

// parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// development middleware
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackClientConfig.output.publicPath,
    // proxy: {
    //   '/': {
    //     secure: false,
    //     target:'http://localhost:7000'
    //   }
    // }
  }
))


// use this https://github.com/gaearon/react-hot-loader when it comes out
// "Redux is a Flux implementation that supports hot reloading of everything out of the box."
// ??!!
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
  // res.sendFile(path.resolve('src', 'client', 'index.html'))
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public "storage">
    <html>
    <meta charset=utf-8/>
    <link rel="stylesheet" href="/index.css" />
    <title>My First React Router App</title>
    <div id=app>${appHtml}</div>
    <script src="/bundle.client.js"></script>
  `
}

app.listen(7000, (err) => {
  if (err) {
    console.log(err)
  }
  // TODO: abstract this shit or subclass 'listen'
  if (!config.isProduction) {
    browserSync({
      proxy: 'http://localhost:7000',
      files: ['src/client/**/*.{js,scss,html}'],
      open: false,
    })
  }
  console.log('🌍 listening at http://%s:%s', config.host, config.port)
})
