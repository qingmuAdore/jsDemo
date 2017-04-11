var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var UserSchema = new BaseSchema({
    name: String,
    age: Number,
    work: String,
    value: Object
});


UserSchema.pre('findOne', function (next) {
    console.log('hook findOne');
    next();
});


module.exports = mongoose.model('User', UserSchema, 'user');