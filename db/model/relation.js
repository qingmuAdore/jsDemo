var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BaseSchema = require('./base.js');

var RelationSchema = new BaseSchema({
    name: String, //关联名称
    associate : ObjectId,//关联对象
});


module.exports = mongoose.model('Relation', RelationSchema, 'relation');