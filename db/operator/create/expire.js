var async = require('async');
var mongoose = require('mongoose');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');


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
        user.create({
            name: "pauly",
            age: 128,
            work: "soft engineer",
            value: 3,
            createdAt: new Date()
        }, cb);
    },
], function (err, res) {
    console.log(res); // model 实例
    db.close();
});