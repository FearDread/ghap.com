/* GHAP.com */
var server, host, port, fs, path, express, routes, 
    less, utapi, app, pub, router;

fs = require('fs');
path = require('path');
express = require('express');
routes = require('./routes');
less = require('less-middleware');
/* APIs */
utapi = require('./routes/api/ut');

/* APP */
app = express();
pub = __dirname;
router = express.Router();

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
