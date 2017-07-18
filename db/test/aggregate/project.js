/**
 * project 项目,指定输出字段或新计算字段
 * 
 * eg:
{ $project: { <specification(s)> } }

<field>: <1 or true>	显示(默认不显示)
_id: <0 or false>	    不显示(默认显示)
<field>: <expression>	添加新字段或重置
<field>:<0 or false>    不显示(默认不显示)

https://docs.mongodb.com/manual/reference/operator/aggregation/project/
 */
var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');


function exit() {
    async.parallel([
        function (cb) {
            user.removeAll(cb);
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
        var doc = {
            name: 'pauly',
            age: '28',
            work: 'softEngineer'
        };
        user.add(doc, cb);
    },
    function (arg, cb) {
        //显示 _id,name,work
        var project = {
            name: 1,
            work: 1
        };
        user.aggregate()
            .project(project)
            .exec(cb);
    },
    function (arg, cb) {
        // [{"_id":"58db7dacb724c919e4b589d1","name":"pauly","work":"softEngineer"}]
        console.log(JSON.stringify(arg));
        //显示 name,nameWork
        var project = {
            _id: 0,
            name: 1,
            nameWork: { $concat: ["$name", " - ", "$work"] }
        }
        user.aggregate()
            .project(project)
            .exec(cb);
    }
], function (err, res) {
    // [{"name":"pauly","nameWork":"pauly - softEngineer"}]
    console.log(JSON.stringify(res));
    exit();
});