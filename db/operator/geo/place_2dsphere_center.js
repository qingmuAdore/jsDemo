/**
 * 地理处理
 * 
 * $center :半径访问内
 * 
 * $center/$centerSphere
 * 不需要地理空间指数。然而，地理空间索引将提高查询性能。
 * 无论2dsphere和二维地理空间索引支持 $geoWithin。
 */

var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var place = require('../../model/geo_place_2dsphere.js');

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
    })
}



async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        place.create(data, cb);
    },
    function (arg, cb) {
        console.log('$center: 10内 radius: 10');
        var query = {
            location: {
                $geoWithin: {
                    $center: [
                        [5, 5],
                        10
                    ]
                }
            }
        };
        place.find(query, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var query = {
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [5, 5],
                        10
                    ]
                }
            }
        };
        place.find(query, cb);
    }
], function (err, res) {
    console.log(res);
    console.log(err);
    exit();
});