var soap = require('soap');
var http = require('http');
var uuid = require('node-uuid');
var express = require('express');

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

var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));
app.listen(7777, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/mathWS', MathService, xml);
});