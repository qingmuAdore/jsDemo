## http

> [服务端](./server.js)

```
//启动服务
http.createServer(function(req, res) {
    console.log('request url:' + req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
```

> [客户端](./server.js)

```
//发起请求
var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
        console.log(data);
    });
});
```