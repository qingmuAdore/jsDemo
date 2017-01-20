var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var AreaSchema = new BaseSchema({
    name: String, //名称
    description: String, //描述
});

module.exports = mongoose.model('Area', AreaSchema, 'area');