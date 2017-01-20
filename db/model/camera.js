var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var BaseSchema = require('./base.js');

var CameraSchema = new BaseSchema({
    name: String, //名称
    datastream: [{ //stream:流名称 tp:数据类型id 外键
        stream: String,
        tp: { type: ObjectId, ref: 'DeviceDataType' }
    }],
    area: { type: ObjectId, ref: 'Area' }, //所区域
    user: { type: ObjectId, ref: 'User' }, //所属人
    point: {
        x: Number,
        y: Number
    }
});

var camera = CameraSchema.statics;

camera.getQuery = function(name) {
    return { name: name };
}

camera.relative = function() {
    return 'datastream.tp user';
}

module.exports = mongoose.model('Camera', CameraSchema, 'camera');