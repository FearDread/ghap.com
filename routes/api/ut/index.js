
/* Ultimate Totals API */
exports.add = function(app) {

    app.use('/ut/', function(req, res, next) {
        console.log('Something is happening on Ultimate Totals API.');
        next(); 
    });

    app.route('/ut')

        .get(function (req, res) {

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
