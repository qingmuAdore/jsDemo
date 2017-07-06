var redis = require('../bin/redis.js');
var async = require('async');
redis.open();
var client = redis.client;

var filterTag = ['Location_', 'Tag_'];
async.waterfall([
    function (cb) {
        client.keys("*", cb);
    },
    function (keys, cb) {
        var retain = keys.filter(function (key) {
            return filterTag.every(function (tag) {
                return key.indexOf(tag) == -1;
            });
        });
        cb(null, retain);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
    redis.close();
});


