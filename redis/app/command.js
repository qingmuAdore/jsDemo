var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = 'localhost', //服务器IP
    RDS_OPTS = {}, //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('end', function(err) {
    console.log('end');
});

client.on('connect', function() {
    var key = 'skills';
    client.sadd(key, 'C#', 'java', redis.print);
    client.sadd(key, 'nodejs');
    client.sadd(key, "MySQL");

    client.multi()
        .sismember(key, 'C#')
        .smembers(key)
        .exec(function(err, replies) {
            console.log("MULTI got " + replies.length + " replies");
            replies.forEach(function(reply, index) {
                console.log("Reply " + index + ": " + reply.toString());
            });
            client.quit();
        });
});