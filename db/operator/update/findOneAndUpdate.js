var async = require('async');
var db = require('../../lib/db.js');
var device = require('../../model/device.js');
var mongoose = require('mongoose');

function exit() {
    async.parallel([
        function (cb) {
            order.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (connection, cb) {
        device.create({ id: 'device_001', name: 'device_name' }, cb);
    },
    function (arg, cb) {
        console.log(arg);
        device.findOneAndUpdate({ name: 'device_name' }, { type: 'fa' }, cb);
    }
], function (err, res) {
    console.log(res); // model 实例
    exit();
});