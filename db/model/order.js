var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var OrderSchema = new BaseSchema({
    _id: Number,
    item: String,
    price: Number,
    quantity: Number,
    specs: [String],
    type: String,
    goods: { name: String }
});

module.exports = mongoose.model('Order', OrderSchema, 'order');