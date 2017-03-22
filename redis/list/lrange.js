var redis = require('../bin/redis.js');
var async = require('async');
redis.open();
var client = redis.client;

async.waterfall([
    function (cb) {
        // 支持压入多个数据
        client.lpush(['mylist', ...['one', 'two', 'three', 'four', 'five']], cb);
    },
    function (arg, cb) {
        console.log(arg);
        //获取数据  key start stop 
        client.lrange(['mylist', 0, 10], cb);
    },
    function (arg, cb) {
        console.log(arg);
        //截取数据 key start stop 
        client.ltrim(['mylist', 0, 2], cb);
    },
    function (arg, cb) {
        console.log(arg);
        //获取数据  key start stop 
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




/* 输出

5
[ 'five', 'four', 'three', 'two', 'one' ]
OK
[ 'five', 'four', 'three' ]
null
1

*/