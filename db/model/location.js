var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BaseSchema = require('./base.js');

var LocationSchema = new BaseSchema({
    tag_id: String,       //标签id
    position: {           //点坐标,Number取值范围 [ -180,180)
        coordinates: [],  //[Number]
        type: {
            type: String,
            default: 'Point'
        },
    },
    timestamp: { type: String, index: true },   //时间戳
});

LocationSchema.index({ tag_id: 1, timestamp: 1 }).index({ tag_id: 1 }).index({ timestamp: 1 });
var is = LocationSchema.indexes();
console.log(is);
var location = LocationSchema.statics;

location.getQuery = function (tag_id) {
    return { tag_id: tag_id };
}


module.exports = mongoose.model('Location', LocationSchema, 'location');