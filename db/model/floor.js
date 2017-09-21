/**
 * Floor 
 * 
 * 楼层
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var FloorSchema = new mongoose.Schema({
    id: String,                  //唯一标识(Unique)
    name: String,                //名称
    img: String,                 //楼层图
    building_id: {               //所属建筑
        type: ObjectId,
        ref: 'Building'
    },
});


module.exports = mongoose.model('Floor', FloorSchema, 'floor');