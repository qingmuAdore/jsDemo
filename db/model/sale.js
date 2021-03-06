var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var SaleSchema = new BaseSchema({
    _id: Number,
    item: String,
    price: Number,
    quantity: Number,
    date: Date,
});

module.exports = mongoose.model('Sale', SaleSchema, 'sale');