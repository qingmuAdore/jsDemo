var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BaseSchema = require('./base.js');


var ActivitySchema = new BaseSchema({
    name: String, //活动名称
    awardId: { type: ObjectId, ref: 'Award' }, //奖项
    flag: Number, //活动标识 Unstart Running End
    startTime: String, //启动时间
    endTime: String, //结束时间
});


var activity = ActivitySchema.statics;

activity.relative = function() {
    return 'awardId awardIdc';
}

module.exports = mongoose.model('Activity', ActivitySchema, 'activity');