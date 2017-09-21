var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BaseSchema = require('./base.js');

var TagRegionLocation = new BaseSchema({
    tag_id: String,       //标签id
    floor_id: {           //所属楼层
        type: ObjectId,
        ref: 'Floor'
    },
    position: {           //点坐标,Number取值范围 [ -180,180)
        coordinates: [],  //[Number]
        type: {
            type: String,
            default: 'Point'
        },
    },
    distance:Number,
    timestamp: Number,   //时间戳
});

TagRegionLocation.index({ position: '2dsphere' });

var tagRegionLocation = TagRegionLocation.statics;

tagRegionLocation.getQuery = function (id) {
    return { tag_id: id };
}

tagRegionLocation.relative = function () {
    return 'floor_id';
}

module.exports = mongoose.model('TagRegionLocation', TagRegionLocation, 'tagRegionLocation');