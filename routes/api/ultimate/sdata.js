var $, sdeta, utils, pathr

path = '../../../';

utils = require(path + 'src/utils');
sdata = require(path + 'src/config/sdata.js');

exports.add = function (app) {

    app.route('/ut/sdata')
      
        .get(function (req, res) {
            return res.json({sdata: sdata});
        });

    app.route('/ut/sdata/rank')

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

    app.route('/ut/sdata/season')

        .get(function (req, res) {
            var season, results;

            season = sdata.getSeason()
                
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

    app.route('/ut/sdata/schedule')
        
        .get(function (req, res) {
            var schedule, results;

            schedule = sdata.getSchedule()
              
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

    app.route('/ut/sdata/injury')
        
        .get(function (req, res) {
            var injuries, results;

            injuries = sdata.getInjuries()
                
                .success(function (data) {
                    if (data) {
                        results = JSON.parse(data);

                        return res.json({
                            success: true,
                            injuries: results,
                            status: 200
                        });
                    }
                });
        });
};
