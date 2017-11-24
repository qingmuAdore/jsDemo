/**
 * 数组差值
 * 
 * 
 */
var async = require('async');
var db = require('../../lib/db.js');
var award = require('../../model/award.js');


function exit() {
    async.parallel([
        function (cb) {
            award.removeAll(cb);
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
        var doc = [
            { name: 'pauly', num: 1 },
            { name: 'pauly', num: 6 },
            { name: 'pauly', num: 9 },
            { name: 'pauly', num: 12 },
            { name: 'pauly', num: 17 },
            { name: 'pauly', num: 20 },
            { name: 'pauly', num: 25 },
            { name: 'pauly', num: 29 }
        ];
        award.add(doc, cb);
    },
    function (arg, cb) {
        award.aggregate().
            group({
                _id: '$name',
                nums: { $push: '$num' },
                subNums: {
                    
                }
            })
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});