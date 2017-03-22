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

function eatFood(cb) {
    cb(null, "Hamburger");
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
        console.log("drink ", data, " finish, I will eat food");
        eatFood(function (err, data) {
            cb(err, data);
        });
    },
    function (data, cb) {
        console.log("eat ", data, " finish, I will open mac");
        openMac(function (err, data) {
            cb(err, data);
        });
    }],
    function (err, res) {
        if (err) {
            console.log("err: ", err, "msg: ", res);
        }
        else {
            console.log("Mac ", res, " is open, all action done");
        }
    }
);
/*
Water Fall Run
drink  Cola  finish, I will eat food
eat  Hamburger  finish, I will open mac
Mac  Chrome  is open, all action done
*/