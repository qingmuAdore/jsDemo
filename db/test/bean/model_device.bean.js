/**
 * 可直接对 Object,字段进行查询 
 */

var async = require('async');
var db = require('../../lib/db.js');
var device = require('../../model/device.js');

var doc = {
    name: 'saeDevice',
    value: {
        x: 123,
        y: 12
    }

};

async.waterfall([
    function(cb) {
        db.openDB(cb);
    },
    function(arg, cb) {
        device.add(doc, cb);
    },
    function(arg, cb) {
        console.log(arg);
        // device.findOne({ name: doc.name }, cb);
        //直接查询
        device.findOne({ 'value.x': 123 }, cb);
    },
    function(arg, cb) {
        console.log(arg);
        device.remove({}, cb);
    }
], function(err, res) {
    db.closeDB();
});