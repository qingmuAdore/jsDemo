var coap = require('coap');

var outgoing = coap.request({
    method: 'POST',
    host: '10.10.38.80',
    port: 3000,
    pathname: '/beacon/push',
    query: 'mac=0A1122334455&nouce=cmpp'
});

outgoing.setOption("Content-Type", "application/json");
outgoing.on('response', function (incoming) {
    console.log(incoming.payload.toString());
});

outgoing.end();