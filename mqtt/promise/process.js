var mqtt = require('mqtt');
var bluebird = require('bluebird');
var config = require('../bin/config.js');

var client = mqtt.connect(config);
bluebird.promisifyAll(client);
var TAG = 'MQTT';


client.on('message', function (topic, message) {
    // message is Buffer
    console.log('t:' + topic + ' m:' + message.toString());
});

client.on('reconnect', function () {
    console.log(TAG + ' reconnect');
});

client.on('close', function () {
    console.log(TAG + ' close');
});

client.on('error', function (err) {
    console.log(TAG + ' error');
    console.log(err);
});

client.on('offline', function () {
    console.log(TAG + ' offline');
});

client.on('connect', async function () {
    // client.publish('/device/test', 'hello world', function (err, res) {
    //     console.log(err);
    //     console.log(res);
    // });

    var res = await client.publishAsync('/device/test', 'hello world');
    console.log(res);
});