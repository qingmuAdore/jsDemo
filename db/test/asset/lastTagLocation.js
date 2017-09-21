var async = require('async');
var db = require('../../lib/db.js');
var tagRegionLocation = require('../../model/tagRegionLocation.js');
var mongoose = require('mongoose');


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        tagRegionLocation.aggregate()
            .sort({ timestamp: 1 })
            .group({
                _id: '$tag_id',
                location: {
                    $last: { floor_id: '$floor_id', point: '$position.coordinates', timestamp: '$timestamp' }
                }
            })
            .sort({ _id: 1 })
            .exec(cb);
    },
    function (res, cb) {
        cb(null, res);
    }
], function (err, res) {
    db.close();
});