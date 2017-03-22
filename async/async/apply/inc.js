var async = require('async');

var wait = function (mils) {
    //刻意等待mils的时间，mils的单位是毫秒。
    var now = new Date;
    while (new Date - now <= mils);
}

function inc(a, b, cb, timeout) {
    var timeout = timeout || 200;
    wait(200);
    setTimeout(function () {
        cb(null, a + b);
    }, timeout);
}

var fn = async.apply(inc, 1, 2);

fn(function (err, n) {
    console.log('1.2 inc: ' + n);
});