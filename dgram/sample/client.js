const dgram = require('dgram');
const message = Buffer.from('Our Request');
const client = dgram.createSocket('udp4');
client.send(message, 9999, '10.10.38.209', function(err) {
    console.log(arguments);
    client.close();
});