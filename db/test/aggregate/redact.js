/**
 * redact 编辑
 * 
 * { $redact: <expression> }
 * eg:


{ $match : { name : "pauly" } } 

https://docs.mongodb.com/manual/reference/operator/aggregation/project/
 */
var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');


function exit() {
    async.parallel([
        function (cb) {
            user.removeAll(cb);
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
            name: 'pauly1',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'pauly2',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'pauly2',
            age: '28',
            work: 'farmer'
        }, {
            name: 'pauly3',
            age: '28',
            work: 'softEngineer'
        }];
        user.add(doc, cb);
    },
    function (arg, cb) {
        user.aggregate()
            .match({ name: 'pauly2' })
            .exec(cb);
    },
], function (err, res) {
    /*
[
    {
        "_id": "58db88df19633c32a83d2547",
        "name": "pauly2",
        "age": 28,
        "work": "farmer",
        "__v": 0
    },
    {
        "_id": "58db88df19633c32a83d2546",
        "name": "pauly2",
        "age": 28,
        "work": "softEngineer",
        "__v": 0
    }
]
    */
    console.log(JSON.stringify(res));
    exit();
});