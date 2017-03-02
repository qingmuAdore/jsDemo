/**********
 * 
 * 引用的使用 populate 
 * 
 * 动态添加 查询
 * 若同名 path,则以后来配置为准
 * 
 */
var async = require('async');
var db = require('../../lib/db.js');
var relation = require('../../model/relation.js');
var award = require('../../model/award.js');
var activity = require('../../model/activity.js');

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        async.parallel([
            function(cb){
                var doc = {
                    name:'award name'
                };
                award.add(doc,cb);
            },
            function(cb){
                var doc = {
                    name:'activity name'
                };
                activity.add(doc,cb);
            }
        ],cb);
    },
    function (arg, cb) {
        var data = [];
        arg.forEach(function(ele,index){
            data.push({
                name:'relation' + index,
                associate:ele._doc._id,
            })
        });
        relation.add(data,cb);
    },
    function (arg, cb) {
        var query = {name:'relation1'};
        relation.find(query).populate({
            path:'associate',
            model:'Award'
        }).populate({
            path:'associate',
            model:'Activity'
        }).exec(cb);
        console.log(arg);
    },
], function (err, res) {
    console.log(res);
    db.closeDB();
});