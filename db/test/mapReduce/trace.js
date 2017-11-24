/*
计算: tag 轨迹

获取位置变更的结果集
*/

var async = require('async');
var lodash = require('lodash');
var db = require('../../lib/db.js');
var location = require('../../model/location.js');

var cTagId = '11001';

function exit() {
    async.parallel([
        function (cb) {
            location.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}

function genCoordinate() {
    return [[1, 1], [1, 1], [1, 1], [2, 1], [2, 1], [1, 1], [1, 1], [3, 1], [2, 1], [2, 1], [2, 1], [3, 1], [3, 1], [3, 1], [1, 1], [1, 1]];
}

function genLocation() {
    return [{
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [2, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [2, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [3, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [2, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [2, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [3, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [3, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }, {
        floor_id: '123',
        position: {
            type: "Point",
            coordinates: [1, 1]
        }
    }
    ];
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        location.create({ tag_id: '00aa11bb22cc' }, cb);
    },
    function (arg, cb) {
        location.aggregate()
            .project({
                trace: {
                    $reduce: {
                        input: genCoordinate(),
                        initialValue: [],
                        in: {
                            $concatArrays: [
                                "$$value",
                                {
                                    $cond: {
                                        if: {
                                            $eq: [{
                                                $arrayElemAt: [
                                                    "$$value",
                                                    { $subtract: [{ $size: "$$value" }, 1] }
                                                ]
                                            }, "$$this"]
                                        },
                                        then: [],
                                        else: ["$$this"],
                                    }
                                }
                            ]
                        }
                    }
                }
            })
            .exec(cb);
    },
    function (arg, cb) {
        console.log(JSON.stringify(arg));
        location.aggregate()
            .project({
                trace: {
                    $reduce: {
                        input: genLocation(),
                        initialValue: [],
                        in: {
                            $concatArrays: [
                                "$$value",
                                {
                                    $cond: [
                                        {
                                            $and: [
                                                {
                                                    $eq: [{
                                                        $arrayElemAt: [
                                                            "$$value.floor_id",
                                                            { $subtract: [{ $size: "$$value" }, 1] }
                                                        ]
                                                    }, "$$this.floor_id"]
                                                },
                                                {
                                                    $eq: [{
                                                        $arrayElemAt: [
                                                            "$$value.position",
                                                            { $subtract: [{ $size: "$$value" }, 1] }
                                                        ]
                                                    }, "$$this.position"]
                                                }
                                            ],
                                        },
                                        [],
                                         ["$$this"]
                                    ]
                                }
                            ]
                        }
                    }
                }
            })
            .exec(cb);
    }
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});