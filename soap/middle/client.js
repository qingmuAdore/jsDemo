var soap = require('soap');
var url = 'http://10.10.38.80:9999/mathWS?wsdl';
soap.createClient(url, function (err, client) {
    if (err) return (err);
    client.add({ x: 13, y: 3 }, function (err, res) {
        console.log(err, res);
    });
    client.sub({ x: 13, y: 3 }, function (err, res) {
        console.log(err, res);
    });
});