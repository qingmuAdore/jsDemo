/**
 * parallel
 * 
 * @并发执行
 * @结果是顺序给出
 * @若中途出现错误:并不对其他动作造成影响
 *     ** 结果依然是顺序的(用null填充)
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
            cb('err', 'two');
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
err
[ , 'two' ]
run three
run one

*/