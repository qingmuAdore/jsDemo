var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');

var doc = {
    name: 'pauly',
    age: '28',
    work: 'softEngineer'
};

async.waterfall([
    function(cb) {
        db.openDB(cb);
    },
    function(arg, cb) {
        user.create(doc, cb);
    },
    function(arg, cb) {
        user.findOne({ name: doc.name }, cb);
    },
    function(arg, cb) {
        console.log(arg);
        user.remove({}, cb);
    }
], function(err, res) {
    db.closeDB();
});