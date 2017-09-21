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
                _id: new Date().getTime(),
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
        book.aggregate().match({
            title: "abc123"
        }).append({
            $count: "num"
        }).exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});