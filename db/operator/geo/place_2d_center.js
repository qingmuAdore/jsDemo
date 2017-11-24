/**
 * 地理处理
 * 
 * 该$center运营商指定了一个圆圈 $geoWithin查询。
 * 查询返回在圆圈范围内的遗留坐标对。操作者不 传回GeoJSON的对象。
 * 
 * $center/$centerSphere
 * 不需要地理空间指数。然而，地理空间索引将提高查询性能。
 * 无论2dsphere和二维地理空间索引支持
 */

var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var place = require('../../model/geo_place_2d.js');

var data = [{
    name: 'place1',
    location: {
        coordinates: [10, 10]
    }
}, {
    name: 'place2',
    location: {
        coordinates: [10, 20]
    }
}, {
    name: 'place3',
    location: {
        coordinates: [20, 20]
    }
}, {
    name: 'place4',
    location: {
        coordinates: [20, 10]
    }
}];

function exit() {
    async.parallel([
        function (cb) {
            place.removeAll(cb);
        }
    ], function (err, res) {
        db.close();
    });
};

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        place.create(data, cb);
    },
    function (arg, cb) {
        var query = {
            location: {
                // "location.coordinates": { //也可以
                $geoWithin: {
                    $center: [
                        [5, 5],
                        18
                    ]
                }
            }
        };
        place.find(query, cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    exit();
});