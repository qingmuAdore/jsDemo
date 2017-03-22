/**
 * compose
 * @按顺序加入到队列中, 反序执行
 * @上一个函数的结果作为下一个函数的值
 * @若中途出现错误:
 *         中断处理
 */
var async = require('async');

function add(n, cb) {
    setTimeout(function () {
        cb(null, n + 1);
    }, 10);
}

function mul(n, cb) {
    setTimeout(function () {
        cb('err', n * 3);
    }, 20);
}

function div(n, cb) {
    setTimeout(function () {
        cb(null, n / 2);
    }, 10);
}

// var combine = async.compose(div,mul, add);
var combine = async.compose(add, mul, div);

combine(4, function (err, res) {
    console.log(err);
    console.log(res);
});