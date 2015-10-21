var pg, utils, user, model;

user = require('../../../src/models/user.js');

/* Ultimate Totals API */
exports.add = function(app, passport) {

    app.use('/ut/', function(req, res, next) {
        console.log('Something is happening on Ultimate Totals API.');
        next(); 
    });

    app.route('/ut')

        .get(function (req, res) {

            res.json({ message: 'Welcome to Ultimate Totals api!', user: user });
        })

        .post(function (req, res) {

        });

    app.route('/ut/login')

        .post(function (req, res) {
            var email = req.body.email;
            var password = req.body.password;

            user.findOne({'user.email': email},
            function (err, user) {
                if (err || !user) {
                    return res.json({error: 'Error', message: 'User does not exist.', body: req.body});
                }

                if (!user.verify(password)) {
                    return res.json({error: '400', message: 'Enter correct password.', body: req.body});
                }

                return res.json({message: 'login attempt', body: req.body, user:user});
            });
        });

    app.route('/ut/user')
         
        .get(function (req, res) {

        })

        .post(function (req, res) {

        });

    app.route('/ut/user/:id')
         
        .get(function (req, res) {

        })

        .put(function (req, res) {

            user.update(req, res);
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
