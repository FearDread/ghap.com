
json = exports.json = (req)->
  return (req.query && req.query.json)

exports.addPackageData = (obj)->
  obj.version = app.pkg.version
  obj.host = app.pkg.config.host
  obj.Host = app.pkg.config.Host
  obj.s3Host = app.pkg.config.s3Host
  obj.appHost = app.pkg.config.appHost
  obj.webHost = app.pkg.config.webHost
  obj.tagline = app.pkg.config.tagline
  obj.appName = app.pkg.name
  obj.port = app.pkg.config.port
  obj.captcha_key = app.pkg.config.captcha_pub
  obj.devMode = app.devMode
  obj.modeProduction = app.modeProduction
  obj.modeDev = app.modeDev
  obj.modeLocal = app.modeLocal
  obj.logo = app.pkg.config.logo
  obj.login_logo = app.pkg.config.login_logo
  obj.release = app.pkg.release || {}
  obj.ga = app.pkg.ga || ''

exports.renderRoute = (req, res, view, obj)->
  if !obj
    obj = {}

  if app.devMode
    obj.path = req.path
  exports.addPackageData obj

  if req.user && typeof(req.user) != 'string'
    obj.user = req.user
  else
    delete obj.user

  if json req
    res.send obj
  else
    res.render view, obj

exports.routeData = (req, res, obj)->
  if !obj
    obj = {}

  if app.devMode
    obj.path = req.path
  exports.addPackageData obj

  if req.user && typeof(req.user) != 'string'
    obj.user = req.user
  else
    delete obj.user

  res.send obj
