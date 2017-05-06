var dnode = require('dnode');

var admin = {
    login: function (s, cb) {
        console.log('admin login:' + JSON.stringify(s));
        cb(null,{ code: 200, token: 'admin 1234' });
    }
}

var user = {
    login: function (s, cb) {
        console.log('user login:' + JSON.stringify(s));
        cb(null,{ code: 200, token: 'user 1234' });
    }
}

var server = dnode({
    admin: admin,
    user: user
});

server.listen(5004);
