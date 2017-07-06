var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var Bid = new BaseSchema({
    _id: Number,//_id
    item: String, //名称
    condition: String, //条件
});

var bid = Bid.statics;

bid.getQuery = function (param) {
    return { item: param };
}

module.exports = mongoose.model('Bid', Bid, 'bid');