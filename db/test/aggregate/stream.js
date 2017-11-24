/**
 * group 组
 * 
 * 结果合并, _id为 匹配key的合并
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }



 */

var async = require('async');
var db = require('../../lib/db.js');
var stream = require('../../model/stream.js');

function exit() {
    async.parallel([
        // function (cb) {
        //     stream.removeAll(cb);
        // },
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        stream.aggregate()
            .match({
                did: '0030184f167a',
                sname: 'cpu_usage',
                timestamp: {
                    $gte: 1508824564130,
                    $lte: 1508824774300
                }
            })
            .project({
                did: 1,
                sname: 1,
                stream: 1,
                timestamp: 1,
                dealtime: { $trunc: { $divide: ['$timestamp', 50000] } }
            })
            .sort({ dealtime: 1 })
            .group({
                _id: '$dealtime',
                data: {
                    $push: '$stream'
                }
            })
            .project({
                data: 1,
                streamMin: {
                    $reduce: {
                        input: "$data",
                        initialValue: 1000,
                        in: {
                            $cond: [
                                { $gt: ['$$value', '$$this'] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                },
                streamMax: {
                    $reduce: {
                        input: "$data",
                        initialValue: -1000,
                        in: {
                            $cond: [
                                { $gt: ['$$value', '$$this'] },
                                '$$value',
                                '$$this'
                            ]
                        }
                    }
                }
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});