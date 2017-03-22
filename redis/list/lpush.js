var redis = require('../bin/redis.js');
var async = require('async');
redis.open();
var client = redis.client;

async.waterfall([
    function (cb) {
        //压入数据
        client.lpush(['mylist', 'one'], cb);
    },
    function (arg, cb) {
        // 支持压入多个数据
        client.lpush(['mylist', ...['two', 'three', 'four']], cb);
    },
    function (arg, cb) {
        console.log(arg);
        //获取数据 
        client.lrange(['mylist', 0, 10], cb);
    },
    function (arg, cb) {
        console.log(arg);
        //删除 key 值
        client.del('mylist', cb);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    redis.close();
});
