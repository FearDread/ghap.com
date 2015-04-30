fs = require 'fs'
less = require "less-middleware"
express = require 'express'
favicon = require 'serve-favicon'
compress = require 'compression'
body_parser = require 'body-parser'
cookie_parser = require 'cookie-parser'

env = process.env.NODE_ENV

app = express()

global.app = app

pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json'))

app.pkg = pkg

if 'production' == env || 'staging' == env
  app.devMode = false
else if 'local' == env
  app.devMode = true
  for k,v of pkg.devConfig
    pkg.config[k] = v
  for k,v of pkg.localConfig
    pkg.config[k] = v
else
  app.devMode = true
  for k,v of pkg.devConfig
    pkg.config[k] = v

app.use compress()
app.use '/css', (less pkg.config.less_src, dest:pkg.config.less_dst)
app.set 'view engine', 'jade'
app.set "views", pkg.config.view_tpls
app.set "x-powered-by", false
app.use body_parser()
app.use express.static(__dirname + '/public')
app.use cookie_parser()
app.use favicon(__dirname + '/public/favicon.ico')

pg = require 'pg'
app.pg = new pg.Client('tcp://localhost:5432/' + pkg.config.db)
app.pg.connect (err)->
  if err
    console.log 'initial pg BAD - Contact Admin'

app.listen pkg.config.port, ()->
  console.log '\n----------------- XXX ----------------\n'
  console.log pkg.name + ' up on ' + pkg.config.port + ' Environment: ' + process.env.NODE_ENV
  console.log '\n----------------- XXX ----------------\n'

