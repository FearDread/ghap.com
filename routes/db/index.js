var EventEmitter, constring, dev, pg, utils;

pg = require('pg');
utils = require('./utils');
config = require(__dirname + './src/config');

constring = "postgres://" + config.db.user + ":" + config.db.password + "@localhost/" + config.db.database;

EventEmitter = require('events').EventEmitter;

module.exports.Database = function (callback) {
    return pg.connect(constring, callback);
};

module.exports.Broker = (function (superClass) {

    utils.extend(Broker, superClass);

    function Broker() {
        Database((function (_this) {
            return function(err, client, done) {
                if (err) {

                    return _this.emit('error', err);

                } else {

                    _this.client = client;
                    _this.done = done;
                
                    return _this.begin();
                }
            };
        })(this));
    }

    Broker.prototype.begin = function () {
        return this.client.query('BEGIN', (function(_this) {

            return function(error) {

                if (error) {

                    return _this.emit('error', error);
                } else {

                    return _this.emit('begin');
                }
            };
        })(this));
    };

    Broker.prototype.query = function (statement, cb) {
        statement = (typeof statement.toQuery === 'function') ? statement.toQuery() : statement;

        return this.client.query(statement, (function(_this) {

            return function(error, rows) {

                if (error) {

                    return _this.rollback();
                } else {

                    return cb(rows);
                }
            };
        })(this));
    };

    Broker.prototype.rollback = function () {
        return this.client.query('ROLLBACK', (function(_this) {

            return function(error) {
                _this.done(error);

                return _this.emit('rollback', error);
            };
        })(this));
    };

    Broker.prototype.commit = function (obj) {
        return this.client.query('COMMIT', (function(_this) {

            return function(err) {
                _this.done();

                return _this.emit('commit', obj);
            };
        })(this));
    };

    return Broker;

})(EventEmitter);
