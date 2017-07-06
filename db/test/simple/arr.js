var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');
var mongoose = require('mongoose');


async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        var docs = [{
            name: 'pauly',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'adore',
            age: '29',
            work: 'softEngineer'
        }, {
            name: 'mu',
            age: '30',
            work: 'softEngineer'
        },];
        user.create(docs, cb);
    },
    function (users, cb) {
        user.find({}).remove(cb);
    }
], function (err, res) {
    db.closeDB();
});