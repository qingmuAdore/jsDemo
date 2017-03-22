var Async = require('./async');

/** 
 * 调用方法 
*/
var customFn = function (arg, time, cbFn) {
    arg = arg || '';
    if (typeof time === 'function') {
        cbFn = time;
        time = null;
    }
    time = time || 1000;
    cbFn = cbFn || function () { };

    setTimeout(function () {
        console.log(arg)
        cbFn(arg);
    }, 1000);
}

/**
 * 执行
 */
Async.parall([function (cbFn) {
    customFn('one', cbFn);
}, function (cbFn) {
    customFn('two', cbFn);
}], function (r) {
    console.log('-------------------------------');
    console.log(r);
});