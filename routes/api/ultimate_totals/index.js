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

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next(); 
    });

    app.route('/ut')

        .get(function (req, res) {

            var ghap = new User({
                name: 'Jim Bean',
                username: 'jimbean',
                email: 'fear@gmail.com',
                password: 'doggie'
            });

            ghap.password = ghap.hash(ghap.password);
            ghap.save(function (err) {
                if (err) {
                    res.json({message: 'user exists'});
                }

                res.json({message: 'Welcome to Ultimate Totals api!', user: ghap});
            });
        });

    app.route('/ut/login')

        .post(function (req, res) {
            var username = req.body.username,
                password = req.body.password;

            User.findOne({username: username}, function (err, user) {
                if (err || !user) {
                    return res.json({
                        error: 'Error',
                        success: false,
                        message: 'User does not exist.',
                        status: 304
                    });
                }

                if (user && !user.verify(password)) {
                    return res.json({
                        error: 'Error',
                        success: false,
                        message: 'Enter correct password.',
                        status: 304 
                    });
                }

                return res.json({success: true, message: 'login success', user:user, status: 200});
            });
        });

    app.route('/ut/user')
         
        .get(function (req, res) {
            User.find({}, function (err, users) {
                if (users && users.length > 0) {

                    return res.json({success: true, users: users, status: 200});

                } else {

                    return res.json({
                        error: 'Error',
                        success: false,
                        message: 'No users found.',
                        status: 304
                    });
                }
            });
        })

        .post(function (req, res) {
            var user, newUser,
                fullname = req.body.first_name + ' ' + req.body.last_name,
                email = req.body.email,
                username = req.body.username,
                password = req.body.password;

            if (!req.user) {
                User.findOne({username: username}, function (err, user) {
                    if (err || !user) { 
                        return res.json(err);
                    }

                    if (user) {

                        return res.json({
                            error: 'Error',
                            success: false,
                            message: 'User already exists.',
                            status: 304 
                        });

                    } else {
                        newUser = new User({
                            name: fullname,
                            email: email,
                            username: username,
                            location: '',
                            password: newUser.hash(password)
                        });

                        newUser.save(function (err) {
                            if (err) {
                                return res.json({
                                    error: 'Error',
                                    success: false,
                                    message: 'Unable to save user.'
                                });
                            }

                            return res.json({success: true, user: newUser, status: 200});
                        });
                    }
                });

            } else {
                user = req.user;

                user.name = fullname;
                user.email = email;
                user.username = username;
                user.password = user.hash(password);

                user.save(function (err) {
                    if (err) { 
                        return res.json({
                            error: 'Error',
                            success: false,
                            message: 'Unable to save user.'
                        });
                    }

                    return res.json({user: user, status: 200});
                });
            }
        });

    app.route('/ut/user/:id')
         
        .get(function (req, res) {

            User.findById(req.param.id, function (err, user) {
                if (err || !user) {
                    return res.json({
                        error: 'Error',
                        success: false,
                        message: 'User does not exist.',
                        status: 304
                    });
                }

                return res.json({success: true, user: user, status: 200});
            });
        })

        .put(function (req, res) {

            user.update(req.body, function (err) {
                if (err) {
                    return res.json({
                        error: 'Error',
                        success: false,
                        message: 'Unable to update user.',
                        status: 400
                    });
                }

                return res.json({success: true, user: user, status: 200});
            });
        });

};
