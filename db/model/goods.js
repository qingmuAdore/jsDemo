var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoodsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    location: {
        type: [Number],
        index: {
            type: '2d',
            sparse: true
        }
    }
});

module.exports = mongoose.model('Goods', GoodsSchema, 'goods');