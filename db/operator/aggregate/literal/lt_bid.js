/**
 * literal
 * 
 * 返回不解析的值
 * 
 * project管道, 输出新的字段,并付初始值 1, 由于 1 在project中标识,显示属性
 * 
 */
var async = require('async');
var db = require('../../../lib/db.js');
var bid = require('../../../model/bid.js');


function exit() {
    async.parallel([
        function (cb) {
            bid.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var docs = [
            { "_id": 1, "item": "abc123", condition: "new" },
            { "_id": 2, "item": "xyz123", condition: "new" }
        ];
        bid.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                _id: 1,
                item: 'abc123'
            },
            {
                _id: 2,
                item: 'xyz123'
            }
        ]
        */
        bid.aggregate()
            .project({ item: 1, startAt: 1 }) //project,1 是显示属性的标识
            .exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1,
                "item": "abc123",
                "startAt": 1
            },
            {
                "_id": 2,
                "item": "xyz123",
                "startAt": 1
            }
        ]
        */
        bid.aggregate()
            .project({ item: 1, startAt: { $literal: 1 } })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});