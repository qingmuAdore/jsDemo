/**
 * 地理处理
 * 
 * $geoWithin
 * 
 * 选择具有完全在指定形状内的地理空间数据的文档。确定包含时，MongoDB会将形状的边框视为形状的一部分，以浮点数的精度为准。
 * 
 * $geoWithin不需要地理空间指数。然而，地理空间索引将提高查询性能。
 * 无论2dsphere和二维地理空间索引支持 $geoWithin。
 * 
 * 指定的形状可以是GeoJSON 多边形 （单环或多环），GeoJSON MultiPolygon或由传统坐标对定义的形状。
 * 该$geoWithin运营商使用$geometry 运营商指定GeoJSON的对象。
 * 
 * 务必保证 传入的是区域
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
        console.log(arg);
        var query = {
            // scope: {
                $geoWithin: {
                    $geometry: {
                        /*******  Point 类型不可以   */
                        // type: "Point",
                        // coordinates: [1.5, 0.5]

                        /*******  Polygon   */
                        type: "Polygon",
                        coordinates: [
                            [[-0.5, -0.5],[-0.5, 1.5], [2.2, 1.5], [2.2, -0.5], [-0.5, -0.5]]
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