/**
 * waterfall 
 * @顺序执行
 * @每一次运行函数的回调结果都会传给下一个动作，最后的result是最后一次执行动作cb中传递的值
 * @若中途出现错误:
 *    中断后续操作,直接在最终的回调中处理
 */
var async = require('async');

function drinkWater(cb) {
    cb(null, "Cola");
}

function playGame(cb) {
    cb('busy', "not free time");
}

function openMac(cb) {
    cb(null, "Chrome");
}

async.waterfall([
    function (cb) {
        console.log("Water Fall Run");
        drinkWater(function (err, data) {
            cb(err, data);
        });
    },
    function (data, cb) {
        console.log("drink ", data, " finish, I will play game");
        playGame(function (err, data) {
            cb(err, data);
        });
    },
    function (data, cb) {
        console.log("play ", data, " finish, I will open mac");
        openMac(function (err, data) {
            cb(err, data);
        });
    }],
    function (err, res) {
        if (err) {
            console.log("err: ", err, "  msg: ", res);
        }
        else {
            console.log("Mac ", res, " is open, all action done");
        }
    }
);
/*

Water Fall Run
drink  Cola  finish, I will play game
err:  busy   msg:  not free time

*/