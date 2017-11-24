var coap = require('coap')
    , server = coap.createServer({
        piggybackReplyMs: 50
    });

server.on('request', function (req, res) {
    console.log(req.url);
    res.end('Hello ' + req.url.split('/')[1] + '\n')
})

// the default CoAP port is 5683
server.listen(10000, function () {
    console.log('server start!');
})