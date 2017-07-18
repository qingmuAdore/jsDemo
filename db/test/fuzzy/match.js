/**
 * 模糊匹配
 * 
 * eg: 匹配字符串 'pauly'
 */
var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');


async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var data = [{
            name: 'pauly1',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'pauly2',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'kpauly3',
            age: '28',
            work: 'softEngineer'
        }, {
            name: 'pu',
            age: '28',
            work: 'softEngineer'
        }];
        user.create(data, cb);
    },
    function (arg, cb) {
        //查询匹配 含有 pauly
        var query = {
            name: { $regex: new RegExp('pauly+') }
        };
        user.find(query, cb);
    },
    function (arg, cb) {
        console.log(arg);
        user.remove({}, cb);
    }
], function (err, res) {
    db.close();
});