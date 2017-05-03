/**
 * group 组
 * 
 * 结果合并, _id为 匹配key的合并
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }



 */

var async = require('async');
var db = require('../../lib/db.js');
var sale = require('../../model/sale.js');

function exit() {
    async.parallel([
        function (cb) {
            sale.removeAll(cb);
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
            item: 'abc',
            price: 10,
            quantity: 2,
        }, {
            item: 'jkl',
            price: 20,
            quantity: 1,
        }, {
            item: 'xyz',
            price: 5,
            quantity: 10,
        }, {
            item: 'xyz',
            price: 5,
            quantity: 20,
        }, {
            item: 'abc',
            price: 10,
            quantity: 10,
        }];
        sale.add(doc, cb);
    },
    function (arg, cb) {
        sale.aggregate()
            .group({
                _id: { item: '$item' }, //标准 (判断document是否归类)
                totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, //乘积求和
                averageQuantity: { $avg: "$quantity" }, //求平均值
                maxQuantity: { $max: '$quantity' },
                count: { $sum: 1 }  //累计
            })
            .exec(cb);
    },
], function (err, res) {
    /*
[
    {
        "_id": {
            "item": "abc"
        },
        "totalPrice": 120,
        "averageQuantity": 6,
        "maxQuantity": 10,
        "count": 2
    },
    {
        "_id": {
            "item": "jkl"
        },
        "totalPrice": 20,
        "averageQuantity": 1,
        "maxQuantity": 1,
        "count": 1
    },
    {
        "_id": {
            "item": "xyz"
        },
        "totalPrice": 150,
        "averageQuantity": 15,
        "maxQuantity": 20,
        "count": 2
    }
]
    */
    console.log(JSON.stringify(res));
    exit();
});