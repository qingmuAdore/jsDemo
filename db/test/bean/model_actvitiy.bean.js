/**********
 * 
 * 引用的使用 populate
 * 
 */

var async = require('async');
var db = require('../../lib/db.js');
var award = require('../../model/award.js');
var camera = require('../../model/camera.js');
var activity = require('../../model/activity.js');

var awardDoc = {
    name: 'pauly',
    totol: 500,
    num: 50,
    lower: 1,
    upper: 20,
    wish: '新年快乐'
};

var activityDoc = {
    name: 'activityName',
    flag: 0,
    startTime: new Date().getTime()
}


async.waterfall([
    function(cb) {
        db.open(cb);
    },
    function(arg, cb) {
        award.add(awardDoc, cb);
    },
    function(arg, cb) {
        console.log(arg);
        activityDoc.awardId = arg._doc._id;
        activity.add(activityDoc, cb);
    },
    function(arg, cb) {
        activity.findItem(arg._doc._id, cb);
    }
], function(err, res) {
    console.log(res);
    db.close();
});