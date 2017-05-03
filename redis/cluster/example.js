/**
 * redis 集群示例
 */
var client = require('../bin/cluster.js').client;

client.get('name', function (err, res) {
    console.log(res); // pauly
});
