/* GHAP.com */
var server, host, port, fs, path, express, routes, mongoStr, passport, less, utapi, app, pub, bodyParser, mongo;

/* MODS */
fs = require('fs');
path = require('path');
express = require('express');
routes = require('./routes');
less = require('less-middleware');
mongo = require('mongoose');
passport = require('passport');
bodyParser = require('body-parser');

/* APIs */
utapi = require('./routes/api/ultimate_totals');

/* Tools */
utils = require('./src/utils');
config = require('./src/config');
require('./src/passport')(passport);

/* APP */
app = express();
pub = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', pub + '/public/views');
app.set('view engine', 'jade');

app.use(less(path.join(pub, '/src', 'less'), {
    dest: path.join(pub, '/public', 'css')
}));

app.use(express.static(path.join(pub, '/public')));

routes.add(app);

utapi.add(app, passport);

mongo.connect(config.url, function () {
  console.log('MongoDB connected at ' + config.url);
  
  server = app.listen(4000, function () {
      host = server.address().address;
      port = server.address().port;

      console.log('GHAP.com listening at http://%s:%s', host, port);
  });
});
