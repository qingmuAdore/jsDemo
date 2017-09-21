/**
 * device 
 * 
 * 设备
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DeviceSchema = new mongoose.Schema({
    id: String,          //服务器为设备注册时创建 uuid平台唯一
    key: String,         //服务器为设备注册时创建（用于设备绑定）
    name: String,        //设备名字
    mac: String,         //设备唯一mac标识，最长32字符
    ip: String,          //设备ip
    type: String,          //设备类型 IpCamera Host
    description: String,        //设备描述
    position: {          //SAE 图层坐标 及其 相对地板的高度
        point: {              //点坐标,Number取值范围 [ -180,180)
            coordinates: [], //[Number]
            type: {
                type: String,
                default: 'Point'
            },
        },
        h: Number,       //相对地板的高度
    },
    floor_id: {          //所属楼层
        type: ObjectId,
        ref: 'Floor'
    },
    product_id: {
        type: ObjectId,
        ref: 'Product'
    },
    version: Number      //设备版本号
});

DeviceSchema.index({ point: '2dsphere' });

module.exports = mongoose.model('Device', DeviceSchema, 'device');