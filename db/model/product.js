/**
 * Product
 * 
 * 产品
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    key: String,         //产品key 
    name: String,        //产品名
    description: String, //产品描述
});

module.exports = mongoose.model('Product', ProductSchema, 'product');