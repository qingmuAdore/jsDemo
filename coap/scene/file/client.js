var coap = require('coap');
var fs = require('fs');
var fpath = __dirname + '/../public/redis_1.png';

var outgoing = coap.request('coap://10.10.38.80/fstream');

var fstream = fs.openSync(fpath, 'w+');

outgoing.on('response', function (incoming) {
    fs.writeFileSync(fpath, incoming.payload);
});

outgoing.end();