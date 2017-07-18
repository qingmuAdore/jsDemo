/**
 * $lookup
 * 
 * 表关联查询
 *  多表关联处理, 将本表指定的field与关联表field进行关联查询,匹配的文档采用指定字段(类型:数组)保存
 */
var async = require('async');
var db = require('../../../lib/db.js');
var order = require('../../../model/order.js');
var inventory = require('../../../model/inventory.js');
var goods = require('../../../model/goods.js');


function exit() {
    async.parallel([
        function (cb) {
            goods.removeAll(cb);
        },
        function (cb) {
            order.removeAll(cb);
        },
        function (cb) {
            inventory.removeAll(cb);
        }
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var docs = [{
            "_id": 1, "name": "MON1003", "price": 350, "type": "Monitor"
        }];
        goods.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var docs = [
            {
                "_id": 1, "item": "MON1003", "specs": ["27 inch", "Retina display", "1920x1080"]
            }
        ];
        order.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var docs = [
            {
                "_id": 1, "sku": "MON1003", "type": "Monitor", "instock": 120,
                "size": "27 inch", "resolution": "1920x1080"
            },
            {
                "_id": 2, "sku": "MON1003", "type": "Monitor", "instock": 85,
                "size": "Retina display", "resolution": "1280x800"
            },
            {
                "_id": 3, "sku": "MON1003", "type": "Monitor", "instock": 60,
                "size": "27 inch", "display_type": "LED"
            }
        ]
        inventory.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1, 
                "item": [
                    {
                        "_id": 1, 
                        "name": "MON1003", 
                        "price": 350, 
                        "type": "Monitor", 
                        "location": [ ], 
                        "__v": 0
                    }
                ], 
                "specs": "27 inch", 
                "__v": 0, 
                "inventory_docs": [
                    {
                        "_id": 1, 
                        "sku": "MON1003", 
                        "type": "Monitor", 
                        "instock": 120, 
                        "size": "27 inch", 
                        "resolution": "1920x1080", 
                        "dim_cm": [ ], 
                        "tags": [ ], 
                        "__v": 0
                    }, 
                    {
                        "_id": 3, 
                        "sku": "MON1003", 
                        "type": "Monitor", 
                        "instock": 60, 
                        "size": "27 inch", 
                        "display_type": "LED", 
                        "dim_cm": [ ], 
                        "tags": [ ], 
                        "__v": 0
                    }
                ]
            }, 
            {
                "_id": 1, 
                "item": [
                    {
                        "_id": 1, 
                        "name": "MON1003", 
                        "price": 350, 
                        "type": "Monitor", 
                        "location": [ ], 
                        "__v": 0
                    }
                ], 
                "specs": "Retina display", 
                "__v": 0, 
                "inventory_docs": [
                    {
                        "_id": 2, 
                        "sku": "MON1003", 
                        "type": "Monitor", 
                        "instock": 85, 
                        "size": "Retina display", 
                        "resolution": "1280x800", 
                        "dim_cm": [ ], 
                        "tags": [ ], 
                        "__v": 0
                    }
                ]
            }
        ]
        */
        order.aggregate()
            .unwind({ path: '$specs' })
            .lookup({ // inventory 匹配
                from: "inventory",
                localField: "specs",
                foreignField: "size",
                as: "inventory_docs"
            })
            .match({ //过滤 空文档
                inventory_docs: { $ne: [] }
            })
            .lookup({ // goods 匹配
                from: "goods",
                localField: "item",
                foreignField: "name",
                as: "item"
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});