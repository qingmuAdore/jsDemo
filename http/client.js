var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
    name: 'pauly',
    email: 'pauly@sae.com.hk',
    address: 'new ook'
});

var options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contents.length
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
        console.log(data);
    });
});

req.write(contents);
req.end(); //不能漏掉，结束请求，否则服务器将不会收到信息。