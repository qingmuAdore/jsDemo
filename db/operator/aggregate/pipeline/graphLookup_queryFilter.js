/**
 * graphLookup
 * 递归 关联查询 

示例:查询 "Tanya Jordan"的朋友中,喜欢 golf

  */
var async = require('async');
var db = require('../../../lib/db.js');
var people = require('../../../model/people.js');


function exit() {
    async.parallel([
        function (cb) {
            people.removeAll(cb);
        },
    ], function (err) {
        db.closeDB();
    });
}

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        var docs = [
            {
                "_id": 1,
                "name": "Tanya Jordan",
                "friends": ["Shirley Soto", "Terry Hawkins", "Carole Hale"],
                "hobbies": ["tennis", "unicycling", "golf"]
            },
            {
                "_id": 2,
                "name": "Carole Hale",
                "friends": ["Joseph Dennis", "Tanya Jordan", "Terry Hawkins"],
                "hobbies": ["archery", "golf", "woodworking"]
            },
            {
                "_id": 3,
                "name": "Terry Hawkins",
                "friends": ["Tanya Jordan", "Carole Hale", "Angelo Ward"],
                "hobbies": ["knitting", "frisbee"]
            },
            {
                "_id": 4,
                "name": "Joseph Dennis",
                "friends": ["Angelo Ward", "Carole Hale"],
                "hobbies": ["tennis", "golf", "topiary"]
            },
            {
                "_id": 5,
                "name": "Angelo Ward",
                "friends": ["Terry Hawkins", "Shirley Soto", "Joseph Dennis"],
                "hobbies": ["travel", "ceramics", "golf"]
            },
            {
                "_id": 6,
                "name": "Shirley Soto",
                "friends": ["Angelo Ward", "Tanya Jordan", "Carole Hale"],
                "hobbies": ["frisbee", "set theory"]
            }
        ]
        people.add(docs, cb);
    },
    function (arg, cb) {
        console.log(arg);
        /*
        [
            {
                "_id": 1,
                "name": "Tanya Jordan",
                "hobbies": [
                    "tennis",
                    "unicycling",
                    "golf"
                ],
                "friends": [
                    "Shirley Soto",
                    "Terry Hawkins",
                    "Carole Hale"
                ],
                "__v": 0,
                "golfers": [
                    {
                        "_id": 5,
                        "name": "Angelo Ward",
                        "hobbies": [
                            "travel",
                            "ceramics",
                            "golf"
                        ],
                        "friends": [
                            "Terry Hawkins",
                            "Shirley Soto",
                            "Joseph Dennis"
                        ],
                        "__v": 0
                    },
                    {
                        "_id": 4,
                        "name": "Joseph Dennis",
                        "hobbies": [
                            "tennis",
                            "golf",
                            "topiary"
                        ],
                        "friends": [
                            "Angelo Ward",
                            "Carole Hale"
                        ],
                        "__v": 0
                    },
                    {
                        "_id": 1,
                        "name": "Tanya Jordan",
                        "hobbies": [
                            "tennis",
                            "unicycling",
                            "golf"
                        ],
                        "friends": [
                            "Shirley Soto",
                            "Terry Hawkins",
                            "Carole Hale"
                        ],
                        "__v": 0
                    },
                    {
                        "_id": 2,
                        "name": "Carole Hale",
                        "hobbies": [
                            "archery",
                            "golf",
                            "woodworking"
                        ],
                        "friends": [
                            "Joseph Dennis",
                            "Tanya Jordan",
                            "Terry Hawkins"
                        ],
                        "__v": 0
                    }
                ]
            }
        ]
        */
        people.aggregate()
            .match({ //过滤 空文档
                name: "Tanya Jordan"
            })
            .graphLookup({
                from: "people",
                startWith: "$friends",
                connectFromField: "friends",
                connectToField: "name",
                // maxDepth:2,
                as: "golfers",
                restrictSearchWithMatch: { "hobbies": "golf" }
            })
            .exec(cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});