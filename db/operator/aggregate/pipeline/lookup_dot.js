/**
 * $lookup
 * 
 * 表关联查询
 *  多表关联处理, 将本表指定的field与关联表field进行关联查询,匹配的文档采用指定字段(类型:数组)保存
 */
var async = require('async');
var db = require('../../../lib/db.js');
var order = require('../../../model/order.js');
var goods = require('../../../model/goods.js');


function exit() {
    async.parallel([
        function (cb) {
            goods.removeAll(cb);
        },
        function (cb) {
            order.removeAll(cb);
        }
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var docs = [{
            "_id": 1, "name": "MON1001", "price": 350, "type": "Monitor"
        }, {
            "_id": 2, "name": "MON1002", "price": 350, "type": "Monitor"
        }, {
            "_id": 3, "name": "MON1003", "price": 350, "type": "Monitor"
        }, {
            "_id": 4, "name": "MON1004", "price": 350, "type": "Monitor"
        }, {
            "_id": 5, "name": "MON1005", "price": 350, "type": "Monitor"
        }];
        goods.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var docs = [
            {
                "_id": 1, "goods": { "name": "MON1001" }
            }
        ];
        order.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        order.aggregate()
            .lookup({ // inventory 匹配
                from: "goods",
                localField: "goods.name", //点操作
                foreignField: "name",
                as: "lu_goods"
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});