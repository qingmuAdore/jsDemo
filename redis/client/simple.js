var redis = require('redis'),
    client = redis.createClient();

client.on('ready', function(err) {
    console.log('ready');
});