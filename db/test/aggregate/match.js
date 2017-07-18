/**
 * match 匹配
 * 
 * { $match: { <query> } }
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
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var doc = [{
            name: 'pauly1',
            age: '28',
            work: 'softEngineer',
            value: {
                pos: 'cm',
                dep: 'soft'
            }
        }, {
            name: 'pauly2',
            age: '28',
            work: 'softEngineer',
            value: {
                pos: 'cm',
                dep: 'soft'
            }
        }, {
            name: 'pauly2',
            age: '28',
            work: 'farmer',
            value: {
                pos: 'pp'
            }
        }, {
            name: 'pauly3',
            age: '28',
            work: 'softEngineer',
            value: {
                pos: 'pp',
                dep: 'soft'
            }
        }];
        user.add(doc, cb);
    },
    function (arg, cb) {
        user.aggregate()
            .match({ 'value.dep': 'soft' })
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