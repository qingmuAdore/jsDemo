var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var UserSchema = new BaseSchema({
    name: String,
    age: Number,
    work: String,
    value: Object,
    createdAt: Date
});

// UserSchema.pre('findOne', function (next) {
//     console.log('hook findOne');
//     next();
// });

// // remove document模式操作,才执行
// UserSchema.pre('remove', function (next) {
//     console.log('hook remove');
//     next();
// });

UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

var user = UserSchema.statics;

user.getQuery = function (name) {
    return { name: name };
}

module.exports = mongoose.model('User', UserSchema, 'user');