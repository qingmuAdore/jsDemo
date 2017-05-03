var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var SaleSchema = new BaseSchema({
    item: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Sale', SaleSchema, 'sale');