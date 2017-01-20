/**
 * data type
 */
var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var DeviceDataTypeSchema = new BaseSchema({
    name: String, //名称
    type: String, //分类
    unit: String, //单位 如 celsius
    unit_symbol: String, //单位符号 如°C
});

var dataType = DeviceDataTypeSchema.statics;

dataType.getQuery = function(type) {
    return { type: type };
}

module.exports = mongoose.model('DeviceDataType', DeviceDataTypeSchema, 'deviceDataType');