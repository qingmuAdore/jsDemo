### [nodejs](./bin/mqtt.js)

> connect 

```
var config  = {
    host: '10.10.38.64',
    port: 1883,
}

var client = mqtt.connect(config);
```

> message

```
订阅消息,通过该消息队列获取内容

client.on('message', function (topic, message) {
    // message is Buffer
    console.log('t:' + topic + ' m:' + message.toString());
});

```

### [web](./web/index.html) 

> mqtt 进行转化,支持browser

```
npm install -g browserify // install browserify
cd node_modules/mqtt
npm install . // install dev dependencies
browserify mqtt.js -s mqtt > browserMqtt.js // require mqtt in your client-side app
```

> 