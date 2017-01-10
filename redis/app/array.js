var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function(err) {
    console.log("Error " + err);
});

client.hset("hash key", "hashtest 1", "some 1 value", redis.print);
client.hset(["hash key", "hashtest 2", "some 2 value"], redis.print);
client.hset(["hash key", "hashtest 3", "some 3 value"], redis.print);
client.hset("hash key", "hashtest 4", "some 4 value", redis.print);
client.hkeys("hash key", function(err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function(reply, i) {
        console.log("    " + i + ": " + reply);
    });
});
// client.quit();
client.hvals("hash key", function(err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function(reply, i) {
        console.log("    " + i + ": " + reply);
    });
});

client.hgetall("hash key", function(err, reply) {
    console.log(reply);
    // console.log(reply["hashtest 1"]);
})