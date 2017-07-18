[TOC]

# coap

## file

> [server](./file/server.js)

```
读取文件,发送文件内容
```

> [client](./file/client.js)

```
coap网络请求,获取内容(其中涉及多次socket网络通信),写入文件
```


## router

> [routes](./router/routes)

```
添加路由模块
```

> [app](./router/app.js)

```
返回 rest入口 function(req,res)
```

> [server](./router/server.js)

```
创建coap 服务

const server = coap.createServer(app);
```