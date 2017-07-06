var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var PeopleSchema = new BaseSchema({
    _id: Number,
    name: String, //名称
    friends: [String],
    hobbies: [String]
});

module.exports = mongoose.model('People', PeopleSchema, 'people');