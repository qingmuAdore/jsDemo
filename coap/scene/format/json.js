var coap = require('coap');

var outgoing = coap.request({
    method: 'POST',
    host: '10.10.38.80',
    port: 5683,
    pathname: '/beacon/push'
});

var doc = {
    id: "184f32f18163",
    pkey: "THumiture",
    data: [{
        tid: "1111",
        temperature: 12.5,
        humidity: 51.2,
        timestamp: 111111
    }]
};

console.log(JSON.stringify(doc));
outgoing.setOption("Content-Type", "application/json");
outgoing.on('response', function (incoming) {
    console.log(incoming.payload.toString());
});

outgoing.end(JSON.stringify(doc));