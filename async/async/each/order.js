/**
 * 如果想对同一个集合中的所有元素都执行同一个异步操作，可以利用each函数。
 *
 * async提供了三种方式：
 * 1. 集合中所有元素并行执行
 * 2. 一个一个顺序执行
 * 3. 分批执行，同一批内并行，批与批之间按顺序
 *
 * 如果中途出错，则错误将上传给最终的callback处理。其它已经启动的任务继续执行，未启动的忽略。
 */
var async = require('async');
var arr = [{ name: 'Jack', delay: 200 },
    { name: 'Mike', delay: 100 },
    { name: 'Freewind', delay: 300 }];

/**
 * 与each相似，但不是并行执行。而是一个个按顺序执行。
 */
async.eachSeries(arr, function (item, callback) {
    console.log('enter: ' + item.name);
    setTimeout(function () {
        console.log('handle: ' + item.name);
        callback(null, item.name);
    }, item.delay);
}, function (err) {
    console.log('err: ' + err);
});


