var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = 'localhost', //服务器IP
    RDS_OPTS = {}, //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);


client.on('connect', function() {
    client.set('author', 'Wilson', redis.print);
    client.get('author', redis.print);

    console.log('connect');
});

client.on('ready', function(err) {
    console.log('ready');
});