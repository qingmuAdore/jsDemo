var Async = require('./async');

Async.waterfall([
    function (cb) {
        console.log('run one');
        setTimeout(function () {
            cb(null, 'one');
        }, 250);
    }, function (data, cb) {
        console.log('task ' + data + ' finished! ' + 'run two');
        setTimeout(function () {
            cb(null, 'two');
        }, 120);
    }, 
    // function (data, cb) {
    //     console.log('task ' + data + ' finished! ' + 'run three');
    //     setTimeout(function () {
    //         cb(null, 'three');
    //     }, 200);
    // }
], function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log("result:"+res);
    }
});