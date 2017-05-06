var dnode = require('dnode');
//host:ip
var d = dnode.connect(5004);
d.on('remote', function (remote) {
    remote.admin.login({ mobile: '13825002527', password: '123456' }, function (err, res) {
        console.log(err);
        console.log(res);
    });
});