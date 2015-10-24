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
            var ranks, results;

            ranks = sdata.getRankings()
                
                .success(function (data) {

                    if (data) {
                        results = JSON.parse(data);

                        return res.json({
                            success: true,
                            ranks: results,
                            status: 200
                        });
                    }
                });
        });
};
