var async = require('async');
var db = require('../../lib/db.js');
var location = require('../../model/location.js');
var mongoose = require('mongoose');


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var doc = {
            tag_id: '134',
            timestamp: '12431234'
        };
        location.create(doc, cb);
    },
], function (err, res) {
    console.log(res);
    db.close();
});