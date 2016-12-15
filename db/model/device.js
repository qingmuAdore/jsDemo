var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var DeviceSchema = new BaseSchema({
    name: String, //名称
    value: Object
});

var device = DeviceSchema.statics;

device.getQuery = function(param) {
    return { name: param };
}

module.exports = mongoose.model('Device', DeviceSchema, 'device');