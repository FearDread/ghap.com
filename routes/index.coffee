utils = require '../utils'

exports.addRoutes = (app)->

  app.get '/', (req, res)->
    s3Host = app.pkg.config.s3Host
    obj =
      s3Host:s3Host

    utils.renderRoute req, res, 'home', obj

