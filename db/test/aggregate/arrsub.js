/**
 * 数组差值
 * 
 * 
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
            .project({
                tx: [1, 3, 6, 18, 20, 35, 57, 72, 85, 110, 118]
            })
            .project({
                tx: 1,
                subTx: {
                    $reduce: {
                        input: '$tx',
                        initialValue: { index: 0, arr: [], size: { $size: '$tx' } },
                        in: {
                            arr: {
                                $concatArrays: ['$$value.arr',
                                    [{
                                        $subtract: [{
                                            $arrayElemAt: ['$tx', { $add: ['$$value.index', 1] }]
                                        }, '$$this']
                                    }]
                                ]
                            },
                            index: { $add: ['$$value.index', 1] }
                        }
                    }
                }
            })
            .project({
                tx: 1,
                subTx: 1,
                maxSub: { $max: '$subTx.arr' }
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});