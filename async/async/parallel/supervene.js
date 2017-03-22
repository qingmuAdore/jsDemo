/**
 * parallel
 * 
 * @并发执行
 * @结果是顺序给出
 */
var async = require('async');

async.parallel([
    function (cb) {
        setTimeout(function () {
            console.log('run one');
            cb(null, 'one');
        }, 200);
    }, function (cb) {
        setTimeout(function () {
            console.log('run two');
            cb(null, 'two');
        }, 100);
    }, function (cb) {
        setTimeout(function () {
            console.log('run three');
            cb(null, 'three');
        }, 150);
    }
], function (err, res) {
    console.log(err);
    console.log(res);
});

/*

run two
run three
run one
null
[ 'one', 'two', 'three' ]

*/