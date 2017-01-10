var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = 'localhost', //服务器IP 可设置
    RDS_OPTS = {}, //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('ready', function(res) {
    console.log('ready');
});