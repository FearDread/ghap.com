var User, mongo, schema, userSchema;

mongoose = require('mongoose');
schema = mongoose.Schema;

// create a schema
userSchema = new schema({
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

// export user model
module.exports = mongoose.model('User', userSchema);

