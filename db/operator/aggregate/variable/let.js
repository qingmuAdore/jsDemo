/**
 * $let
 * 
 * 局部变量
 */
var async = require('async');
var db = require('../../../lib/db.js');
var order = require('../../../model/order.js');


function exit() {
    async.parallel([
        function (cb) {
            order.removeAll(cb);
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
        var docs = [
            { _id: 1, price: 5.5, quantity: 2, hasDiscount: true },
            { _id: 2, price: 3.5, quantity: 10, hasDiscount: true },
            { _id: 3, price: 1.5, quantity: 15, hasDiscount: false },
        ]
        order.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        order.aggregate()
            .project({
                result: {
                    $let: {
                        vars: {
                            total: { $multiply: ['$price', '$quantity'] },
                            discounted: { $cond: { if: '$hasDiscount', then: 0.9, else: 1 } },
                            vol: {
                                $cond: [
                                    { $gt: ['$total', 20] },
                                    '$total',
                                    20
                                ]
                            }
                        },
                        in: {
                            finalTotal: { $multiply: ["$$total", "$$discounted"] },
                            vol: '$$vol'
                        }
                    }
                }
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});