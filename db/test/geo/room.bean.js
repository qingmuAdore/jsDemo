var db = require('../../lib/db.js');
var room = require('../../model/room.js');
var async = require('async');
var mongoose = require('mongoose');

var data = {
    name: 'pauly1',
    price: 1,
    scope:[[[0, 0], [0, 2.5], [2.5, 2.5], [2.5, 0],[0, 0]]]
};

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        room.create(data, cb);
    },
    function (arg, cb) {
        var query = {
            location: {
                $near: [2.5, 2.5],
                $maxDistance: 1
            }
        };
        room.find(query, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var query = {
            location: {
                $geoWithin: {
                    $geometry: {
                        type: "Polygon",
                        coordinates: [[[0, 0], [0, 2.5], [2.5, 2.5], [2.5, 0],[0, 0]]]
                    }
                }
            }
        };
        room.find(query, cb);
    },
    function (arg, cb) {
        console.log(arg);
        room.remove({}, cb);
    }
], function (err, res) {
    console.log(err);
    db.closeDB();
})