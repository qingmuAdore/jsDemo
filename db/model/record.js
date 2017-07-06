var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var Record = new BaseSchema({
    _id: Number,//_id
    item: String, //名称
    price: String, //价格
});

var record = Record.statics;

record.getQuery = function (param) {
    return { item: param };
}

module.exports = mongoose.model('Record', Record, 'record');