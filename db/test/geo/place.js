/**
 * 地理处理
 * 
 * $near :附近
 *    指定点附近的(minDistance maxDistance) 点
 * 
 * $geoWithin: 在区域
 *    点是否在指定区域
 */

var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var place = require('../../model/place.js');

var data = [{
    name: 'place1',
    location: {
        coordinates: [1, 1]
    }
}, {
    name: 'place2',
    location: {
        coordinates: [1, 2]
    }
}, {
    name: 'place3',
    location: {
        coordinates: [2, 2]
    }
}, {
    name: 'place4',
    location: {
        coordinates: [2, 1]
    }
}];

function exit() {
    async.parallel([
        function (cb) {
            place.removeAll(cb);
        }
    ], function (err, res) {
        db.closeDB();
    })
}

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        place.create(data, cb);
    },
    function (arg, cb) {
        var query = {
            "location.coordinates": {
                $near: [0.5, 0.5],
                $maxDistance: 1,
            }
        };
        place.find(query, cb);
    },
    // function (arg, cb) {
    //     console.log(arg);
    //     var query = {
    //         location: {
    //             $geoWithin: {
    //                 $geometry: {
    //                     type: "Polygon",
    //                     coordinates: [[[0, 0], [0, 1.5], [1.5, 1.5], [1.5, 0], [0, 0]]]
    //                 }
    //             }
    //         }
    //     };
    //     place.find(query, cb);
    // }
], function (err, res) {
    console.log(err);
    console.log(res);
    // exit();
    db.closeDB();
})