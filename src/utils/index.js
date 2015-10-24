/* Utility Methods */
exports.json = function(req) {
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

exports.isFunc = function (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply );
};

exports.isAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.json({success: false, message: 'Your not authenticated, please login.'});
};

exports.merge = function (custom, defaults, deep) {

};

exports.xmlToJson = function (xml) {
    var obj = {};

    if (xml.nodeType == 1) { 
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};

            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);

                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { 
        obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;

            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }

                obj[nodeName].push(xmlToJson(item));
            }
        }
    }

    return obj;
};
