var redis = require('redis');
var bluebird = require('bluebird');
var configRedis = require('../config.js').redis;
var client = null;



exports.open = function () {
    exports.client = client = redis.createClient(configRedis);
    // client.select();

    client.on('connect', function () {
        console.log('redis connected');
    });

    client.on('ready', function (err) {
        console.log('redis ready');
    });

    client.on('end', function (err) {
        console.log('redis end');
    });

    client.on('error', function (err) {
        console.log('redis error:' + err);
    });
}

exports.close = function () {
    if (!client) return;
    client.end(true);
}