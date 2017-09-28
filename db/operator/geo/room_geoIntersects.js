/**
 * 地理处理
 * 
 * $geoWithin
 * 
 * 选择地理空间数据与指定的GeoJSON对象相交的文档 ; 即数据和指定对象的交集不是空的。
 * 这包括数据和指定对象共享边缘的情况。
 * 
 * 该$geoIntersects运营商使用$geometry 运营商指定GeoJSON的对象
 * 
 */
var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var room = require('../../model/geo_room.js');

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
}, {
    name: 'room4',
    scope: {
        coordinates: [
            [[1, 0], [1, 1], [2, 1], [2, 0], [1, 0]]
        ]
    }
}];


function exit() {
    async.parallel([
        function (cb) {
            room.remove({}, cb);
        }
    ], function (err, results) {
        db.close();
    });
}


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        room.add(docs, cb);
    },
    function (arg, cb) {
        console.log('点[1.5, 0.5]所在区域');
        var query = {
            scope: {
                $geoIntersects : {
                    $geometry: {
                        type: "Point",
                        coordinates: [1.5, 0.5]
                    }
                }
            }
        };
        room.find(query, cb);
    },
    function (arg, cb) {
        console.log('三角形[[0.8,0.5],[1.5,1.5],[1.5,0.5],[0.8,0.5]] 交集');
        var query = {
            scope: {
                $geoIntersects : {
                    $geometry: {
                        type: "Polygon",
                        coordinates: [
                            [[0.8,0.5],[1.5,1.5],[1.5,0.5],[0.8,0.5]]
                        ]
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
});