/**
 * arg callback
 * 
 * @args the first arguments should is function
 * @return the function
 *
 * when run the return excute,the args[0](is function) will excute. we can get the arguments,the return function args and 
 * the args when we input (except args[0]);
 * 
 * 函数功能: 生成回调函数,注意改函数的第一个参数必选是函数,用于回调函数执行完成后,携带的参数.
 * 携带的参数也可以用户自定义好,做法传入该函数即可 形式如下: var cb = function(run,args);
 * @cb:回调函数
 * @args: 用户自定义参数(在run中返回)
 * @run: 参数中包含cb.arguments + args
 */

var sysApi = require('./sysApi.js');

module.exports = function() {
    if (sysApi.type(arguments[0]) != 'Function') {
        throw 'the first arguments must be function';
    }
    var cb = arguments[0],
        len = arguments.length,
        args = [];
    for (var i = 1; i < len; i++) {
        args[i - 1] = arguments[i];
    }
    return function() {
        Array.prototype.push.apply(arguments, args);
        cb.apply(this, arguments);
        // cb.call(this, ...arguments, ...args);
    }
}