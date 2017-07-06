/**
 * $lookup
 * 
 * 表关联查询
 *  多表关联处理, 将本表指定的field与关联表field进行关联查询,匹配的文档采用指定字段(类型:数组)保存
 */
var async = require('async');
var db = require('../../../lib/db.js');
var order = require('../../../model/order.js');
var book = require('../../../model/book.js');


function exit() {
    async.parallel([
        function (cb) {
            book.removeAll(cb);
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
            { "_id": 8751, "title": "The Banquet", "writer": "Dante", "copies": 2 },
            { "_id": 8752, "title": "Divine Comedy", "writer": "Dante", "copies": 1 },
            { "_id": 8645, "title": "Eclogues", "writer": "Dante", "copies": 2 },
            { "_id": 7000, "title": "The Odyssey", "writer": "Homer", "copies": 10 },
            { "_id": 7020, "title": "Iliad", "writer": "Homer", "copies": 10 },
        ];
        book.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        book.aggregate()
            .group({ _id: "$writer", books: { $push: "$title" } })
            .out("writer")
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});