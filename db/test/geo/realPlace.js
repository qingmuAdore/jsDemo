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


var pow = Math.pow(73.9667 - 73.9667, 2) + Math.pow(40.78 - 40.7538, 2);
console.log(pow);
console.log(Math.sqrt(pow));

var data = [{
    name: 'Central Park',
    location: {
        coordinates: [-73.9667, 40.78]
    }
}, {
    name: 'Bryant Park',
    location: {
        coordinates: [-73.9836, 40.7538]
    }
}, {
    name: 'Sara D. Roosevelt Park',
    location: {
        coordinates: [-73.9928, 40.7193]
    },
}];

function exit() {
    async.parallel([
        // function (cb) {
        //     place.removeAll(cb);
        // }
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
    //     place.geoNear([-73.9667, 40.78], { spherical: true }, cb);
    // }
], function (err, res, status) {
    console.log(err);
    console.log(res);
    exit();
});

