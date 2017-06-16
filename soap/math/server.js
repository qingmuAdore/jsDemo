var soap = require('soap');
var http = require('http');
var uuid = require('node-uuid');

var MathService = {
    math: {
        SMath: {
            add: function (args, cb, headers, req) {
                console.log(args);
                return Number(args.x) + Number(args.y);
            },
            sub: function (args, cb, headers, req) {
                console.log(args);
                return Number(args.x) - Number(args.y);
            },
        }
    }
};

var xml = require('fs').readFileSync(__dirname + '/math.wsdl', 'utf8'),
    server = http.createServer(function (request, response) {
        response.end("404: Not Found: " + request.url);
    });

server.listen(7777);

var soapServer = soap.listen(server, '/mathWS', MathService, xml);
soapServer.log = function (type, data) {
    // type is 'received' or 'replied'
    console.log(type + " : " + data);
};