## soap

### math

```
使用 node-soap(npm install soap -g) 启动web service服务
```
> wsdl

```
Eclipse JEE, WEB Service 创建 该文件,并编辑
```

> soap [server.js](./math/server.js)

```
server.js

启动服务
soap.listen(server, '/mathWS', MathService, xml);
```

> express [express.js](./math/express.js)

```
支持 express 启动

app.listen(7777, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/mathWS', MathService, xml);
});
```


### middle

```
采用express router 方式,支持多个 WS service,
依赖库 express-soap(npm install -g express-soap)
```

> server [server.js](./middle/server.js)

```
app.use('/mathWS', soap.soap({
    services:**, //定义服务
    wsdl:**,  //wsdl文件内容
}));
```
