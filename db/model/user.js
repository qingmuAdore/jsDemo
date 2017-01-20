var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var UserSchema = new BaseSchema({
    name: String,
    age: Number,
    work: String,
});

module.exports = mongoose.model('User', UserSchema, 'user');