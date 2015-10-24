var sdata, utils, path;

path = '../../../';

utils = require(path + 'src/utils');
sdata = require(path + 'src/config/sdata.js');

exports.add = function (app) {

    app.route('/ut/sdata/ranks')

        .get(function (req, res) {
            console.log('getting ranks via sdata');
            return res.json({sdata: sdata});
        });

};
