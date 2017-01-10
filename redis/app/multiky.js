var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = 'localhost', //服务器IP
    RDS_OPTS = {}, //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('ready', function(err) {
    console.log('ready');
});

client.on('connect', function() {
    client.hmset('short', { 'js': 'javascript', 'C#': 'C Sharp' });; //, redis.print);
    client.hmset('short', 'SQL', 'Structured Query Language', 'HTML', 'HyperText Mark-up Language', redis.print);

    client.hgetall("short", function(err, res) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        console.dir(res);
    });
});