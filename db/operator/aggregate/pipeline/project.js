/**
 * $project
 * 
 * 指定成员的输出
 *  
 */
var async = require('async');
var db = require('../../../lib/db.js');
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
            {
                "_id": 1,
                title: "abc123",
                isbn: "0001122223334",
                author: { last: "zzz", first: "aaa" },
                copies: 5,
                lastModified: new Date("2016-07-28")
            }
        ];
        book.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1,
                "title": "abc123",
                "isbn": 1122223334,
                "copies": 5,
                "author": {
                    "last": "zzz",
                    "first": "aaa"
                },
                "__v": 0
            }
        ]
        */
        book.aggregate()
            .project({ lastModified: 0 })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});