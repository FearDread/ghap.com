var mongo, bcrypt, user;

mongo = require('mongoose');
bcrypt = require('bcrypt-nodejs');

// create a schema
user = new mongo.Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String,
        avatar: String
    },
    token: String,
    premium: Boolean,
    created_at: Date,
    updated_at: Date
});

user.methods.hash = function(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(8),
        null
    );
};

user.methods.verify = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

user.methods.update = function(req, res) {
    var _this = this;

    this.user.name = req.body.name;
    this.user.address = req.body.address;

    this.user.save();
    res.json({user:_this.user});
};

// export user model
module.exports = mongo.model('User', user);
