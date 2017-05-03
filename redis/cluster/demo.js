var client = require('../bin/cluster.js').client;
var async = require('async');

async.waterfall([
    function (cb) {
        client.get('name', cb);
    },
    function (res, cb) {
        console.log(res);
        client.set(['age', 10], cb);
    },
    function (res, cb) {
        client.get('age', cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
})
