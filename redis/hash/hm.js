var redis = require('../bin/redis.js');
var async = require('async');

redis.open();
var client = redis.client;


async.waterfall([
    function (cb) {
        client.hmget('myhash', ['name', 'age', 'nofield'], cb);
    },
    function (reply, cb) {
        console.log('reply:', reply);
        client.hmset("myhash", ["name", "pauly", "age", "29"], cb);
    },
    function (reply, cb) {
        client.hmget('myhash', ['name', 'age', 'nofield'], cb);
    },
    function (reply, cb) {
        [name,age,nofield='info'] = reply;
        console.log(name,age,nofield);
        console.log('reply:', reply);
        client.del(['myhash'], cb);
        // client.del(['myhash','mykey','mylist','ts'],cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    redis.close();
});


