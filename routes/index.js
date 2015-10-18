var json;
var nodemailer = require('nodemailer');

json = exports.json = function(req) {
    return req.query && req.query.json;
};

exports.addRoutes = function(app) {

    app.get('/', function(req, res) {
        res.render('home', {});
    });

    app.post('/contact', function (req, res) {
        var mailOpts, smtpTrans;

        smtpTrans = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: "ghaptonstall@gmail.com",
                pass: "L337k123w05" 
            }
        });

        mailOpts = {
            from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
            to: 'me@gmail.com',
            subject: 'Website contact form',
            text: req.body.message
        };

        smtpTrans.sendMail(mailOpts, function (error, response) {
            if (error) {
                res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
            } else {
                res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
            }
        });
    });
};
