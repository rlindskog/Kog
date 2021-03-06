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

// constants
const app = new express
const server = http.createServer(app)
const compiler = webpack(webpackClientConfig)
// custom constants
const FULL_ADDRESS = `http://${config.host}:${config.port}`

// static middleware
app.use(express.static(path.resolve('build', 'client')))

// parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// development middleware
// use this https://github.com/gaearon/react-hot-loader when v3 it's ready
// https://github.com/gaearon/redux-devtools or this when you add redux
// https://github.com/zalmoxisus/redux-devtools-extension
// ... lol
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackClientConfig.output.publicPath,
  }
))
app.use(webpackHotMiddleware(compiler))




app.get('*', (req, res) => {
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
    <meta charset="utf-8"/>
    <title>My First React Router App</title>
    <div id=app>${appHtml}</div>
    <script src="/bundle.client.js"></script>
  `
}

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  // TODO: abstract this shit or subclass 'listen'
  if (config.development) {
    browserSync({
      proxy: FULL_ADDRESS,
      files: ['src/client/**/*.{js,scss,html}'],
      open: false,
    })
  }
  console.log('🌍 listening at %s', FULL_ADDRESS)
})
