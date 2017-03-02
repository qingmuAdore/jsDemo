var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BaseSchema = require('./base.js');


var ActivityResultSchema = new BaseSchema({
    result:String,
    activityId: { type: ObjectId, ref: 'Activity' }, //Activity
});

var activityResult = ActivityResultSchema.statics;

activityResult.relative = function() {
    return 'activityId';
}

module.exports = mongoose.model('ActivityResult', ActivityResultSchema, 'activityResult');