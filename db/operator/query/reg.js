var async = require('async');
var db = require('../../lib/db.js');
var device = require('../../model/device.js');
var floor = require('../../model/floor.js');
var building = require('../../model/building.js');
var product = require('../../model/product.js');
var mongoose = require('mongoose');

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (connection, cb) {
        device.find({ type: new RegExp("host", "i") }).exec(cb);
    }
], function (err, res) {
    console.log(res);
    db.close();
});