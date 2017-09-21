var async = require('async');
var db = require('../../lib/db.js');
var device = require('../../model/device.js');
var floor = require('../../model/floor.js');
var building = require('../../model/building.js');
var product  = require('../../model/product.js');
var mongoose = require('mongoose');

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (connection, cb) {
        const populate = {
            path: 'floor_id product_id',
            populate: {
                path: 'building_id'
            }
        };
        device.find({}).populate(populate).exec(cb);
    }
], function (err, res) {
    db.close();
});