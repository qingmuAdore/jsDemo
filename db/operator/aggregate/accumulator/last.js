/**
 * $last 返回数组的尾元素, 只用于$group管道
 
 Notes:
   虽然$ort序阶段将有序文档作为对$group 阶段的输入，
   但$group不保证在其自己的输出中保持这种排序顺序
 */
var async = require('async');
var db = require('../../../lib/db.js');
var sale = require('../../../model/sale.js');

function exit() {
    async.parallel([
        function (cb) {
            sale.removeAll(cb);
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
            { "_id": 1, "item": "abc", "price": 10, "quantity": 2, "date": new Date("2014-01-01T08:00:00Z") },
            { "_id": 2, "item": "jkl", "price": 20, "quantity": 1, "date": new Date("2014-02-03T09:00:00Z") },
            { "_id": 3, "item": "xyz", "price": 5, "quantity": 5, "date": new Date("2014-02-03T09:05:00Z") },
            { "_id": 4, "item": "abc", "price": 10, "quantity": 10, "date": new Date("2014-02-15T08:00:00Z") },
            { "_id": 5, "item": "xyz", "price": 5, "quantity": 10, "date": new Date("2014-02-15T09:05:00Z") },
            { "_id": 6, "item": "xyz", "price": 5, "quantity": 5, "date": new Date("2014-02-15T12:05:10Z") },
            { "_id": 7, "item": "xyz", "price": 5, "quantity": 10, "date": new Date("2014-02-15T14:12:12Z") },
        ];
        sale.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": "xyz",
                "lastSalesDate": "2014-02-15T14:12:12.000Z",
                "arr": [
                    "2014-02-03T09:05:00.000Z",
                    "2014-02-15T09:05:00.000Z",
                    "2014-02-15T12:05:10.000Z",
                    "2014-02-15T14:12:12.000Z"
                ]
            },
            {
                "_id": "jkl",
                "lastSalesDate": "2014-02-03T09:00:00.000Z",
                "arr": [
                    "2014-02-03T09:00:00.000Z"
                ]
            },
            {
                "_id": "abc",
                "lastSalesDate": "2014-02-15T08:00:00.000Z",
                "arr": [
                    "2014-01-01T08:00:00.000Z",
                    "2014-02-15T08:00:00.000Z"
                ]
            }
        ]

        输入阶段按照指定排序,但是输出不一定按照 { item: 1, date: 1 }
        */
        sale.aggregate()
            .sort({ item: 1, date: 1 })
            .group({
                _id: "$item",
                lastSalesDate: { $last: "$date" },
                arr: { $push: '$date' },
            })
            .exec(cb);
    }
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});