var db = require('../../lib/db.js');
var goods = require('../../model/goods.js');
var async = require('async');
var mongoose = require('mongoose');

// var data = [{
//     name: 'pauly1',
//     price: 1,
//     location: [1, 1]
// }, {
//     name: 'pauly2',
//     price: 2,
//     location: [2, 2]
// }, {
//     name: 'pauly3',
//     price: 3,
//     location: [3, 3]
// }, {
//     name: 'pauly4',
//     price: 4,
//     location: [4, 4]
// }];

var data = [{
    name: 'pauly1',
    price: 1,
    location: [1, 2]
}, {
    name: 'pauly2',
    price: 2,
    location: [2, 3]
}, {
    name: 'pauly3',
    price: 3,
    location: [3, 2]
}, {
    name: 'pauly4',
    price: 4,
    location: [2, 1]
}];

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        goods.create(data, cb);
    },
    function (arg, cb) {
        var query = {
            location: {
                $near: [2.5, 2.5],
                $maxDistance: 1
            }
        };
        goods.find(query, cb);
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
        goods.find(query, cb);
    },
    function (arg, cb) {
        console.log(arg);
        goods.remove({}, cb);
    }
], function (err, res) {
    console.log(err);
    db.closeDB();
})