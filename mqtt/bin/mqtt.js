var mqtt = require('mqtt');
var config = require('./config.js');

var client = mqtt.connect(config);

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

client.on('connect', function () {
    client.publish('/device/test', 'hello world', function (err, res) {
        console.log(err);
        console.log(res);
    });

    client.subscribe('/device/sub');
});


