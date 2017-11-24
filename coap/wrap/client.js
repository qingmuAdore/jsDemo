var coap = require('coap');

var outgoing = coap.request({
    method: 'POST',
    // host: '10.10.38.80',
    host:'127.0.0.1',
    port: 10000,
    pathname: '/beacon/push',
    query: 'mac=0A1122334455&nouce=cmpp'
});

outgoing.setOption("Content-Format", "application/json");
outgoing.on('response', function (incoming) {
    console.log(incoming.payload.toString());
});

outgoing.end();