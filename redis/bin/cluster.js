/**
 *  集群方式连接 redis
 * 
 */
var RedisClustr = require('redis-clustr');
var configCluster = require('../config.js').cluster;
var client = new RedisClustr({
    servers: [
        configCluster
    ]
});

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

exports.close = function () {
    if (!client) return;
    client.end(true);
}

exports.client = client;