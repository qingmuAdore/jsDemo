var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var InventorySchema = new BaseSchema({
    _id: Number,
    item: String,
    qty: Number,
    tags: [String],
    dim_cm: [Number],

    sku: String,
    type: String,
    instock: Number,
    size: String,
    resolution: String,
    display_type: String,
});

var inventory = InventorySchema.statics;

inventory.getQuery = function (item) {
    return { item: item };
}


module.exports = mongoose.model('Inventory', InventorySchema, 'inventory');