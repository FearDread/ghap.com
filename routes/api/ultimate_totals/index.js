var pg, utils, user, model, path, User;

path = '../../../src';
User = require(path + '/models/user.js');

function auth(req, res, next) {
  if (req.isAuthenticated()) { 
      return next(); 
  }

  res.redirect('/');
}

/* Ultimate Totals API */
exports.add = function(app, passport) {

    app.use('/ut/', function(req, res, next) {
        console.log('Something is happening on Ultimate Totals API.');
        // add logic to check for token
        next(); 
    });

    app.route('/ut')

        .get(function (req, res) {

            res.json({message: 'Welcome to Ultimate Totals api!', user: user});
        });

    app.route('/ut/login')

        .post(function (req, res) {
            var email = req.body.email,
                password = req.body.password;

            User.find({'user.username': email}, function (err, user) {
                console.log('error : ', err);
                console.log('user: ', user);
                if (err) {
                    return res.json({
                        error: 'Error',
                        message: 'User does not exist.',
                        status: 304
                    });
                }

                if (!User.verify(password)) {
                    return res.json({
                        error: 'Error',
                        message: 'Enter correct password.',
                        status: 304 
                    });
                }

                return res.json({message: 'login success', body: req.body, user:user, status: 200});
            });
        });

    app.route('/ut/signup')

        .post(function (req, res) {
            var user, newUser,
                email = req.body.email,
                username = req.body.username,
                password = req.body.password;

            if (!req.user) {
                User.find({'user.email': email}, function (err, user) {
                    if (err || !user) { 
                        return res.json(err);
                    }

                    if (user) {

                        return res.json({
                            error: 'Error',
                            message: 'User already exists.',
                            status: 304 
                        });

                    } else {

                        newUser = new user();

                        newUser.username = username;
                        newUser.email = email;
                        newUser.password = newUser.hash(password);
                        newUser.name = '';
                        newUser.location = '';

                        newUser.save(function (err) {
                            if (err) throw err;

                            return res.json({user: newUser, status: 200});
                        });
                    }
                });

            } else {
                user = req.user;

                user.email = email;
                user.username = username;
                user.password = user.hash(password);

                user.name = '';
                user.address = '';

                user.save(function (err) {
                    if (err) throw err;

                    return res.json({user: user, status: 200});
                });
            }
        });

    app.route('/ut/user')
         
        .get(function (req, res) {
            User.findAll(function (err, users) {
                console.log('all users = ', users);
                if (users && users.length > 0) {

                    res.json({users: users, status: 200});

                } else {

                    res.json({
                        error: 'Error',
                        message: 'No users found.',
                        status: 304
                    });
                }
            });
        })

        .post(function (req, res) {

        });

    app.route('/ut/user/:id')
         
        .get(function (req, res) {

        })

        .put(function (req, res) {

            user.update(req, res);
        });

};
