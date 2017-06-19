var soap = require('soap');
var url = 'http://10.10.38.80:7777/mathWS?wsdl';
soap.createClient(url, function (err, client) {
    if (err) return (err);
    client.add({ x: 13, y: 3 }, function (err, res) {
        console.log('add', err, res);
    });

    client.sub({ x: 13, y: 3 }, function (err, res) {
        console.log('sub', err, res);
    });

    client.len({ in: [11, 12, 13] }, function (err, res) {
        console.log('len', err, res);
    });
});