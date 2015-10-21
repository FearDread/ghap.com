var pg, utils, user, model;

// model = require('./src/models/user');

/* Ultimate Totals API */
exports.add = function(app, passport) {

    app.use('/ut/', function(req, res, next) {
        console.log('Something is happening on Ultimate Totals API.');
        next(); 
    });

    app.route('/ut')

        .get(function (req, res) {
            var user = {};

            res.json({ message: 'Welcome to Ultimate Totals api!', user: user });
        })

        .post(function (req, res) {

        });

    app.route('/ut/account')

        .post(function (req, res) {

        });

    app.route('/ut/account/:id')
        
        .get(function (req, res) {

        })

        .put(function (req, res) {

        })

        .delete(function (req, res) {

        });

};
