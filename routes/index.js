var json, mailer;

json = exports.json = function(req) {
    return req.query && req.query.json;
};

mailer = require('nodemailer');

exports.add = function(app) {

    app.use(function(req, res, next) {
        console.log('Something is happening on Ghap API.');
        next(); 
    });

    app.get('/', function(req, res) {
        res.render('home', {});
    });

    app.post('/contact', function (req, res) {
        var options, transport;

        transport = mailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: "ghaptonstall@gmail.com",
                pass: "L337k123w05" 
            }
        });

        options = {
            from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
            to: 'me@gmail.com',
            subject: 'Website contact form',
            text: req.body.message
        };

        transport.sendMail(options, function (error, response) {
            if (error) {
                res.render('home', { 
                    title: 'Raging Flame Laboratory - Contact',
                    msg: 'Error occured, message not sent.',
                    err: true,
                    page: 'contact' 
                })
            } else {
                res.render('contact', { 
                    title: 'Raging Flame Laboratory - Contact',
                    msg: 'Message sent! Thank you.',
                    err: false,
                    page: 'contact'
                })
            }
        });
    });
};
