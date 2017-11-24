/**
 * 连接多服务端
 */

const redis = require('redis');


const localClient = redis.createClient({
    host:'localhost'
});

const remoteClient = redis.createClient({
    host: '10.10.38.213'
});


localClient.get('mykey', function (err, reply) {
    console.log(err, reply);
});


remoteClient.get('DeviceInfo_0030184f156e', function (err, reply) {
    console.log(err, reply);
});

