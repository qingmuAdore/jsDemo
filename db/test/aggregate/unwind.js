/**
 * unwind 松开
 * 
 * 拆解数组集合
 * 
{
  $unwind:
    {
      path: <field path>,  //指定的拆分字段 
      includeArrayIndex: <string>, //索引字段名称 (记录数组的index)
      preserveNullAndEmptyArrays: <boolean> //是否保留 (空或者null)
    }
}
 */

var async = require('async');
var db = require('../../lib/db.js');
var award = require('../../model/award.js');

function exit() {
    async.parallel([
        function (cb) {
            award.removeAll(cb);
        },
    ], function (err) {
        db.closeDB();
    });
}

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        var doc = [{
            name: 'redpack_0',
            total: 100,
            divide: [{
                render: true,
                money: 49,
            }, {
                render: true,
                money: 51,
            }]
        },
        {
            name: 'redpack_1',
            total: 100,
        }];
        award.add(doc, cb);
    },
    function (arg, cb) {
        console.log(arg._doc);
        award.aggregate()
            .unwind({
                path: '$divide',
                includeArrayIndex: 'index',
                preserveNullAndEmptyArrays: true
            })
            .exec(cb);
    },
], function (err, res) {
    /*
    [
        {
            "_id": "58dc5bad1ae8a221885e70c0",
            "name": "redpack_1",
            "total": 100,
            "__v": 0,
            "index": null
        },
        {
            "_id": "58dc5bad1ae8a221885e70bd",
            "name": "redpack_0",
            "total": 100,
            "divide": {
                "render": true,
                "money": 49,
                "_id": "58dc5bad1ae8a221885e70bf"
            },
            "__v": 0,
            "index": 0
        },
        {
            "_id": "58dc5bad1ae8a221885e70bd",
            "name": "redpack_0",
            "total": 100,
            "divide": {
                "render": true,
                "money": 51,
                "_id": "58dc5bad1ae8a221885e70be"
            },
            "__v": 0,
            "index": 1
        }
    ]
    */
    console.log(JSON.stringify(res));
    exit();
});