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
                _id: 1,
                title: "abc123",
                author: { last: "pu", first: "zhang" },
                copies: 5,
            },
            {
                _id: 2,
                title: "abc123",
                copies: 5,
            }

        ];
        book.add(docs, cb);
    },
    function (arg, cb) {
        book.aggregate().append({
            $addFields: {
                discount: 0.9
            }
        }).exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});