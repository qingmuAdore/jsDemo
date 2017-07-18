var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var Fruit = new BaseSchema({
    _id: Number,
    location:String,
    in_stock:[String]
});

module.exports = mongoose.model('Fruit', Fruit, 'fruit');