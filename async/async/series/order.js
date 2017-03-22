/**
 * series 
 * @顺序执行
 * @res是各个过程的结果
 * @若中途出现错误:
 *    中断后续操作,直接在最终的回调中处理
 */
var async = require('async');

function verifyAppearance(cb) {
    cb(null, 'appearance pass');
}

function verifyFunction(cb) {
    cb(null, 'funciton pass');
}

function verifyUse(cb) {
    cb(null, 'use pass');
}

async.series([
    function (cb) {
        verifyAppearance(cb);
    }, function (cb) {
        verifyFunction(cb);
    }, function (cb) {
        verifyUse(cb);
    }

], function (err, res) {
    console.log(err);
    console.log(res);
});

/*
null
[ 'appearance pass', 'funciton pass', 'use pass' ]
*/