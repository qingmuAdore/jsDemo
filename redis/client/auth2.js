var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = '127.0.1.1', //服务器IP
    RDS_PWD = 'porschev',
    RDS_OPTS = {}, //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.auth(RDS_PWD, function() {
    console.log('通过认证');
});

client.on('ready', function(res) {
    console.log('ready');
});