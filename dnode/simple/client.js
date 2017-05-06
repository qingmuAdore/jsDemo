var dnode = require('dnode');
//host:ip
var d = dnode.connect(20010);

d.on('error', function (err, res) {
    console.log(err);
})

d.on('remote', function (remote) {
    // remote.user.login('13825002527', '123456', function ( res) {
    //     console.log(res);
    // });

    remote.user.add({
        name: 'pauly',
        password: '123456',
        nickname: 'pauly',
        department_id: '58cf704fb84f362648d68a0b',
        role_id: '58cf704fb84f362648d68a0b',
    }, function (res) {
        d.destroy();
        console.log(res);
    });
});