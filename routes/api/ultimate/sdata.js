var $, sdata, utils, path;

path = '../../../';

utils = require(path + 'src/utils');
sdata = require(path + 'src/config/sdata.js');

exports.add = function (app) {

    app.route('/ut/sdata')
      
        .get(function (req, res) {
            return res.json({sdata: sdata});
        });

    app.route('/ut/sdata/ranks')

        .get(function (req, res) {
            var ranks;

            ranks = sdata.getRankings()
                
                .success(function (data) {
                    console.log('ranks = ', data);
                    return res.json({ranks: data});
                });
        });
};
