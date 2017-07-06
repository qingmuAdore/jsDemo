var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var GoodsSchema = new BaseSchema({
    _id: Number,
    name: String,
    price: Number,
    type: String,
    location: {
        type: [Number],
        index: {
            type: '2d',
            sparse: true
        }
    }
});

module.exports = mongoose.model('Goods', GoodsSchema, 'goods');