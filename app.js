/* GHAP.com */
var server, host, port, fs, path, express, routes, 
    less, utapi, app, pub, router, bodyParser, mongo;

/* MODS */
fs = require('fs');
path = require('path');
express = require('express');
routes = require('./routes');
less = require('less-middleware');
mongo = require('mongoose');
bodyParser = require('body-parser');

/* APIs */
utapi = require('./routes/api/ultimate_totals');

/* APP */
app = express();
pub = __dirname;
router = express.Router();
utils = require('./utils');

mongo.connect('mongodb://localhost/ultimate_totals_db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', pub + '/public/views');
app.set('view engine', 'jade');

app.use(less(path.join(pub, '/src', 'less'), {
    dest: path.join(pub, '/public', 'css')
}));

app.use(express.static(path.join(pub, '/public')));

routes.add(app);

utapi.add(app);

server = app.listen(4000, function () {
    host = server.address().address;
    port = server.address().port;

    console.log('GHAP.com listening at http://%s:%s', host, port);
});
