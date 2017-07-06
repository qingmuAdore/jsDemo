/**
 * literal
 * 
 * 返回不解析的值
 * 
 * 比较价格是否 等于 $1(1 美元), 由于$是关键词,可能当做表字段进行解析
 * 
 */
var async = require('async');
var db = require('../../../lib/db.js');
var record = require('../../../model/record.js');


function exit() {
    async.parallel([
        function (cb) {
            record.removeAll(cb);
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
        var docs = [
            { "_id": 1, "item": "abc123", price: "$2.50" },
            { "_id": 2, "item": "xyz123", price: "1" },
            { "_id": 3, "item": "ijk123", price: "$1" }
        ];
        record.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1,
                "costsOneDollar": false
            },
            {
                "_id": 2,
                "costsOneDollar": false
            },
            {
                "_id": 3,
                "costsOneDollar": false
            }
        ]
        */
        record.aggregate()
            .project({ costsOneDollar: { $eq: ["$price", "$1"] } }) //$1 看做 1字段来解析
            .exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1,
                "costsOneDollar": false
            },
            {
                "_id": 2,
                "costsOneDollar": false
            },
            {
                "_id": 3,
                "costsOneDollar": true
            }
        ]
        */
        record.aggregate()
            .project({ costsOneDollar: { $eq: ["$price", { $literal: "$1" }] } })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});