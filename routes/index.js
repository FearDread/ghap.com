
exports.addRoutes = function(app) {

    app.get('/', function(req, res) {
        res.render('home', {});
    });
}
