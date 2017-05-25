var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var InventorySchema = new BaseSchema({
    item: String,
    qty: Number,
    tags: [String],
    dim_cm: [Number]
});

var camera = InventorySchema.statics;

camera.getQuery = function (item) {
    return { item: item };
}


module.exports = mongoose.model('Intentory', InventorySchema, 'intentory');