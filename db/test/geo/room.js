/**
 * 地理处理
 * 
 * $geoIntersects: 交点
 *    获取指定点所在区域
 */
var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var room = require('../../model/room.js');

var docs = [{
    name: 'room1',
    scope: {
        coordinates: [
            [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]
        ]
    }
}, {
    name: 'room2',
    scope: {
        coordinates: [
            [[0, 1], [0, 2], [1, 2], [1, 1], [0, 1]]
        ]
    }
}, {
    name: 'room3',
    scope: {
        coordinates: [
            [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]
        ]
    }
}, , {
    name: 'room4',
    scope: {
        coordinates: [
            [[1, 0], [1, 1], [2, 1], [2, 0], [1, 0]]
        ]
    }
}]

function exit() {
    async.parallel([
        function (cb) {
            room.remove({}, cb);
        }
    ], function (err, results) {
        db.closeDB();
    });
}

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        room.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var query = {
            scope: {
                $geoIntersects: {
                    $geometry: {
                        type: "Point",
                        coordinates: [1.5, 0.5]
                    }
                }
            }
        };
        room.find(query, cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    exit();
    // db.closeDB();
})