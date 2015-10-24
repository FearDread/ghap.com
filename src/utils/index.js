/* Utility Methods */
exports.json = exports.json = function(req) {
    return req.query && req.query.json;
};

exports.extend = function (child, parent) {
    for (var key in parent) {
        if ({}.hasOwnProperty.call(parent, key)) {
            child[key] = parent[key]; 
        } 
    }
        
    function ctor() {
        this.constructor = child;
    } 
    
    ctor.prototype = parent.prototype;

    child.prototype = new ctor();
    child.__super__ = parent.prototype;

    return child;
};

exports.path = function (req) {
    return req.url;
};

exports.isAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.json({success: false, message: 'Your not authenticated, please login.'});
};

exports.merge = function (custom, defaults, deep) {

};

exports.isFunc = function (obj) {

};
