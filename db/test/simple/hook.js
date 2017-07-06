/**
 * 查询
 * 
 * query: 查询条件
 * projection: 输出属性
 *   eg: String  "age work" 
 *       Object  {age:1}
 * options: 选项,如limit sort skip
 */
var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');

var doc = {
    name: 'pauly',
    age: '28',
    work: 'softEngineer'
};

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        user.create(doc, cb);
    },
    function (arg, cb) {
        user.findItem(doc.name, cb);
    },
    function (arg, cb) {
        console.log(arg);
        user.findOne({ name: doc.name }, "_id name", cb);
    },
    function (arg, cb) {
        console.log(arg);
        arg.remove(cb);
    },
    function (arg, cb) {
        user.remove({}, cb);
    }
], function (err, res) {
    db.closeDB();
});