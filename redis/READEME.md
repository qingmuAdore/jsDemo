### client

> createClient()

```
createClient(port,host,options)
```

### app

> single

```
client.set('author', 'Wilson', redis.print);
client.get('author', redis.print);

//输出
Wilson

```

> multi

```
client.hmset('short', { 'js': 'javascript', 'C#': 'C Sharp' });; //, redis.print);
client.hmset('short', 'SQL', 'Structured Query Language', 'HTML', 'HyperText Mark-up Language', redis.print);

client.hgetall("short", function(err, res) {
    if (err) {
        console.log('Error:' + err);
        return;
    }
    console.dir(res);
});

//输出
{ js: 'javascript',
  'C#': 'C Sharp',
  SQL: 'Structured Query Language',
  HTML: 'HyperText Mark-up Language' }
```

> array

```
client.hset("hash key", "hashtest 1", "some 1 value", redis.print);
client.hset(["hash key", "hashtest 2", "some 2 value"], redis.print); // or
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
    console.log(reply["hashtest 1"]);
})

//输出
4 replies:
    0: hashtest 1
    1: hashtest 2
    2: hashtest 3
    3: hashtest 4
4 replies:
    0: some 1 value
    1: some 2 value
    2: some 3 value
    3: some 4 value
{ 'hashtest 1': 'some 1 value',
  'hashtest 2': 'some 2 value',
  'hashtest 3': 'some 3 value',
  'hashtest 4': 'some 4 value' }
```