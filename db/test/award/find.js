var async = require('async');
var db = require('../../lib/db.js');
var award = require('../../model/award.js');

var doc = {
    name: 'pauly',
    totol: 500,
    num: 50,
    lower: 1,
    upper: 20,
    wish: '新年快乐'
};

async.waterfall([
    function(cb) {
        db.openDB(cb);
    },
    function(arg, cb) {
        award.add(doc, cb);
    },
    function(arg, cb) {
        award.findOne({ name: doc.name }, cb);
    },
    function(arg, cb) {
        console.log(arg);
        award.remove({}, cb);
    }
], function(err, res) {
    db.closeDB();
});