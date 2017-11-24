var redis = require('../bin/redis.js');
var async = require('async');


redis.open();
var client = redis.client;


async.waterfall([
    function (cb) {
        client.hget('myhash', 'name', cb);
    },
    function (reply, cb) {
        console.log('reply:', reply);
        client.hset('myhash', 'name', 'pauly', cb);
    },
    function (reply, cb) {
        client.hget('myhash', 'name', cb);
    },
    function (reply, cb) {
        console.log('reply:', reply);
        client.del(['myhash'], cb);
        // client.del(['myhash','mykey','mylist','ts'],cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    redis.close();
});


