/**
 * 查询
 * 
 * query: 查询条件
 * projection: 输出属性
 *   eg: String  "age work" 
 *       Object  {age:1}
 * options: 选项,如limit sort skip
 */
var async = require('async');
var db = require('../../lib/db.js');
var tagRegionLocation = require('../../model/tagRegionLocation.js');


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        tagRegionLocation.findOne({ "tag_id": "EB020C127CDC" }).sort({ timestamp: -1 }).exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        tagRegionLocation.findOne({ "tag_id": "EB020C127CDC" }).exec(cb);
    }
], function (err, res) {
    console.log(res);
    db.close();
});