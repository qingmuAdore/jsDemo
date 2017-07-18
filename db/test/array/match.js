/**
 * 查询数组
 * 
 * 配置数组字段是否 制定元素等等
 */

var async = require('async');
var db = require('../../lib/db.js');
var inventory = require('../../model/inventory.js');

var docs = [
    {
        item: "journal",
        qty: 25,
        tags: ["blank", "red"],
        dim_cm: [14, 21]
    },
    {
        item: "notebook",
        qty: 50,
        tags: ["red", "blank"],
        dim_cm: [14, 21]
    },
    {
        item: "paper",
        qty: 100,
        tags: ["red", "blank", "plain"],
        dim_cm: [14, 21]
    },
    {
        item: "planner",
        qty: 75,
        tags: ["blank", "red"],
        dim_cm: [22.85, 30]
    },
    {
        item: "postcard",
        qty: 45,
        tags: ["blue"],
        dim_cm: [10, 15.25]
    }
];

function exit() {
    async.parallel([
        function (cb) {
            inventory.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        inventory.create(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        //严格匹配数据, 即元素个数及其元素顺序
        inventory.find({ tags: ["red", "blank"] }, cb);
        /*
                [ { _id: 592637d55652344df4017f2a,
            item: 'notebook',
            qty: 50,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank' ] } ]
        */
    },
    function (arg, cb) {
        console.log(arg);
        //含有元素即可, 不要求元素个数以及元素顺序
        inventory.find({ tags: { $all: ["red", "blank"] } }, cb);
        /*
        [ { _id: 592637d55652344df4017f29,
            item: 'journal',
            qty: 25,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'blank', 'red' ] },
        { _id: 592637d55652344df4017f2a,
            item: 'notebook',
            qty: 50,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank' ] },
        { _id: 592637d55652344df4017f2b,
            item: 'paper',
            qty: 100,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank', 'plain' ] },
        { _id: 592637d55652344df4017f2c,
            item: 'planner',
            qty: 75,
            __v: 0,
            dim_cm: [ 22.85, 30 ],
            tags: [ 'blank', 'red' ] } ]
        */
    },
    function (arg, cb) {
        console.log(arg);
        //数组含有指定元素
        inventory.find({ tags: "red" }, cb);
        /*
        [ { _id: 592637d55652344df4017f29,
            item: 'journal',
            qty: 25,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'blank', 'red' ] },
        { _id: 592637d55652344df4017f2a,
            item: 'notebook',
            qty: 50,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank' ] },
        { _id: 592637d55652344df4017f2b,
            item: 'paper',
            qty: 100,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank', 'plain' ] },
        { _id: 592637d55652344df4017f2c,
            item: 'planner',
            qty: 75,
            __v: 0,
            dim_cm: [ 22.85, 30 ],
            tags: [ 'blank', 'red' ] } ]
        */
    },
    function (arg, cb) {
        //数组操作, 至少含有一个元素满足 表达式
        console.log(arg);
        inventory.find({
            dim_cm: { $gt: 25 }
        }, cb);
        /*
        [ { _id: 59263dccef998f2ee4dba52e,
            item: 'planner',
            qty: 75,
            __v: 0,
            dim_cm: [ 22.85, 30 ],
            tags: [ 'blank', 'red' ] } ]
        */
    },
    function (arg, cb) {
        //数组操作, 数组元素一个元素匹配条件1,另一个元素满足条件2....,或者一个元素皆满足
        console.log(arg);
        inventory.find({
            dim_cm: { $gt: 15, $lt: 20 }
        }, cb);
        /*
        [ { _id: 59263dccef998f2ee4dba52b,
            item: 'journal',
            qty: 25,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'blank', 'red' ] },
        { _id: 59263dccef998f2ee4dba52c,
            item: 'notebook',
            qty: 50,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank' ] },
        { _id: 59263dccef998f2ee4dba52d,
            item: 'paper',
            qty: 100,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank', 'plain' ] },
        { _id: 59263dccef998f2ee4dba52f,
            item: 'postcard',
            qty: 45,
            __v: 0,
            dim_cm: [ 10, 15.25 ],
            tags: [ 'blue' ] } ]
         */
    },
    function (arg, cb) {
        console.log(arg);
        //数组操作, 至少含有一个元素满足 表达式
        inventory.find({
            dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } }
        }, cb);
        /*
        [ { _id: 59263dccef998f2ee4dba52e,
            item: 'planner',
            qty: 75,
            __v: 0,
            dim_cm: [ 22.85, 30 ],
            tags: [ 'blank', 'red' ] } ]
         */
    },
    function (arg, cb) {
        console.log(arg);
        //数组操作, 索引值对应元素 满足条件
        inventory.find({
            "dim_cm.1": { $gt: 25 }
        }, cb);
        /*
        [ { _id: 59263fffcfd56c25080a53c0,
            item: 'planner',
            qty: 75,
            __v: 0,
            dim_cm: [ 22.85, 30 ],
            tags: [ 'blank', 'red' ] } ]
         */
    },
    function (arg, cb) {
        console.log(arg);
        //数组操作, 数组长度满足条件
        inventory.find({
            tags: { $size: 3 }
        }, cb);
        /*
        [ { _id: 59263fffcfd56c25080a53bf,
            item: 'paper',
            qty: 100,
            __v: 0,
            dim_cm: [ 14, 21 ],
            tags: [ 'red', 'blank', 'plain' ] } ]
         */
    }
], function (err, res) {
    console.log(res);
    exit();
});