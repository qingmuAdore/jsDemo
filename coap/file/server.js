var coap = require('coap')
    , server = coap.createServer();
var fs = require('fs');
var fpath = __dirname + '/../public/redis.png';

server.on('request', function (req, res) {
    var buffer = fs.readFileSync(fpath);
    console.log(buffer.byteLength);
    res.end(buffer);
})

// the default CoAP port is 5683
server.listen(function () { });