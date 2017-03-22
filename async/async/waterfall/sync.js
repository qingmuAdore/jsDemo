/**
 * waterfall
 * 
 * @顺序执行
 * @err 出错中断后续
 * @res 最后执行function的结果
 */
var async = require('async');

async.waterfall([
    function (cb) {
        console.log('run one');
        setTimeout(function () {
            cb(null, 'one');
        }, 1000);
    }, function (data, cb) {
        console.log('task ' + data + ' finished! ' + 'run two');
        setTimeout(function () {
            cb(null, 'two');
        }, 100);
    }, function (data, cb) {
        console.log('task ' + data + ' finished! ' + 'run three');
        setTimeout(function () {
            cb(null, 'three');
        }, 500);
    }
], function (err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log("result:"+res);
    }
});

/*
run one
task one finished! run two
task two finished! run three
result:three
*/
