var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var UserSchema = new BaseSchema({
    account: String,
    pwd: String
});

module.exports = mongoose.model('User', UserSchema, 'user');