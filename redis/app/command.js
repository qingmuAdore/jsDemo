var redis = require('redis'),
    RDS_PORT = 6379, //端口号
    RDS_HOST = 'localhost', //服务器IP
    RDS_OPTS = {}; //设置项
var client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('end', function(err) {
    console.log('end');
});


client.on('connect', function() {
    client.hmset('short', { 'js': 'javascript', 'C#': 'C Sharp' }, function() {
        console.log(arguments);
    });; //, redis.print);
    client.hmset('short', 'SQL', 'Structured Query Language', 'HTML', 'HyperText Mark-up Language', redis.print);

    // client.send_command('LINDEX', ['short', 2])
    client.hgetall("short", function(err, res) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        console.dir(res);
    });

    // client.lindex(["short", 2], function(err, res) {
    //     if (err) {
    //         console.log('Error:' + err);
    //         return;
    //     }
    //     console.dir(res);
    // });

    // client.geohash("sort", 1, function(err, res) {
    //     if (err) {
    //         console.log('Error:' + err);
    //         return;
    //     }
    //     console.log(res);
    // });

    client.lpush(['mylist', 1, 2, 3, 4], function() {
        console.log(arguments);
    });

    client.lpush(['mylist', 5], function() {
        console.log(arguments);
    })

    client.lrange(["mylist", 0, 2], function(err, res) {
        console.log(err, res);
    })

    client.lindex('mylist', 0, function(err, res) {
        console.log(err, res);
    })
});