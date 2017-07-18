/**
 * $first 返回数组的首元素, 只用于$group管道
 
 Notes:
   虽然$ort序阶段将有序文档作为对$group 阶段的输入，
   但$group不保证在其自己的输出中保持这种排序顺序
 */
var async = require('async');
var db = require('../../../lib/db.js');
var fruit = require('../../../model/fruit.js');

function exit() {
    async.parallel([
        function (cb) {
            fruit.removeAll(cb);
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
            {
                "_id": 1, "location": "24th Street",
                "in_stock": ["apples", "oranges", "bananas"]
            },
            {
                "_id": 2, "location": "36th Street",
                "in_stock": ["bananas", "pears", "grapes"]
            },
            {
                "_id": 3, "location": "82nd Street",
                "in_stock": ["cantaloupes", "watermelons", "apples"]
            }];
        fruit.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [ { _id: 1, 'store location': '24th Street', 'has bananas': true },
        { _id: 2, 'store location': '36th Street', 'has bananas': true },
        { _id: 3, 'store location': '82nd Street', 'has bananas': false } ]
        */
        fruit.aggregate()
            .project({
                "store location": "$location",
                "has bananas": {
                    $in: ["bananas", "$in_stock"]
                }
            })
            .exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [ { _id: 1,
        location: '24th Street',
        in_stock: [ 'apples', 'oranges', 'bananas' ],
        __v: 0 },
        { _id: 2,
            location: '36th Street',
            in_stock: [ 'bananas', 'pears', 'grapes' ],
            __v: 0 } ]
        */
        fruit.aggregate()
            .match({
                in_stock: 'bananas'
            })
            .exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [ { _id: 1,
        location: '24th Street',
        in_stock: [ 'apples', 'oranges', 'bananas' ],
        __v: 0 },
        { _id: 2,
            location: '36th Street',
            in_stock: [ 'bananas', 'pears', 'grapes' ],
            __v: 0 } ]
        */
        fruit.find({ in_stock: 'bananas' }).exec(cb);
    }
], function (err, res) {
    console.log(res);
    exit();
});