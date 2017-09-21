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
var db = require('../../../lib/db.js');
var place = require('../../../model/place.js');

var data = [{
    name: 'place1',
    location: {
        coordinates: [3, 7]
    }
}, {
    name: 'place2',
    location: {
        coordinates: [4, 6]
    },
    pos: {
        location: {
            coordinates: [5, 5]
        },
    }
}, {
    name: 'place3',
    location: {
        coordinates: [6, 4]
    }
}, {
    name: 'place4',
    location: {
        coordinates: [7, 3]
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
    // function (arg, cb) {
    //     place.aggregate().project({
    //         sub: {
    //             $subtract: [
    //                 { left: { $arrayElemAt: ["$location.coordinates", 0] } },
    //                 { right: { $arrayElemAt: ["$location.coordinates", 1] } }
    //             ]
    //         },
    //     }).exec(cb);
    // },
    function (arg, cb) {
        console.log(arg);
        var coordinates = [1, 1];
        place.aggregate().project({
            left: { $pow: [{ $subtract: [{ $arrayElemAt: ["$location.coordinates", 0] }, coordinates[0]] }, 2] },
            right: { $pow: [{ $subtract: [{ $arrayElemAt: ["$location.coordinates", 1] }, coordinates[1]] }, 2] }
        }).exec(cb);
    },
    function (arg, cb) {
        console.log(arg);
        cb(null, arg);
    },
], function (err, res) {
    console.log(err);
    console.log(res);
    exit();
    // db.close();
});