/* GHAP.com */
var server, host, port;
var fs = require('fs');
var path = require('path');
var express = require('express');
var routes = require('./routes');
var less = require('less-middleware');

var app = express();
var pub = __dirname;

app.set('views', pub + '/public/views');
app.set('view engine', 'jade');

app.use(less(path.join(pub, '/src', 'less'), {
    dest: path.join(pub, '/public', 'css')
}));

app.use(express.static(path.join(pub, '/public')));

routes.addRoutes(app);

server = app.listen(4000, function () {
    host = server.address().address;
    port = server.address().port;

    console.log('GHAP.com listening at http://%s:%s', host, port);
});
