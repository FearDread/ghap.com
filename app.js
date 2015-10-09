/* GHAP.com */
var fs = require('fs');
var path = require('path');
var express = require('express');
var routes = require('./routes');
var less = require('less-middleware');

var app = express();
var pub = __dirname;

app.set('views', pub + '/public/views');
app.set('view engine', 'jade');

app.use(less(path.join(pub, 'src', 'less'), {
    dest: path.join(pub, '/public')
}));

app.use(express.static(path.join(pub, '/public')));

routes.addRoutes(app);

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
